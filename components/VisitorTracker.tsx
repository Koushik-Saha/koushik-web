'use client';

import { useEffect } from 'react';

export function VisitorTracker() {
  useEffect(() => {
    try {
      const alreadyTracked = sessionStorage.getItem('koushik_portfolio_visited');
      if (alreadyTracked) return;

      const payload = {
        pageUrl: window.location.href,
        referrer: document.referrer || 'Direct Link / ATS / Resume PDF',
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language || 'en-US',
        userAgent: navigator.userAgent
      };

      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(() => {
          sessionStorage.setItem('koushik_portfolio_visited', 'true');
        })
        .catch(err => {
          console.warn('Analytics tracking error:', err);
        });
    } catch {
      // client fail-safe
    }
  }, []);

  return null;
}
