'use client';

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react';
import Script from 'next/script';

interface TurnstileRenderOptions {
  sitekey: string;
  theme?: 'auto' | 'light' | 'dark';
  appearance?: 'always' | 'execute' | 'interaction-only';
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

// When unset, the widget renders nothing and the server skips verification (demo mode)
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

export interface TurnstileHandle {
  /** Tokens are single-use: call after each submission to fetch a fresh one. */
  reset: () => void;
}

interface TurnstileWidgetProps {
  onTokenChange: (token: string | null) => void;
  appearance?: TurnstileRenderOptions['appearance'];
  className?: string;
  ref?: Ref<TurnstileHandle>;
}

export function TurnstileWidget({ onTokenChange, appearance = 'always', className, ref }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      onTokenChangeRef.current(null);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    }
  }), []);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !scriptReady || !containerRef.current || !window.turnstile) return;

    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: 'auto',
      appearance,
      callback: token => onTokenChangeRef.current(token),
      'expired-callback': () => onTokenChangeRef.current(null),
      'error-callback': () => onTokenChangeRef.current(null)
    });
    widgetIdRef.current = widgetId;

    return () => {
      window.turnstile?.remove(widgetId);
      widgetIdRef.current = null;
      onTokenChangeRef.current(null);
    };
  }, [scriptReady, appearance]);

  if (!TURNSTILE_SITE_KEY) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} className={className} />
    </>
  );
}
