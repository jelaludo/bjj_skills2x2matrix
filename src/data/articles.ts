export interface Article {
  id: string;
  title: string;
  content: string;
  sourcePdf: string;
  createdAt: string;
  metadata: {
    pages: number;
    fileSize: string;
    extractedAt: string;
  };
}

export interface ArticleRegistry {
  articles: Array<{
    id: string;
    title: string;
    contentFile: string;
    sourcePdf: string;
    createdAt: string;
    metadata: {
      pages: number;
      fileSize: string;
      extractedAt: string;
    };
  }>;
  lastUpdated: string;
}

// Load the articles registry
export const loadArticlesRegistry = async (): Promise<ArticleRegistry> => {
  try {
    const response = await fetch('http://localhost:3001/api/articles/registry');
    if (!response.ok) {
      throw new Error('Failed to load articles registry');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading articles registry:', error);
    return { articles: [], lastUpdated: new Date().toISOString() };
  }
};

// Load a specific article by its content file
export const loadArticle = async (contentFile: string): Promise<Article | null> => {
  try {
    const response = await fetch(`http://localhost:3001/api/articles/${contentFile}`);
    if (!response.ok) {
      throw new Error(`Failed to load article: ${contentFile}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading article:', error);
    return null;
  }
};

// Load all articles
export const loadAllArticles = async (): Promise<Article[]> => {
  try {
    const registry = await loadArticlesRegistry();
    const articles: Article[] = [];
    
    for (const articleRef of registry.articles) {
      const article = await loadArticle(articleRef.contentFile);
      if (article) {
        articles.push(article);
      }
    }
    
    // Sort by creation date (newest first)
    return articles.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error('Error loading all articles:', error);
    return [];
  }
};

// Search articles by title or content
export const searchArticles = async (query: string): Promise<Article[]> => {
  const articles = await loadAllArticles();
  const lowercaseQuery = query.toLowerCase();
  
  return articles.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.content.toLowerCase().includes(lowercaseQuery)
  );
}; 