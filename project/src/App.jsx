import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import NewsCard from './components/NewsCard'
import { mockNews } from './data/mockNews'
import './App.css'

function App() {
  const [news, setNews] = useState([])
  const [filter, setFilter] = useState('전체')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setNews(mockNews)
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredNews = filter === '전체' 
    ? news 
    : news.filter(item => item.category === filter)

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Filter activeFilter={filter} onFilterChange={setFilter} />
        
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p className="loader-text">뉴스를 불러오는 중입니다...</p>
          </div>
        ) : (
          <div className="news-grid">
            {filteredNews.map(item => (
              <NewsCard key={item.id} article={item} />
            ))}
            {filteredNews.length === 0 && (
              <div className="no-results">
                <h3>검색 결과가 없습니다.</h3>
                <p>다른 필터를 선택해 보세요.</p>
              </div>
            )}
          </div>
        )}
      </main>
      <footer className="footer">
        <p>&copy; 2024 E1 Corporation. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
