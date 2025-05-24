import React from 'react';

interface MainLayoutProps {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
}

const HEADER_HEIGHT = 64; // px, adjust if your header is taller/shorter

const MainLayout: React.FC<MainLayoutProps> = ({ sidebar, header, children }) => {
  return (
    <div style={{ height: '100vh', background: '#181818', color: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ height: HEADER_HEIGHT, flexShrink: 0 }}>{header}</div>
      <div style={{ display: 'flex', flex: 1, minHeight: 0, height: `calc(100vh - ${HEADER_HEIGHT}px)`, overflow: 'hidden' }}>
        <aside style={{ width: 260, background: '#232323', padding: '24px 16px', borderRight: '1px solid #222', height: '100%', overflowY: 'auto' }}>
          {sidebar}
        </aside>
        <main style={{ flex: 1, minHeight: 0, height: '100%', display: 'flex', overflow: 'hidden' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 