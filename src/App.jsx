import { useState, useEffect, useRef } from 'react';
import NewsCard from './components/NewsCard';
import { Newspaper, LogOut, Sun, Moon, Settings, Search } from 'lucide-react';
import { fetchNews } from './services/newsService';
import WeatherBar from './components/WeatherBar';
import OilTicker from './components/OilTicker';
import Auth from './components/Auth';
import { supabase } from './lib/supabaseClient';
import './index.css';

function App() {
  const [session, setSession] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('E1 주식회사');
  const [visibleCount, setVisibleCount] = useState(12);

  const loadMoreRef = useRef(null);

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [showSettings, setShowSettings] = useState(false);
  const [widgetPreferences, setWidgetPreferences] = useState(() => {
    const saved = localStorage.getItem('widgetPreferences');
    return saved ? JSON.parse(saved) : { weather: true, oil: true };
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('widgetPreferences', JSON.stringify(widgetPreferences));
  }, [widgetPreferences]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);


  useEffect(() => {
    if (!session) return;

    async function loadNews() {
      try {
        setLoading(true);
        const q = searchQuery.trim() ? searchQuery : category;
        const articles = await fetchNews(q);
        setNews(articles);
        setVisibleCount(12);
        setError(null);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching news.');
      } finally {
        setLoading(false);
      }
    }
    
    const timeout = setTimeout(() => {
      loadNews();
    }, 500);
    return () => clearTimeout(timeout);
  }, [session, searchQuery, category]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && visibleCount < news.length) {
        setVisibleCount(prev => prev + 12);
      }
    }, { threshold: 0.1 });
    
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [loading, visibleCount, news.length]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!session) {
    return <Auth onAuthSuccess={() => {}} />;
  }

  return (
    <>
      <header className="glass-header">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'var(--accent-glow)', padding: '0.75rem', border: '1px solid var(--accent-color)', borderRadius: '14px', color: 'var(--accent-color)', boxShadow: '0 0 20px var(--accent-glow)' }}>
              <Newspaper size={28} />
            </div>
            <div>
              <h1 className="text-gradient">E1 Insight</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem', fontWeight: 500 }}>Daily News Scrapbook for E1 Corporation</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button onClick={toggleTheme} className="icon-btn" title="Toggle Theme">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowSettings(!showSettings)} className="icon-btn" title="Widget Settings">
                <Settings size={20} />
              </button>
              {showSettings && (
                <div className="settings-dropdown glass animate-enter">
                  <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>Dashboard Widgets</h4>
                  <label className="toggle-label">
                    <input type="checkbox" checked={widgetPreferences.weather} onChange={(e) => setWidgetPreferences(p => ({ ...p, weather: e.target.checked }))} />
                    Weather Forecast
                  </label>
                  <label className="toggle-label" style={{ marginTop: '0.8rem' }}>
                    <input type="checkbox" checked={widgetPreferences.oil} onChange={(e) => setWidgetPreferences(p => ({ ...p, oil: e.target.checked }))} />
                    Oil Prices
                  </label>
                </div>
              )}
            </div>
            <div style={{ textAlign: 'right', display: 'none', '@media (min-width: 640px)': { display: 'block' } }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{session.user.email}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Logged in</p>
            </div>
            <button onClick={handleLogout} className="logout-btn" title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {widgetPreferences.weather && (
        <div className="container" style={{ marginTop: '1rem' }}>
          <WeatherBar />
        </div>
      )}
      {widgetPreferences.oil && <OilTicker />}

      <main className="container" style={{ minHeight: '80vh', paddingBottom: '4rem' }}>
        <div className="search-filter-bar glass" style={{ marginTop: '2rem', padding: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1 1 300px', display: 'flex', alignItems: 'center', background: 'rgba(120, 120, 120, 0.1)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '0.75rem 1rem' }}>
            <Search size={20} color="var(--text-secondary)" style={{ marginRight: '0.5rem' }} />
            <input 
              type="text" 
              placeholder="Search news..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', width: '100%', outline: 'none' }}
            />
          </div>
          <select 
            value={category}
            onChange={(e) => { setCategory(e.target.value); setSearchQuery(''); }}
            style={{ padding: '0.85rem 1.25rem', borderRadius: '12px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', outline: 'none', cursor: 'pointer', flex: '0 0 auto', backdropFilter: 'blur(10px)' }}
          >
            <option value="E1 주식회사">E1 & Corporate</option>
            <option value="LPG 에너지">LPG & Energy</option>
            <option value="수소 에너지">Hydrogen Energy</option>
            <option value="글로벌 에너지 경제">Global Economy</option>
          </select>
        </div>

        {loading && news.length === 0 ? (
          <div className="news-grid" style={{ paddingTop: '3rem' }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="glass skeleton" style={{ height: '240px' }}></div>
            ))}
          </div>
        ) : error ? (
          <div className="glass" style={{ padding: '3rem', textAlign: 'center', marginTop: '4rem', color: '#ff6b6b' }}>
            <h3>Failed to load news</h3>
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="news-grid" style={{ paddingTop: '3rem' }}>
              {news.slice(0, visibleCount).map((item, index) => (
                <NewsCard key={`${item.link}-${index}`} article={item} index={index} />
              ))}
            </div>
            {visibleCount < news.length && (
              <div ref={loadMoreRef} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Loading more articles...
              </div>
            )}
            {news.length === 0 && !loading && (
              <div className="glass" style={{ padding: '3rem', textAlign: 'center', marginTop: '2rem' }}>
                <p>No news articles found.</p>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default App;
