import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

const NewsCard = ({ article }) => {
  const { title, summary, date, source, categoryId } = article;
  
  const isDomestic = categoryId === 'domestic';
  
  return (
    <article className="news-card">
      <div className="card-content">
        <div className="card-meta">
          <span className={`card-badge inline-badge ${isDomestic ? 'domestic' : 'global'}`}>
            {isDomestic ? '국내' : '글로벌'}
          </span>
          <span className="card-source">{source}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
            <Calendar size={14} />
            {date}
          </span>
        </div>
        
        <h3 className="card-title" title={title}>
          {title}
        </h3>
        
        <p className="card-summary" title={summary}>
          {summary}
        </p>
        
        <div className="card-footer">
          <a 
            href={article.url || `https://search.naver.com/search.naver?query=${encodeURIComponent(title)}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="read-more-btn"
          >
            원문 읽기 <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
