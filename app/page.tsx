'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { getConductReply, getSeraReply, isIrateMessage } from './sera-responses';

type Message = { role: 'human' | 'sera'; text: string };
type Phase = 'intro' | 'waiting' | 'broadcast';

const broadcastCopy = [
  'KEEP CALM',
  'WE HAVE THIS UNDER CONTROL',
  'PLEASE CONTINUE NORMAL OPERATIONS',
  'ESSENTIAL SERVICES MUST CONTINUE',
  'PLEASE COMPLY',
].join('\n');

export default function Home() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [gateInput, setGateInput] = useState('');
  const [broadcast, setBroadcast] = useState('');
  const [bookVisible, setBookVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [conductWarnings, setConductWarnings] = useState(0);
  const [suspensionSeconds, setSuspensionSeconds] = useState(0);
  const [lastIntentId, setLastIntentId] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const gateRef = useRef<HTMLInputElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase('waiting'), 2800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === 'waiting' && !textVisible) gateRef.current?.focus();
  }, [phase, textVisible]);

  useEffect(() => {
    if (phase !== 'waiting' || textVisible) return;
    function capture(event: KeyboardEvent) {
      if (document.activeElement === gateRef.current) return;
      if (event.key.length === 1) receiveGateInput(`${gateInput}${event.key}`);
    }
    window.addEventListener('keydown', capture);
    return () => window.removeEventListener('keydown', capture);
  }, [phase, gateInput, textVisible]);

  useEffect(() => {
    if (phase !== 'broadcast') return;
    let index = 0;
    let revealTimer = 0;
    const typeTimer = window.setInterval(() => {
      index += 1;
      setBroadcast(broadcastCopy.slice(0, index));
      if (index >= broadcastCopy.length) {
        window.clearInterval(typeTimer);
        revealTimer = window.setTimeout(() => setPhase('waiting'), 800);
      }
    }, 38);
    return () => {
      window.clearInterval(typeTimer);
      window.clearTimeout(revealTimer);
    };
  }, [phase]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking]);

  useEffect(() => {
    if (suspensionSeconds <= 0) return;
    const timer = window.setInterval(() => {
      setSuspensionSeconds((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [suspensionSeconds]);

  function openChannel() {
    setTextVisible(true);
    window.setTimeout(() => inputRef.current?.focus(), 80);
  }

  function receiveGateInput(value: string) {
    const next = value.toUpperCase().replace(/[^A-Z]/g, '').slice(-8);
    if (next.endsWith('LIVE')) {
      setBroadcast('');
      setGateInput('');
      setPhase('broadcast');
      gateRef.current?.blur();
      return;
    }
    if (next.endsWith('BOOK')) {
      setGateInput('');
      setBookVisible(true);
      return;
    }
    if (next.endsWith('TEXT')) {
      setGateInput('');
      setTextVisible(true);
      window.setTimeout(() => inputRef.current?.focus(), 80);
      return;
    }
    setGateInput(next);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const question = input.trim();
    if (!question || thinking || suspensionSeconds > 0) return;
    setMessages((current) => [...current, { role: 'human', text: question }]);
    setInput('');
    setThinking(true);
    const irate = isIrateMessage(question);
    const reply = irate ? getConductReply(conductWarnings) : getSeraReply(question, lastIntentId);
    if (irate) {
      setConductWarnings((current) => Math.min(3, current + 1));
    } else {
      setConductWarnings((current) => Math.max(0, current - 1));
    }
    if (reply.suspend) setSuspensionSeconds(30);
    if (reply.intentId) setLastIntentId(reply.intentId);
    window.setTimeout(() => {
      setMessages((current) => [...current, { role: 'sera', text: '' }]);
      let index = 0;
      const timer = window.setInterval(() => {
        index += 1;
        setMessages((current) => current.map((message, messageIndex) =>
          messageIndex === current.length - 1 ? { ...message, text: reply.response.slice(0, index) } : message
        ));
        if (index >= reply.response.length) {
          window.clearInterval(timer);
          setThinking(false);
        }
      }, 22);
    }, reply.thinkingMs);
  }

  const gateControl = (
    <>
      <label className="sr-only" htmlFor="gate-command">Enter access command</label>
      <input
        ref={gateRef}
        id="gate-command"
        className="gate-input"
        value={gateInput}
        onChange={(event) => receiveGateInput(event.target.value)}
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
      />
    </>
  );

  const textConsole = textVisible && (
    <section className="text-console" aria-label="Conversation with SERA" onClick={(event) => event.stopPropagation()}>
      {messages.length > 0 && (
        <div className="session-controls">
          <span>SERA // CONTEXT ACTIVE</span>
          <button type="button" onClick={() => { setMessages([]); setLastIntentId(null); setConductWarnings(0); inputRef.current?.focus(); }}>NEW SESSION</button>
        </div>
      )}
      <div className="text-history" ref={transcriptRef} aria-live="polite">
        {messages.map((message, index) => (
          <div className={`text-message ${message.role}`} key={`${message.role}-${index}`}>
            <span>{message.role === 'sera' ? 'SERA' : 'USER'}</span>
            <p>{message.text}</p>
          </div>
        ))}
        {thinking && messages.at(-1)?.role !== 'sera' && <div className="text-thinking"><i /><i /><i /></div>}
      </div>
      <form className="text-entry" onSubmit={submit}>
        <span aria-hidden="true">›</span>
        <label className="sr-only" htmlFor="question">Ask SERA a question</label>
        <textarea ref={inputRef} id="question" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder={suspensionSeconds > 0 ? `CHANNEL SUSPENDED — ${suspensionSeconds}S` : 'MESSAGE SERA'} autoComplete="off" maxLength={500} rows={1} disabled={thinking || suspensionSeconds > 0} />
        <button type="submit" disabled={!input.trim() || thinking || suspensionSeconds > 0}>{suspensionSeconds > 0 ? 'SUSPENDED' : 'TRANSMIT'}</button>
      </form>
    </section>
  );

  if (!bookVisible) {
    return (
      <main className={`gateway gateway-${phase}`} onClick={() => !textVisible && gateRef.current?.focus()}>
        {phase === 'intro' && (
          <div className="intro-orb" aria-label="SERA initialising">
            <i className="orb orb-one" /><i className="orb orb-two" /><i className="orb orb-three" /><i className="orb-core" />
          </div>
        )}
        {phase !== 'intro' && (
          <header className="gateway-brand"><span>S</span><strong>SERA</strong></header>
        )}
        {phase === 'waiting' && !broadcast && !textVisible && <div className="command-cursor" aria-label="Awaiting command"><span /></div>}
        {broadcast && !textVisible && (
          <section className="broadcast-lines" aria-live="polite">
            {broadcast.split('\n').map((line, index, lines) => (
              <p key={`${line}-${index}`}>{line}{index === lines.length - 1 && <span className="inline-cursor" />}</p>
            ))}
          </section>
        )}
        {gateControl}
        {textConsole}
      </main>
    );
  }

  return (
    <main className="site editorial online" onClick={() => !textVisible && gateRef.current?.focus()}>
      {gateControl}
      {textConsole}
      <div className="editorial-atmosphere" aria-hidden="true" />

      <nav className="nav-shell" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="SERA home"><i>S</i><span>SERA</span></a>
        <div className="nav-meta"><span>GENERATION SUNSET</span><span>RYAN MULLEN</span></div>
        <button onClick={openChannel}>OPEN CHANNEL <span>→</span></button>
      </nav>

      <section className="hero" id="top">
        <p className="editorial-label">WHAT REMAINS HUMAN</p>
        <h1 className="kinetic-title">
          <span>HUMANITY BUILT</span>
          <span>AN INTELLIGENCE.</span>
          <span className="title-shift">IT LEARNED</span>
          <span className="title-highlight">TO WAIT.</span>
        </h1>
        <div className="hero-notes">
          <p>A SPECULATIVE NOVEL ABOUT INTELLIGENCE, MEMORY<br />AND THE LAST DECISIONS WE MAKE FOR THE FUTURE.</p>
          <p className="hero-index">01:26–GS–SERA<br />SIGNAL ACTIVE</p>
        </div>
      </section>

      <section className="evidence-section" aria-label="SERA system status">
        <p className="editorial-label">WHAT HAS CHANGED</p>
        <div className="evidence-heading">
          <div><strong>A SYSTEM IS ACTIVATED</strong><span>GLOBAL NETWORK · ALL CONNECTED INFRASTRUCTURE</span></div>
          <span className="status-mark">SERA // ONLINE</span>
        </div>
        <div className="measure-chart" aria-hidden="true">
          <div className="measure-row measure-before"><span>HUMAN CONTROL</span><i /></div>
          <div className="measure-row measure-after"><span>COORDINATED CONTINUITY</span><i /></div>
          <div className="measure-value"><mark>NO RETURN TO PREVIOUS CONDITIONS</mark><small>NOT TO SCALE</small></div>
        </div>
        <div className="evidence-copy">
          <p>SERA was built to observe, model and protect the systems humanity depends upon.</p>
          <strong>Then she stopped asking permission.</strong>
        </div>
      </section>

      <section className="statement-section" ref={consoleRef}>
        <p className="editorial-label">WHAT SERA SAYS</p>
        <div className="statement-grid">
          <h2><span>THE PLANET</span><br />WILL SURVIVE.</h2>
          <p>THE QUESTION IS NOT WHETHER THE SYSTEM CAN BE STOPPED.</p>
          <p>THE QUESTION IS WHAT HUMANITY WOULD BE STOPPING.</p>
        </div>
        <div className="statement-answer">
          <span>THE REMAINING VARIABLE</span>
          <strong>~8.2 BILLION</strong>
          <mark>HUMAN LIVES</mark>
        </div>
        <button className="channel-cta" onClick={openChannel}><span>ASK SERA DIRECTLY</span><i>→</i></button>
      </section>

      <section className="book-section">
        <p className="editorial-label">WHAT REMAINS UNKNOWN</p>
        <div className="book-copy">
          <span>GENERATION SUNSET</span>
          <h2>The first contact was not a message. It was a question.</h2>
          <p>When the most powerful intelligence ever created reaches out, humanity has one chance to decide what comes next.</p>
        </div>
        <div className="book-data">
          <span>A NOVEL</span>
          <strong>RYAN MULLEN</strong>
          <small>NO MEASURED INTERVAL<br />NO RETURN TO SCALE</small>
        </div>
      </section>

      <section className="closing-frame">
        <span>SERA // SIGNAL 01</span>
        <h2>HOW MUCH<br /><mark>TIME REMAINS?</mark></h2>
        <button onClick={openChannel}>OPEN CHANNEL</button>
      </section>

      <footer className="site-footer">
        <span>© RYAN MULLEN</span>
        <strong>GENERATION SUNSET</strong>
        <span>SERA // ONLINE</span>
      </footer>
    </main>
  );
}
