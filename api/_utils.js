// api/_utils.js - shared helpers for Zoho OAuth + JSON parsing

const {
  ZOHO_CLIENT_ID='1000.HJN881BPW05KVJIAN8LSBCON92SFPE',
  ZOHO_CLIENT_SECRET='c186a3e7d1a5a887f00a846eab353a96b59dc312c6',
  ZOHO_REFRESH_TOKEN='1000.48c0298334b0a4170f33d8d76d35140e.f5e72351e4654b95ee2f8a8385e79c7c',
  ZOHO_BASE_DOMAIN = 'zohoapis.com',
} = process.env;

let cachedAccessToken = null;
let cachedExpiry = 0;

async function getAccessToken() {
  const now = Date.now();
  if (cachedAccessToken && now < cachedExpiry - 60_000) {
    return cachedAccessToken;
  }
  const params = new URLSearchParams({
    refresh_token: ZOHO_REFRESH_TOKEN,
    client_id: ZOHO_CLIENT_ID,
    client_secret: ZOHO_CLIENT_SECRET,
    grant_type: 'refresh_token',
  });
  const res = await fetch(`https://accounts.${ZOHO_BASE_DOMAIN}/oauth/v2/token`, {
    method: 'POST',
    body: params,
  });
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
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

module.exports = { getAccessToken, readJson };
