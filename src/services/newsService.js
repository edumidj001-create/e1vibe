export async function fetchNews(query) {
  try {
    // Note: In production, you should use a backend to proxy Naver API calls
    // with your client ID and secret. Here we assume a Vite proxy setup or local backend.
    const url = `/api/naver/v1/search/news.json?query=${encodeURIComponent(query)}&display=50&sort=date`;
    
    const response = await fetch(url, {
      headers: {
        'X-Naver-Client-Id': import.meta.env.VITE_NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': import.meta.env.VITE_NAVER_CLIENT_SECRET
      }
    });

    if (!response.ok) {
      throw new Error(`Naver API failed: ${response.status}`);
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('fetchNews Error:', error);
    throw error;
  }
}
