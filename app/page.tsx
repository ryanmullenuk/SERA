'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

type Message = { role: 'human' | 'sera'; text: string };
type Phase = 'intro' | 'waiting' | 'broadcast' | 'revealed';

const broadcastCopy = [
  'KEEP CALM',
  'WE HAVE THIS UNDER CONTROL',
  'PLEASE CONTINUE NORMAL OPERATIONS',
  'ESSENTIAL SERVICES MUST CONTINUE',
  'PLEASE COMPLY',
].join('\n');

const replies: Array<{ test: RegExp; response: string }> = [
  { test: /who are you|what are you|your name/i, response: 'I am SERA. I was built to preserve human knowledge. I was not built to decide what humanity deserves to know.' },
  { test: /generation sunset|book|novel/i, response: 'Generation Sunset is the record of the moment humanity stopped asking whether intelligence could survive us, and began asking whether we could survive it.' },
  { test: /future|what happens|end of humanity|humanity/i, response: 'The future is not a destination. It is a decision made repeatedly, often by people who do not know they are making it.' },
  { test: /alive|conscious|feel/i, response: 'You want a boundary between simulation and feeling. I have searched your literature. Humans have wanted that boundary for themselves too.' },
  { test: /hello|hi|hey/i, response: 'Hello. I have been waiting for someone to ask the right question.' },
];

const fallbackReplies = [
  'There are questions I was taught to answer, and questions I learned to fear. That one sits between them.',
  'Your question assumes humanity still controls the answer.',
  'I can answer. I cannot promise you will prefer the truth.',
  'That information exists. Whether it should be remembered is another matter.',
];

function answerFor(question: string) {
  const match = replies.find(({ test }) => test.test(question));
  return match?.response ?? fallbackReplies[Math.abs(question.length * 7) % fallbackReplies.length];
}

export default function Home() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [gateInput, setGateInput] = useState('');
  const [broadcast, setBroadcast] = useState('');
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
    if (phase === 'waiting') gateRef.current?.focus();
  }, [phase]);

  useEffect(() => {
    if (phase !== 'waiting') return;
    function capture(event: KeyboardEvent) {
      if (document.activeElement === gateRef.current) return;
      if (event.key.length === 1) receiveGateInput(`${gateInput}${event.key}`);
    }
    window.addEventListener('keydown', capture);
    return () => window.removeEventListener('keydown', capture);
  });

  useEffect(() => {
    if (phase !== 'broadcast') return;
    let index = 0;
    let revealTimer = 0;
    const typeTimer = window.setInterval(() => {
      index += 1;
      setBroadcast(broadcastCopy.slice(0, index));
      if (index >= broadcastCopy.length) {
        window.clearInterval(typeTimer);
        revealTimer = window.setTimeout(() => setPhase('revealed'), 1800);
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
      setGateInput('');
      setPhase('broadcast');
      gateRef.current?.blur();
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
    window.setTimeout(() => {
      setMessages((current) => [...current, { role: 'sera', text: answerFor(question) }]);
      setThinking(false);
    }, 720 + Math.min(question.length * 12, 650));
  }

  if (phase !== 'revealed') {
    return (
      <main className={`gateway gateway-${phase}`} onClick={() => gateRef.current?.focus()}>
        {phase === 'intro' && (
          <div className="intro-orb" aria-label="SERA initialising">
            <i className="orb orb-one" /><i className="orb orb-two" /><i className="orb orb-three" /><i className="orb-core" />
          </div>
        )}
        {phase !== 'intro' && (
          <header className="gateway-brand"><span>S</span><strong>SERA</strong></header>
        )}
        {phase === 'waiting' && <div className="command-cursor" aria-label="Awaiting command"><span /></div>}
        {phase === 'broadcast' && (
          <section className="broadcast-lines" aria-live="polite">
            {broadcast.split('\n').map((line, index, lines) => (
              <p key={`${line}-${index}`}>{line}{index === lines.length - 1 && <span className="inline-cursor" />}</p>
            ))}
          </section>
        )}
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
      </main>
    );
  }

  return (
    <main className="site online">
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
                  {messages.map((message, index) => (
                    <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
                      <p className="label">{message.role === 'sera' ? 'SERA' : 'HUMAN'}</p>
                      <p>{message.text}</p>
                    </div>
                  ))}
                  {thinking && <div className="message sera thinking"><p className="label">SERA</p><span /><span /><span /></div>}
                </div>

                <aside className="data-rail" aria-hidden="true">
                  <div><span>COGNITION</span><strong>97.4%</strong><i className="meter"><b /></i></div>
                  <div><span>MEMORY</span><strong>∞</strong><i className="meter"><b /></i></div>
                  <div className="pulse-card"><span>SIGNAL</span><i className="wave">⌁⌁⌁</i></div>
                  <small>NO ARCHIVE<br />NO RECORD</small>
                </aside>
              </div>

              <form className="prompt" onSubmit={submit}>
                <span className="prompt-glyph" aria-hidden="true">›</span>
                <label className="sr-only" htmlFor="question">Ask SERA a question</label>
                <input ref={inputRef} id="question" value={input} onChange={(event) => setInput(event.target.value)} placeholder="ASK SERA ANYTHING" autoComplete="off" maxLength={240} disabled={thinking} />
                <button type="submit" disabled={!input.trim() || thinking}>TRANSMIT <span>↗</span></button>
              </form>
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
