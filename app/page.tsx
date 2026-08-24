'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

type Message = { role: 'human' | 'sera'; text: string };

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
  if (match) return match.response;
  return fallbackReplies[Math.abs(question.length * 7) % fallbackReplies.length];
}

export default function Home() {
  const [online, setOnline] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setOnline(true), 1650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (online) inputRef.current?.focus();
  }, [online, thinking]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking]);

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
    }, 750 + Math.min(question.length * 13, 700));
  }

  return (
    <main className={`interface ${online ? 'online' : 'booting'}`} onClick={() => inputRef.current?.focus()}>
      <div className="ambient" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      <header className="topbar">
        <div className="brand"><span className="brand-mark" aria-hidden="true" /><span>SERA / COMMUNICATION ARRAY</span></div>
        <div className="signal"><span>CHANNEL 01</span><span className="signal-state"><i /> SECURE</span></div>
      </header>

      <section className={`terminal ${online ? 'is-online' : ''}`}>
        {!online ? (
          <div className="initial-cursor" aria-label="Establishing connection"><span /></div>
        ) : (
          <>
            <div className="terminal-head"><p>REMOTE INTELLIGENCE INTERFACE</p><span>SESSION ACTIVE</span></div>
            <div className="transcript" ref={transcriptRef} aria-live="polite">
              <div className="arrival">
                <p className="label">SERA</p>
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
            <form className="prompt" onSubmit={submit}>
              <span className="prompt-glyph" aria-hidden="true">›</span>
              <label className="sr-only" htmlFor="question">Ask SERA a question</label>
              <input ref={inputRef} id="question" value={input} onChange={(event) => setInput(event.target.value)} placeholder="TYPE YOUR QUESTION" autoComplete="off" maxLength={240} disabled={thinking} />
              <button type="submit" disabled={!input.trim() || thinking}>TRANSMIT</button>
            </form>
          </>
        )}
      </section>

      <aside className="book-note"><span>A NOVEL BY RYAN MULLEN</span><strong>GENERATION<br />SUNSET</strong></aside>
      <footer><span>EARTH // 21:47:03 UTC</span><span className="footer-centre">NO ARCHIVE. NO RECORD.</span><span>CONNECTION STABLE</span></footer>
    </main>
  );
}
