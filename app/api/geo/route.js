import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const headers = request.headers;
    const country =
      headers.get('cf-ipcountry') ||
      headers.get('x-vercel-ip-country') ||
      headers.get('x-country-code') ||
      headers.get('geoip-country-code');

    const normalizedCountry = country ? country.toUpperCase() : null;

    let currency = 'USD';
    if (normalizedCountry === 'IN') {
      currency = 'INR';
    } else if (normalizedCountry === 'PK') {
      currency = 'PK_USD';
    }

    return NextResponse.json({
      country: normalizedCountry,
      currency: normalizedCountry ? currency : null,
      detectedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ country: null, currency: null });
  }
}
