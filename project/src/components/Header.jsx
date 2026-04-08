import React from 'react';
import { Rocket } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        {/* Samsung Securities style branding */}
        <div style={{ color: 'var(--samsung-blue)', fontWeight: 800, fontSize: '1.4rem', fontStyle: 'italic', letterSpacing: '-0.05em' }}>
          SAMSUNG
        </div>
        <div style={{ color: 'var(--text-tertiary)', fontSize: '1.2rem', fontWeight: 300 }}>|</div>
        <div className="header-title">우주·방산 Sector Weekly</div>
      </div>
      <div className="header-subtitle">
        SAMSUNG SECURITIES RESEARCH
      </div>
    </header>
  );
};

export default Header;
