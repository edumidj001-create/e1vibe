import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { fetchOilPrices } from '../services/oilService';

export default function OilTicker() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrices() {
      try {
        const data = await fetchOilPrices();
        setPrices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPrices();
  }, []);

  if (loading || prices.length === 0) return null;

  return (
    <div className="oil-ticker-container glass">
      <div className="ticker-wrapper">
        <div className="ticker-label">
          <TrendingUp size={16} />
          <span>OIL MARKET</span>
        </div>
        <div className="ticker-items">
          {[...prices, ...prices].map((price, i) => (
            <div key={i} className="ticker-item">
              <span className="oil-name">{price.name}</span>
              <span className="oil-price">{price.price.toLocaleString()}</span>
              <span className="oil-unit">{price.unit}</span>
              <TrendingUp size={14} className="trend-icon pos" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
