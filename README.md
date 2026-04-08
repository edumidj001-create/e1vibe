# E1 Insight - Daily News Scrapbook

E1 Insight is a specialized news scraping dashboard for E1 Corporation. It provides real-time updates on E1 corporate news, LPG energy trends, hydrogen economy, and global energy markets.

## Features

- **Automated News Scraping**: Real-time news aggregation using Naver News Search API.
- **Supabase Integration**: 
  - User authentication (Sign up / Login).
  - Article click history tracking (`article_clicks` table).
  - Persistent user profiles.
- **Dynamic Dashboard**:
  - Live oil price ticker.
  - Real-time weather forecast.
  - Search and filter by categories.
  - Responsive glassmorphism UI.
- **Premium Design**: Dark/Light mode support with smooth transitions and premium aesthetics.

## Tech Stack

- **Frontend**: React, Vite, Lucide React
- **Backend/DB**: Supabase (Auth, Postgres)
- **Styling**: Vanilla CSS (Modern CSS variables)

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env.local` file with your Supabase credentials.
4. Run locally: `npm run dev`

---
*Created for E1 Corporation.*
