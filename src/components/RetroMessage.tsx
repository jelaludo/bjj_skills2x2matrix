import React, { useState, useEffect, useRef } from 'react';

const messages = [
  "All models are wrong, some are useful",
  "Keep Training",
  "Don't Quit",
  "Mindful Practice",
  "Switch your brain on",
  "Think. Practice. Repeat",
  "Theory is nothing without mat time",
  "Read less, roll more",
  "Daily beats Perfect",
  "Mat Time > Screen Time",
  "Keep Showing up",
  "Don't let thinking replace doing",
  "Breathe, feel, adjust",
  "Build those neuromuscular pathways",
  "Etch Grappling Grooves in your brain",
  "Proof of Work on the mats",
  "Take care of your training partners"
];

const PROMPT = 'root@grapplingprimitives:~$';

const RetroMessage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const cyclingTimeout = useRef<NodeJS.Timeout | null>(null);
  const cursorInterval = useRef<NodeJS.Timeout | null>(null);

  // Blinking cursor effect
  useEffect(() => {
    cursorInterval.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => {
      if (cursorInterval.current) clearInterval(cursorInterval.current);
    };
  }, []);

  // Typing animation and cycling
  useEffect(() => {
    if (!isVisible) return;
    setDisplayedText('');
    setIsTyping(true);
    const message = messages[currentMessageIndex];
    let i = 0;
    function typeChar() {
      setDisplayedText(message.slice(0, i));
      if (i < message.length) {
        typingTimeout.current = setTimeout(() => {
          i++;
          typeChar();
        }, 40);
      } else {
        setIsTyping(false);
        cyclingTimeout.current = setTimeout(() => {
          // Erase message
          setDisplayedText('');
          setIsTyping(true);
          // Next message
          setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        }, 2000);
      }
    }
    typeChar();
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      if (cyclingTimeout.current) clearTimeout(cyclingTimeout.current);
    };
    // eslint-disable-next-line
  }, [currentMessageIndex, isVisible]);

  // User interaction: hide modal forever
  useEffect(() => {
    if (!isVisible) return;
    const hide = () => setIsVisible(false);
    window.addEventListener('mousedown', hide, { once: true });
    window.addEventListener('keydown', hide, { once: true });
    window.addEventListener('touchstart', hide, { once: true });
    window.addEventListener('scroll', hide, { once: true });
    window.addEventListener('wheel', hide, { once: true });
    return () => {
      window.removeEventListener('mousedown', hide);
      window.removeEventListener('keydown', hide);
      window.removeEventListener('touchstart', hide);
      window.removeEventListener('scroll', hide);
      window.removeEventListener('wheel', hide);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.85)',
        color: '#fff',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        fontFamily: 'monospace',
        fontSize: '1.5rem',
      }}
    >
      <div
        style={{
          pointerEvents: 'none',
          width: '600px',
          height: '200px',
          padding: '20px',
          paddingLeft: '60px',
          textAlign: 'left',
          fontFamily: 'monospace',
          fontSize: '1.5rem',
          lineHeight: '1.5',
          overflow: 'hidden',
        }}
      >
        {/* Line 1: Static prompt - NEVER MOVES */}
        <div style={{ 
          color: '#fff', 
          whiteSpace: 'nowrap',
          height: '2.25em',
          lineHeight: '2.25em',
          marginBottom: '0.5em'
        }}>
          {PROMPT}
        </div>
        
        {/* Line 2+: Message area - fixed position, can wrap */}
        <div style={{ 
          color: '#0f0', 
          height: 'calc(200px - 2.75em - 40px)',
          wordWrap: 'break-word',
          whiteSpace: 'pre-wrap',
          lineHeight: '1.5',
          overflow: 'hidden'
        }}>
          {displayedText}
          {showCursor && <span style={{ color: '#0f0' }}>|</span>}
        </div>
      </div>
    </div>
  );
};

export default RetroMessage; 