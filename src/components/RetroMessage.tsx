import React, { useState, useEffect, useRef } from 'react';

const RetroMessage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');
  const [textJa, setTextJa] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [matrixPosition, setMatrixPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const messages_ja = [
    "すべてのモデルは誤り、ただし役立つものもある",
    "練習を続けよう",
    "あきらめるな",
    "意識的な練習を",
    "脳を起動せよ",
    "考えて、練習して、繰り返せ",
    "理論だけじゃ勝てない",
    "読むより転がれ",
    "完璧より毎日",
    "スクリーン時間よりマット時間",
    "とにかく道場へ",
    "考えすぎは行動の敵",
    "呼吸して、感じて、調整する", 
    "神経回路を鍛えよう",
    "脳に寝技の型を刻め",
    "プルーフ・オブ・ワーク( 作業証明)はマットの上に", 
    "練習仲間を大切に" 
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Simple typing animation for both languages
  const typeMessage = async (message: string, messageJa: string) => {
    setIsTyping(true);
    setText('');
    setTextJa('');
    
    // Type English first
    for (let i = 0; i <= message.length; i++) {
      setText(message.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Wait a moment, then type Japanese
    await new Promise(resolve => setTimeout(resolve, 500));
    
    for (let i = 0; i <= messageJa.length; i++) {
      setTextJa(messageJa.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setIsTyping(false);
  };

  // Show message sequence
  const showMessage = async () => {
    console.log('Showing message:', currentMessageIndex);
    setIsVisible(true);
    
    const message = messages[currentMessageIndex];
    const messageJa = messages_ja[currentMessageIndex];
    await typeMessage(message, messageJa);
    
    // Wait 3 seconds, then fade out
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsVisible(false);
    setText('');
    setTextJa('');
    
    // Move to next message
    setCurrentMessageIndex(prev => (prev + 1) % messages.length);
  };

  // Start inactivity timer
  const startTimer = () => {
    console.log('Starting 1-second timer');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      showMessage();
    }, 1000);
  };

  // Reset timer on user interaction
  const resetTimer = () => {
    console.log('User interaction detected, resetting timer');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    startTimer();
  };

  // Initialize timer and event listeners
  useEffect(() => {
    console.log('Setting up RetroMessage component');
    
    // Get matrix position
    const updateMatrixPosition = () => {
      const matrixContainer = document.querySelector('.scatter-plot-container');
      if (matrixContainer) {
        const rect = matrixContainer.getBoundingClientRect();
        setMatrixPosition({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        });
      }
    };
    
    // Update position on load and resize
    updateMatrixPosition();
    window.addEventListener('resize', updateMatrixPosition);
    
    // Start initial timer
    startTimer();
    
    // Add event listeners
    const handleInteraction = () => {
      if (isVisible) return; // Don't reset if message is currently showing
      resetTimer();
    };
    
    document.addEventListener('mousemove', handleInteraction);
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keypress', handleInteraction);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      window.removeEventListener('resize', updateMatrixPosition);
      document.removeEventListener('mousemove', handleInteraction);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keypress', handleInteraction);
    };
  }, []);

  // Restart timer after message completes
  useEffect(() => {
    if (!isVisible && !isTyping) {
      startTimer();
    }
  }, [isVisible, isTyping]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 font-mono z-50">
      <div 
        className="absolute bg-black border border-white rounded p-6 max-w-lg"
        style={{
          fontFamily: 'Courier New, monospace',
          textShadow: '0 0 2px rgba(255, 255, 255, 0.5)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          position: 'fixed',
          top: matrixPosition.top + (matrixPosition.height / 2),
          left: matrixPosition.left + (matrixPosition.width / 2),
          transform: 'translate(-50%, -50%)',
          zIndex: 1000
        }}
      >
        <div className="text-white text-lg" style={{ lineHeight: '1.5rem' }}>
          <div style={{ height: '1.5rem', display: 'flex', alignItems: 'center' }}>
            <span className="text-gray-400">root@grapplingprimitives:~$</span> 
            <span className="ml-2">./motivational_message</span>
          </div>
          <div style={{ height: '1.5rem', display: 'flex', alignItems: 'center' }}>
            {text}
            {isTyping && !textJa && (
              <span 
                className="inline-block w-2 h-6 bg-white ml-1"
                style={{
                  animation: 'blink 1s infinite'
                }}
              ></span>
            )}
          </div>
          <div style={{ height: '1.5rem', display: 'flex', alignItems: 'center' }}>
            {textJa}
            {isTyping && textJa && (
              <span 
                className="inline-block w-2 h-6 bg-white ml-1"
                style={{
                  animation: 'blink 1s infinite'
                }}
              ></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetroMessage; 