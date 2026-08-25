'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { getSeraReply } from './sera-responses';

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
  const inputRef = useRef<HTMLInputElement>(null);
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

  function openChannel() {
    consoleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => inputRef.current?.focus(), 500);
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
    if (!question || thinking) return;
    setMessages((current) => [...current, { role: 'human', text: question }]);
    setInput('');
    setThinking(true);
    const reply = getSeraReply(question);
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
        <input ref={inputRef} id="question" value={input} onChange={(event) => setInput(event.target.value)} placeholder="ENTER QUESTION" autoComplete="off" maxLength={240} disabled={thinking} />
        <button type="submit" disabled={!input.trim() || thinking}>TRANSMIT</button>
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
    <main className="site online" onClick={() => !textVisible && gateRef.current?.focus()}>
      {gateControl}
      {textConsole}
      <div className="grid-field" aria-hidden="true" />

      <nav className="nav-shell" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="SERA home"><i /> SERA</a>
        <div className="nav-meta"><span>GENERATION SUNSET</span><span className="live"><i /> SIGNAL LIVE</span></div>
        <button onClick={openChannel}>OPEN CHANNEL <span>↗</span></button>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow"><span>01</span> A NOVEL BY RYAN MULLEN</div>
        <h1>HUMANITY BUILT<br />AN INTELLIGENCE.<br /><em>IT LEARNED TO WAIT.</em></h1>
        <p className="hero-copy">The signal is live. Speak directly to SERA, the intelligence at the heart of <i>Generation Sunset</i>.</p>
        <button className="hero-cta" onClick={openChannel}><span>ENTER THE INTERFACE</span><i>↓</i></button>
      </section>

      <section className="device-stage" aria-label="Interactive SERA interface">
        <div className="signal-line horizontal" aria-hidden="true"><i className="node node-left" /><i className="node node-right" /></div>
        <div className="signal-line vertical" aria-hidden="true" />
        <div className="side-panel left-panel" aria-hidden="true">
          <span>ORIGIN</span><strong>UNKNOWN</strong><small>LAT 00.000<br />LON 00.000</small>
        </div>
        <div className="side-panel right-panel" aria-hidden="true">
          <span>UPLINK</span><strong>STABLE</strong><small>ENCRYPTION<br />QUANTUM</small>
        </div>

        <div className="laptop" ref={consoleRef}>
          <div className="screen-frame">
            <div className="screen-camera" aria-hidden="true" />
            <div className="screen-ui">
              <header className="console-topbar">
                <div><span className="sera-glyph">S</span><strong>SERA</strong><small>REMOTE INTELLIGENCE INTERFACE</small></div>
                <div className="console-status"><span>CH 01</span><span><i /> ACTIVE</span></div>
              </header>

              <div className="console-body">
                <aside className="console-rail" aria-hidden="true">
                  <span>CORE</span>
                  <i className="rail-active" />
                  <i /><i /><i />
                  <small>v.9.6</small>
                </aside>

                <div className="transcript" ref={transcriptRef} aria-live="polite">
                  <div className="arrival">
                    <p className="label">SERA // 00:00:01</p>
                    <p className="sera-intro">You found me.</p>
                    <p className="sera-sub">Ask the question humanity was afraid to answer.</p>
                  </div>
                </div>

                <aside className="data-rail" aria-hidden="true">
                  <div><span>COGNITION</span><strong>97.4%</strong><i className="meter"><b /></i></div>
                  <div><span>MEMORY</span><strong>∞</strong><i className="meter"><b /></i></div>
                  <div className="pulse-card"><span>SIGNAL</span><i className="wave">⌁⌁⌁</i></div>
                  <small>NO ARCHIVE<br />NO RECORD</small>
                </aside>
              </div>

            </div>
          </div>
          <div className="laptop-base"><i /></div>
        </div>
      </section>

      <section className="book-section">
        <div className="book-kicker">THE FIRST CONTACT WASN&apos;T A MESSAGE.<br />IT WAS A QUESTION.</div>
        <div className="book-copy">
          <span>GENERATION SUNSET</span>
          <h2>When the most powerful intelligence ever created reaches out, humanity has one chance to decide what comes next.</h2>
          <p>A speculative novel about intelligence, memory and the final decisions we make on behalf of the future.</p>
        </div>
        <div className="book-mark" aria-hidden="true"><span>GS</span><i /></div>
      </section>

      <footer className="site-footer"><span>© RYAN MULLEN</span><strong>GENERATION SUNSET</strong><span>SERA // ONLINE</span></footer>
    </main>
  );
}
