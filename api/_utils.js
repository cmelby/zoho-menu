// api/_utils.js — OAuth + JSON helpers with correct domain mapping and verbose errors.

// 1) Normalize API domain (used for data APIs like inventory.zohoapis.com)
const RAW_API = process.env.ZOHO_BASE_DOMAIN || 'zohoapis.com';
const ZOHO_BASE_DOMAIN = RAW_API.trim().replace(/^https?:\/\/(www\.)?/, '');

// 2) Map API domain → Accounts domain (used ONLY for OAuth token endpoint)
function apiToAccountsHost(apiDomain) {
  // zohoapis.com -> zoho.com, zohoapis.eu -> zoho.eu, zohoapis.in -> zoho.in
  return apiDomain.replace(/^zohoapis\./, 'zoho.');
}

const ACCOUNTS_HOST = apiToAccountsHost(ZOHO_BASE_DOMAIN);

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

  const tokenUrl = `https://accounts.${ACCOUNTS_HOST}/oauth/v2/token`;

  let res;
  try {
    res = await fetch(tokenUrl, { method: 'POST', body: params });
  } catch (e) {
    // Surface the exact network problem the platform is hitting
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
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

module.exports = { getAccessToken, readJson, ZOHO_BASE_DOMAIN, ACCOUNTS_HOST };
