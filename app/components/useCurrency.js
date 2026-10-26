'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';

export function detectCountryCurrency() {
  if (typeof window === 'undefined') return 'INR';
  try {
    const timeZone = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
    const isPakistaniTz =
      timeZone.includes('karachi') ||
      timeZone.includes('pakistan') ||
      timeZone === 'asia/karachi';

    const isIndianTz =
      timeZone.includes('calcutta') ||
      timeZone.includes('kolkata') ||
      timeZone.includes('india') ||
      timeZone === 'asia/calcutta' ||
      timeZone === 'asia/kolkata';

    const lang = (navigator.language || '').toLowerCase();
    const languages = (navigator.languages || []).map((l) => l.toLowerCase());

    const isPakistaniLocale =
      lang === 'ur' ||
      lang.startsWith('ur-') ||
      lang.endsWith('-pk') ||
      languages.some((l) => l.endsWith('-pk') || l.startsWith('ur-') || l === 'ur');

    const isIndianLocale =
      lang === 'en-in' ||
      lang === 'hi' ||
      lang.startsWith('hi-') ||
      lang.endsWith('-in') ||
      languages.some((l) => l === 'en-in' || l.endsWith('-in') || l.startsWith('hi-'));

    // Timezone offset check: India is UTC+5:30 (-330 mins), Pakistan is UTC+5:00 (-300 mins)
    const tzOffset = new Date().getTimezoneOffset();

    let detected = 'USD';
    if (isPakistaniTz || isPakistaniLocale || (tzOffset === -300 && timeZone.includes('karachi'))) {
      detected = 'PK_USD';
    } else if (isIndianTz || isIndianLocale || tzOffset === -330) {
      detected = 'INR';
    }

    try {
      localStorage.setItem('pixelmutiny_currency', detected);
    } catch {}
    return detected;
  } catch {
    return 'INR';
  }
}

export function getInitialCurrency() {
  return detectCountryCurrency();
}

function subscribeCurrency(callback) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('pixelmutiny_currency_change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('pixelmutiny_currency_change', callback);
  };
}

function getCurrencySnapshot() {
  return getInitialCurrency();
}

function getServerCurrencySnapshot() {
  return 'INR';
}

export function useCurrency() {
  const currency = useSyncExternalStore(
    subscribeCurrency,
    getCurrencySnapshot,
    getServerCurrencySnapshot
  );

  // Background IP geo lookup to automatically detect location
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isMounted = true;
    fetch('/api/geo')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted || !data || !data.currency) return;
        const currentSaved = localStorage.getItem('pixelmutiny_currency');
        if (currentSaved !== data.currency) {
          try {
            localStorage.setItem('pixelmutiny_currency', data.currency);
            window.dispatchEvent(new Event('pixelmutiny_currency_change'));
          } catch {}
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const setCurrency = useCallback((newCurrency) => {
    if (!['INR', 'USD', 'PK_USD', 'PKR'].includes(newCurrency)) return;
    try {
      localStorage.setItem('pixelmutiny_currency', newCurrency);
      window.dispatchEvent(new Event('pixelmutiny_currency_change'));
    } catch {}
  }, []);

  return {
    currency,
    setCurrency,
    isUSD: currency === 'USD' || currency === 'PK_USD' || currency === 'PKR',
    isPakistan: currency === 'PK_USD' || currency === 'PKR',
    isINR: currency === 'INR',
    isLoaded: true,
  };
}
