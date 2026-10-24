'use client';

import { useCallback, useSyncExternalStore } from 'react';

export function detectCountryCurrency() {
  if (typeof window === 'undefined') return 'INR';
  try {
    const saved = localStorage.getItem('pixelmutiny_currency');
    if (saved === 'INR' || saved === 'USD') return saved;

    // Detect if visitor is in India via timeZone, locale, or browser languages
    const timeZone = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
    const isIndianTz =
      timeZone.includes('calcutta') ||
      timeZone.includes('kolkata') ||
      timeZone.includes('india') ||
      timeZone === 'asia/calcutta' ||
      timeZone === 'asia/kolkata';

    const lang = (navigator.language || '').toLowerCase();
    const languages = (navigator.languages || []).map((l) => l.toLowerCase());
    const isIndianLocale =
      lang === 'en-in' ||
      lang === 'hi' ||
      lang.startsWith('hi-') ||
      lang.endsWith('-in') ||
      languages.some((l) => l === 'en-in' || l.endsWith('-in') || l.startsWith('hi-'));

    const detected = (isIndianTz || isIndianLocale) ? 'INR' : 'USD';
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

  const setCurrency = useCallback((newCurrency) => {
    if (newCurrency !== 'INR' && newCurrency !== 'USD') return;
    try {
      localStorage.setItem('pixelmutiny_currency', newCurrency);
      window.dispatchEvent(new Event('pixelmutiny_currency_change'));
    } catch {}
  }, []);

  return { currency, setCurrency, isLoaded: true };
}
