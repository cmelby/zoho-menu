// api/_utils.js — shared helpers for Zoho OAuth + JSON parsing

// Normalize domain: trims spaces and strips protocol so you can safely build URLs.
const RAW_DOMAIN = process.env.ZOHO_BASE_DOMAIN || 'zohoapis.com';
const ZOHO_BASE_DOMAIN = RAW_DOMAIN.trim().replace(/^https?:\/\/(www\.)?/, '');

let cachedAccessToken = null;
let cachedExpiry = 0;

async function getAccessToken() {
  const now = Date.now();
  if (cachedAccessToken && now < cachedExpiry - 60_000) {
    return cachedAccessToken;
  }

  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    grant_type: 'refresh_token',
  });

  const tokenUrl = `https://accounts.${ZOHO_BASE_DOMAIN}/oauth/v2/token`;
  const res = await fetch(tokenUrl, { method: 'POST', body: params });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Token refresh failed: ${res.status} ${txt}`);
  }

  const data = await res.json();
  cachedAccessToken = data.access_token;
  cachedExpiry = Date.now() + (data.expires_in || 3600) * 1000;
  return cachedAccessToken;
}

async function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', c => { data += c; });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

module.exports = { getAccessToken, readJson, ZOHO_BASE_DOMAIN };
