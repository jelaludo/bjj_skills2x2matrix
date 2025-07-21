import React, { useState, useEffect } from 'react';
import { Article, loadAllArticles, searchArticles } from '../data/articles';
import ArticleCard from './ArticleCard';
import ArticleView from './ArticleView';

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  }, [searchQuery, articles]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const loadedArticles = await loadAllArticles();
      setArticles(loadedArticles);
      setFilteredArticles(loadedArticles);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  if (selectedArticle) {
    return <ArticleView article={selectedArticle} onBack={handleBackToList} />;
  }

  return (
    <div style={{
      fontFamily: 'Georgia, serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      color: '#333',
      backgroundColor: '#fff'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{
          margin: '0 0 20px 0',
          fontSize: '32px',
          fontWeight: '600',
          color: '#333'
        }}>
          Articles
        </h1>
        
        <p style={{
          margin: '0 0 20px 0',
          fontSize: '16px',
          color: '#666',
          lineHeight: '1.5'
        }}>
          Ultra-lightweight, minimalist articles inspired by the motherfucking website design philosophy.
        </p>

        {/* Search Bar */}
        <div style={{ marginBottom: '30px' }}>
          <input
            type="text"
            placeholder="Search articles by title or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '12px 16px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontFamily: 'Georgia, serif'
            }}
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          fontSize: '16px',
          color: '#666'
        }}>
          Loading articles...
        </div>
      )}

      {/* Articles Grid */}
      {!loading && (
        <>
          {filteredArticles.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              fontSize: '16px',
              color: '#666'
            }}>
              {searchQuery ? 'No articles found matching your search.' : 'No articles available.'}
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '20px',
              marginBottom: '40px'
            }}>
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onClick={handleArticleClick}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <div style={{
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #eee',
        fontSize: '14px',
        color: '#666',
        textAlign: 'center'
      }}>
        <p>
          <strong>Design Philosophy:</strong> Ultra-lightweight, minimalist design inspired by 
          <a href="https://thebestmotherfucking.website/" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>
            thebestmotherfucking.website
          </a> and 
          <a href="http://bettermotherfuckingwebsite.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>
            bettermotherfuckingwebsite.com
          </a>.
        </p>
      </div>
    </div>
  );
};

export default Articles; 