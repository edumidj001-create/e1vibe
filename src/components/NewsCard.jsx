import React from 'react';
import { ExternalLink, Clock, Bookmark, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function NewsCard({ article, index }) {
  const publishedDate = new Date(article.pubDate).toLocaleDateString();
  
  const handleArticleClick = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    try {
      await supabase.from('article_clicks').insert({
        user_id: session.user.id,
        article_title: article.title.replace(/<\/?[^>]+(>|$)/g, ""),
        article_url: article.link
      });
      console.log('Click tracked');
    } catch (err) {
      console.error('Error tracking click:', err);
    }
  };

  return (
    <div 
      className="news-card glass animate-enter" 
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="card-top">
        <span className="source-tag">News</span>
        <div className="card-actions">
          <button className="card-btn" title="Save for later"><Bookmark size={16} /></button>
          <button className="card-btn" title="Share"><Share2 size={16} /></button>
        </div>
      </div>
      
      <a 
        href={article.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="card-content"
        onClick={handleArticleClick}
      >
        <h3 dangerouslySetInnerHTML={{ __html: article.title }}></h3>
        <p dangerouslySetInnerHTML={{ __html: article.description }}></p>
      </a>

      <div className="card-footer">
        <div className="card-meta">
          <Clock size={14} />
          <span>{publishedDate}</span>
        </div>
        <a 
          href={article.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="read-more"
          onClick={handleArticleClick}
        >
          Read Full <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
