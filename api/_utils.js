// api/_utils.js — OAuth + JSON helpers (final)

// API domain from env, sanitized:
const RAW_API = process.env.ZOHO_BASE_DOMAIN || 'zohoapis.com';
const ZOHO_BASE_DOMAIN = RAW_API.trim().replace(/^https?:\/\/(www\.)?/, '');

// Map API domain → Accounts + Inventory hosts:
//   zohoapis.com → zoho.com
//   zohoapis.eu  → zoho.eu
//   zohoapis.in  → zoho.in
const ACCOUNTS_HOST  = ZOHO_BASE_DOMAIN.replace(/^zohoapis\./, 'zoho.');
const INVENTORY_HOST = ZOHO_BASE_DOMAIN.replace(/^zohoapis\./, 'zoho.');

let cachedAccessToken = null;
let cachedExpiry = 0;

async function getAccessToken() {
  const now = Date.now();
  if (cachedAccessToken && now < cachedExpiry - 60_000) return cachedAccessToken;

  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    grant_type: 'refresh_token',
  });

  const tokenUrl = `https://accounts.${ACCOUNTS_HOST}/oauth/v2/token`;

  let res;
  try {
    res = await fetch(tokenUrl, { method: 'POST', body: params });
  } catch (e) {
    throw new Error(`Token fetch failed (${tokenUrl}) :: ${e?.message || e}`);
  }
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Token refresh failed (${tokenUrl}) :: ${res.status} ${txt}`);
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
    req.on('end', () => { try { resolve(data ? JSON.parse(data) : {}); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}

module.exports = {
  getAccessToken,
  readJson,
  ZOHO_BASE_DOMAIN,     // e.g. zohoapis.com
  ACCOUNTS_HOST,        // e.g. zoho.com
  INVENTORY_HOST        // e.g. zoho.com
};
