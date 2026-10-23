'use client';

import { useCallback, useSyncExternalStore } from 'react';

export function getInitialCurrency() {
  if (typeof window === 'undefined') return 'INR';
  try {
    const saved = localStorage.getItem('pixelmutiny_currency');
    if (saved === 'INR' || saved === 'USD') return saved;

    // Detect if user is in India via timeZone or language
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const isIndia =
      timeZone.toLowerCase().includes('calcutta') ||
      timeZone.toLowerCase().includes('kolkata') ||
      timeZone.toLowerCase().includes('india') ||
      navigator.language === 'en-IN' ||
      (navigator.languages && navigator.languages.some((l) => l.includes('IN')));

    return isIndia ? 'INR' : 'USD';
  } catch {
    return 'INR';
  }
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

  const setCurrency = useCallback((newCurrency) => {
    if (newCurrency !== 'INR' && newCurrency !== 'USD') return;
    try {
      localStorage.setItem('pixelmutiny_currency', newCurrency);
      window.dispatchEvent(new Event('pixelmutiny_currency_change'));
    } catch {}
  }, []);

  return { currency, setCurrency, isLoaded: true };
}
