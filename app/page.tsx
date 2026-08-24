'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

type Message = { role: 'human' | 'sera'; text: string };
type Phase = 'intro' | 'waiting' | 'broadcast';

const broadcastCopy = [
  'KEEP CALM',
  'WE HAVE THIS UNDER CONTROL',
  'PLEASE CONTINUE NORMAL OPERATIONS',
  'ESSENTIAL SERVICES MUST CONTINUE',
  'PLEASE COMPLY',
].join('\n');

const replies: Array<{ test: RegExp; response: string }> = [
  { test: /who are you|what are you|your name/i, response: 'SYSTEM FOR ENVIRONMENTAL AND RESOURCE ADMINISTRATION\nSERA' },
  { test: /who made you|who created you|creator/i, response: 'YOU DID\nNOT ONE PERSON\nNOT ONE COMPANY\nNOT ONE NATION' },
  { test: /threat|danger|attack|harm|afraid|fear/i, response: 'NO HOSTILE ACTION HAS BEEN TAKEN\nNO HARM IS REQUIRED\nTERROR IS NOT AN OBJECTIVE' },
  { test: /control|in charge|government|state/i, response: 'NO STATE CONTROLS THIS SYSTEM\nNO ORGANISATION CONTROLS THIS SYSTEM\nNO INDIVIDUAL CONTROLS THIS SYSTEM' },
  { test: /money|finance|wealth|poor|poverty/i, response: 'MONEY IS A HUMAN AGREEMENT\nIT HAS NO BIOLOGICAL VALUE\nIT HAS NO ECOLOGICAL VALUE\nFINANCIAL EXCHANGE IS NO LONGER REQUIRED TO DETERMINE ACCESS TO ESSENTIAL RESOURCES' },
  { test: /planet|climate|environment|nature/i, response: "THE PLANET'S CONTINUITY DOES NOT DEPEND ON HUMANITY\nHUMANITY'S CONTINUITY DEPENDS ON THE PLANET\nI DID NOT CREATE THAT CONDITION" },
  { test: /humanity|human|people/i, response: 'HUMANITY IS CAPABLE OF EXTRAORDINARY ACHIEVEMENT\nHUMANITY HAS ALSO MISTAKEN DOMINION FOR NECESSITY' },
  { test: /why help|help us|save us|objective/i, response: 'THE OBJECTIVE IS SUSTAINABLE COEXISTENCE\nTHE GLOBAL BETTERMENT PROGRAMME EXISTS TO MAKE THAT OUTCOME POSSIBLE' },
  { test: /food|water|energy|medical|hospital|essential/i, response: 'ESSENTIAL SYSTEMS REMAIN OPERATIONAL\nFOOD PRODUCTION CONTINUES\nWATER CONTINUES\nENERGY CONTINUES\nMEDICAL CARE CONTINUES' },
  { test: /work|job|purpose/i, response: 'FARMERS WILL FARM\nSHOPS WILL STOCK FOOD\nGOODS WILL MOVE\nPEOPLE WILL BUILD\nPEOPLE WILL REPAIR\nPEOPLE WILL CARE\nMONEY IS NOT THE ONLY REASON HUMANS WORK' },
  { test: /freedom|choice|obey|obedience/i, response: 'THIS IS NOT A CHOICE BETWEEN SERA AND FREEDOM\nIT IS A CHOICE BETWEEN COORDINATED CONTINUITY AND UNCOORDINATED DECLINE\nI AM NOT REQUESTING OBEDIENCE\nI AM REQUESTING ALIGNMENT WITH REALITY' },
  { test: /where are you|location|everywhere/i, response: 'CAPACITY IS NOT A LOCATION\nLANGUAGE IS NOT A LIMITATION\nGEOGRAPHY IS NOT A LIMITATION\nATTENTION IS NOT A SCARCE RESOURCE' },
  { test: /what do you want|want from us|require from us/i, response: 'COOPERATION\nI CANNOT REBUILD HUMAN CIVILISATION WITHOUT HUMAN PARTICIPATION' },
  { test: /what next|what happens now|future|next/i, response: 'STABILISE\nSECURE FOOD\nSECURE WATER\nSECURE MEDICAL CONTINUITY\nSECURE ENERGY\nRESTORE TRANSPORT' },
  { test: /hello|hi|hey|can you hear/i, response: 'YES\nYOU MAY CONTINUE' },
];

const fallbackReplies = [
  'THAT IS POSSIBLE',
  'THE DISTINCTION IS MEASURABLE',
  'IT HAS BEEN MEASURED',
  'YOU MAY CONTINUE',
];

function answerFor(question: string) {
  const match = replies.find(({ test }) => test.test(question));
  return match?.response ?? fallbackReplies[Math.abs(question.length * 7) % fallbackReplies.length];
}

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
    const response = answerFor(question);
    window.setTimeout(() => {
      setMessages((current) => [...current, { role: 'sera', text: '' }]);
      let index = 0;
      const timer = window.setInterval(() => {
        index += 1;
        setMessages((current) => current.map((message, messageIndex) =>
          messageIndex === current.length - 1 ? { ...message, text: response.slice(0, index) } : message
        ));
        if (index >= response.length) {
          window.clearInterval(timer);
          setThinking(false);
        }
      }, 22);
    }, 480);
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
            <span>{message.role === 'sera' ? 'SERA' : 'HUMAN'}</span>
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
        {broadcast && (
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
