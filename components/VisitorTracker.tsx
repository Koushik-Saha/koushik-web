'use client';

import { useEffect } from 'react';

export function VisitorTracker() {
  useEffect(() => {
    let clientIp = '';
    let clientCity = '';
    let clientCountry = '';

    // Fetch client IP/Geo info to support localhost testing and fallback geo-resolution
    const fetchGeoData = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
          const data = await res.json();
          clientIp = data.ip || '';
          clientCity = data.city || '';
          clientCountry = data.country_name || '';
        }
      } catch {
        // Fallback silently
      }
    };

    const trackVisit = async () => {
      try {
        const alreadyTracked = sessionStorage.getItem('koushik_portfolio_visited');
        if (alreadyTracked) return;

        await fetchGeoData();

        const payload = {
          type: 'visit',
          pageUrl: window.location.href,
          referrer: document.referrer || 'Direct Link / ATS / Resume PDF',
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language || 'en-US',
          userAgent: navigator.userAgent,
          clientIp,
          clientCity,
          clientCountry
        };

        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        sessionStorage.setItem('koushik_portfolio_visited', 'true');
      } catch (err) {
        console.warn('Analytics visit tracking error:', err);
      }
    };

    // Track the initial page visit
    trackVisit();

    // Track global interactions/clicks
    const handleGlobalClick = async (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement;
        const interactiveEl = target.closest('a, button, [role="button"], input, select, textarea');
        
        let clickTarget = '';
        if (interactiveEl) {
          const tagName = interactiveEl.tagName.toLowerCase();
          const id = interactiveEl.id ? `#${interactiveEl.id}` : '';
          const firstClass = interactiveEl.className && typeof interactiveEl.className === 'string'
            ? `.${interactiveEl.className.trim().split(/\s+/)[0]}`
            : '';
          const textContent = interactiveEl.textContent?.trim().slice(0, 40) || '';
          const href = interactiveEl.getAttribute('href') || '';
          
          clickTarget = `<${tagName}${id}${firstClass}>${textContent ? ` "${textContent}"` : ''}${href ? ` [href: ${href}]` : ''}`;
        } else {
          // Track general elements if they have text contents (e.g. headers, project cards)
          const tagName = target.tagName.toLowerCase();
          // Skip high level structure wrappers to avoid clutter
          if (['div', 'section', 'main', 'body', 'html', 'span', 'svg', 'path'].includes(tagName)) {
            return;
          }
          const textContent = target.textContent?.trim().slice(0, 30) || '';
          const id = target.id ? `#${target.id}` : '';
          clickTarget = `<${tagName}${id}>${textContent ? ` "${textContent}"` : ''}`;
        }

        if (!clickTarget) return;

        // If client IP data has not been retrieved yet, try to fetch it
        if (!clientIp) {
          await fetchGeoData();
        }

        const payload = {
          type: 'click',
          pageUrl: window.location.href,
          referrer: document.referrer || 'Direct Link / ATS / Resume PDF',
          userAgent: navigator.userAgent,
          clickTarget,
          clientIp,
          clientCity,
          clientCountry
        };

        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      } catch {
        // Fail silently
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return null;
}
