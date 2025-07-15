import React, { useState, useEffect } from 'react';

interface VersionInfo {
  date: string;
  commitMessage: string;
  commitHash: string;
}

const VersionInfo: React.FC = () => {
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVersionInfo = () => {
      try {
        // Try to import the version info file
        import('../versionInfo.json')
          .then((data) => {
            setVersionInfo({
              date: data.commitDate,
              commitMessage: data.commitMessage,
              commitHash: data.commitHash
            });
          })
          .catch(() => {
            // Fallback if file doesn't exist
            setVersionInfo({
              date: new Date().toLocaleDateString(),
              commitMessage: 'Version info unavailable',
              commitHash: 'unknown'
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (error) {
        console.error('Failed to load version info:', error);
        setVersionInfo({
          date: new Date().toLocaleDateString(),
          commitMessage: 'Version info unavailable',
          commitHash: 'unknown'
        });
        setIsLoading(false);
      }
    };

    loadVersionInfo();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 8,
      right: 8,
      fontSize: '10px',
      color: '#666',
      fontFamily: 'monospace',
      background: 'rgba(0, 0, 0, 0.3)',
      padding: '4px 8px',
      borderRadius: '4px',
      zIndex: 1000,
      pointerEvents: 'none',
      userSelect: 'none',
      opacity: 0.7,
      transition: 'opacity 0.2s'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.opacity = '1';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.opacity = '0.7';
    }}
    >
      {versionInfo && (
        <>
          <div style={{ fontSize: '9px', marginBottom: '1px' }}>
            {versionInfo.date}
          </div>
          <div style={{ fontSize: '8px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {versionInfo.commitMessage}
          </div>
        </>
      )}
    </div>
  );
};

export default VersionInfo; 