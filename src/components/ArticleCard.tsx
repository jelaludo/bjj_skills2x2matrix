import React from 'react';
import { Article } from '../data/articles';

interface ArticleCardProps {
  article: Article;
  onClick: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPreview = (content: string) => {
    // Remove markdown headers and get first 150 characters
    const cleanContent = content.replace(/^#+\s+/gm, '').trim();
    return cleanContent.substring(0, 150) + (cleanContent.length > 150 ? '...' : '');
  };

  return (
    <div 
      onClick={() => onClick(article)}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        transition: 'all 0.2s ease',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div>
        <h3 style={{
          margin: '0 0 10px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#333',
          lineHeight: '1.3'
        }}>
          {article.title}
        </h3>
        
        <p style={{
          margin: '0 0 15px 0',
          fontSize: '14px',
          color: '#666',
          lineHeight: '1.4',
          flex: 1
        }}>
          {getPreview(article.content)}
        </p>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px',
        color: '#888'
      }}>
        <span>{formatDate(article.createdAt)}</span>
        <span>{article.sourcePdf}</span>
      </div>
    </div>
  );
};

export default ArticleCard; 