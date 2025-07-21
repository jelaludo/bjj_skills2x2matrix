import React, { useState, useEffect, useRef } from 'react';

interface RetroMessageProps {
  disabled?: boolean;
}

const RetroMessage: React.FC<RetroMessageProps> = ({ disabled = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');
  const [textJa, setTextJa] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDisplayingMessage, setIsDisplayingMessage] = useState(false);
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
    "すべてのモデルは間違ってるけど、役に立つものもある",
    "練習を続けよう",
    "あきらめるな",
    "意識して練習を",
    "脳を起動せよ",
    "考えて、練習して、繰り返す",
    "理論だけじゃ無理",
    "読んだり、ビデオを見たりするより、練習しよう",
    "完璧より毎日",
    "スクリーン時間よりマット時間",
    "とにかく道場へ",
    "考えすぎは行動の敵",
    "呼吸して、感じて、調整する", 
    "神経回路を鍛えよう",
    "脳に寝技の型を刻め",
    "プルーフ・オブ・ワーク( 作業証明)はマットの上にも",
    "練習仲間を大切に" 
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Check if any modal is currently open
  const isModalOpen = (): boolean => {
    // Check for concept modals (both view and edit) - more comprehensive
    const conceptModals = document.querySelectorAll('div[style*="position: fixed"][style*="z-index: 1000"]');
    if (conceptModals.length > 0) {
      // Check if any of these are concept modals
      for (let i = 0; i < conceptModals.length; i++) {
        const modal = conceptModals[i] as HTMLElement;
        // Check for concept modal characteristics
        if (modal.style.background === '#222' || 
            modal.style.backgroundColor === '#222' ||
            modal.style.background === 'rgb(34, 34, 34)' ||
            modal.style.backgroundColor === 'rgb(34, 34, 34)' ||
            modal.innerHTML.includes('Edit Concept') ||
            modal.innerHTML.includes('Create New Concept') ||
            modal.innerHTML.includes('Technical Focus') ||
            modal.innerHTML.includes('Save') ||
            modal.innerHTML.includes('Cancel')) {
          // console.log('Concept modal detected, pausing motivational messages');
          return true;
        }
      }
    }
    
    // Check for other modals (DevMode, Help, etc.)
    const otherModals = document.querySelectorAll('[role="dialog"], .MuiDialog-root, [style*="position: fixed"][style*="z-index: 1000"]');
    if (otherModals.length > 0) {
      // console.log('Other modal detected, pausing motivational messages');
      return true;
    }
    
    return false;
  };

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
    // console.log('Showing message:', currentMessageIndex);
    setIsDisplayingMessage(true);
    setIsVisible(true);
    
    const message = messages[currentMessageIndex];
    const messageJa = messages_ja[currentMessageIndex];
    await typeMessage(message, messageJa);
    
    // Wait 3 seconds, then fade out
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsVisible(false);
    setText('');
    setTextJa('');
    setIsDisplayingMessage(false);
    
    // Move to next message
    setCurrentMessageIndex(prev => (prev + 1) % messages.length);
  };

  // Start inactivity timer
  const startTimer = () => {
    // Don't start timer if any modal is open
    if (isModalOpen()) {
      // console.log('Modal is open, skipping motivational message timer');
      return;
    }
    
    // console.log('Starting 1-second timer for motivational message');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      // Check again before showing message
      if (isModalOpen()) {
        // console.log('Modal opened while timer was running, skipping message');
        startTimer(); // Restart timer
        return;
      }
      // console.log('Timer completed, showing motivational message');
      showMessage();
    }, 1000);
  };

  // Reset timer on user interaction
  const resetTimer = () => {
    // console.log('User interaction detected, resetting timer');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    startTimer();
  };

  // Initialize timer and event listeners
  useEffect(() => {
    // console.log('Setting up RetroMessage component');
    
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
    // console.log('RetroMessage: Initial setup complete, starting timer');
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

  // Monitor for modal state changes and restart timer when modals close
  useEffect(() => {
    let lastModalState = isModalOpen();
    
    const checkModalState = () => {
      const currentModalState = isModalOpen();
      
      // If modal just opened, immediately hide motivational message (unless we're in the middle of displaying)
      if (!lastModalState && currentModalState && isVisible && !isDisplayingMessage) {
        // console.log('Modal opened, immediately hiding motivational message');
        setIsVisible(false);
        setText('');
        setTextJa('');
        setIsTyping(false);
      }
      
      // Only restart timer if modal state changed from open to closed and we're not displaying
      if (lastModalState && !currentModalState && !isVisible && !isTyping && !isDisplayingMessage) {
        // console.log('Modal closed, restarting motivational timer');
        startTimer();
      }
      
      lastModalState = currentModalState;
    };

    // Check every 500ms for modal state changes
    const modalCheckInterval = setInterval(checkModalState, 500);

    return () => {
      clearInterval(modalCheckInterval);
    };
  }, [isVisible, isTyping, isDisplayingMessage]);

  // If disabled, don't render anything
  if (disabled) {
    return null;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 font-mono z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}>
      <div 
        className="absolute bg-black border border-white rounded p-4 md:p-6 max-w-xs md:max-w-lg mx-2"
        style={{
          fontFamily: 'Courier New, monospace',
          textShadow: '0 0 2px rgba(255, 255, 255, 0.5)',
          backgroundColor: 'rgba(0, 0, 0, 0.80)',
          position: 'fixed',
          top: matrixPosition.top + (matrixPosition.height / 2),
          left: matrixPosition.left + (matrixPosition.width / 2),
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          width: '90vw',
          maxWidth: '500px'
        }}
      >
        <div className="text-sm md:text-lg" style={{ lineHeight: '1.2rem', wordWrap: 'break-word' }}>
          <div style={{ minHeight: '1.2rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="text-white text-xs md:text-sm">root@grapplingprimitives:~$</span> 
            <span className="text-white ml-2 text-xs md:text-sm">./motivational_message</span>
          </div>
          <div style={{ minHeight: '1.2rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ color: 'green', wordBreak: 'break-word' }}>{text}</span>
            {isTyping && !textJa && (
              <span 
                style={{
                  display: 'inline-block',
                  width: '4px',
                  height: '16px',
                  backgroundColor: 'green',
                  marginLeft: '4px',
                  animation: 'blink 1s infinite'
                }}
              ></span>
            )}
          </div>
          <div style={{ minHeight: '1.2rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ color: 'green', wordBreak: 'break-word' }}>{textJa}</span>
            {isTyping && textJa && (
              <span 
                style={{
                  display: 'inline-block',
                  width: '4px',
                  height: '16px',
                  backgroundColor: 'green',
                  marginLeft: '4px',
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