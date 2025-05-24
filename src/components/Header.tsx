import React from 'react';

const Header: React.FC = () => (
  <header style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#232323',
    padding: '18px 32px',
    borderBottom: '1px solid #222',
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: 1,
  }}>
    <span>BJJ Skill Matrix</span>
    <div style={{ display: 'flex', gap: 16 }}>
      <button style={{ background: '#333', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px', cursor: 'pointer' }}>🌙 Theme</button>
      <button style={{ background: '#333', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px', cursor: 'pointer' }}>❓ Help</button>
    </div>
  </header>
);

export default Header; 