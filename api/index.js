// api/index.js — Vercel serverless function
import fetch from 'node-fetch';

const {
  ZOHO_CLIENT_ID='1000.HJN881BPW05KVJIAN8LSBCON92SFPE',
  ZOHO_CLIENT_SECRET='c186a3e7d1a5a887f00a846eab353a96b59dc312c6',
  ZOHO_REFRESH_TOKEN='1000.48c0298334b0a4170f33d8d76d35140e.f5e72351e4654b95ee2f8a8385e79c7c',
  ZOHO_ORG_ID='901081372',
  ZOHO_BASE_DOMAIN = 'zohoapis.com',
  ZOHO_FIELD_API_NAME = 'Product_Interested_In'
} = process.env;

let cachedAccessToken = null;
let cachedExpiry = 0;

async function getAccessToken() {
  if (cachedAccessToken && Date.now() < cachedExpiry - 60000) return cachedAccessToken;
  const res = await fetch(`https://accounts.${ZOHO_BASE_DOMAIN}/oauth/v2/token`, {
    method: 'POST',
    body: new URLSearchParams({
      refresh_token: ZOHO_REFRESH_TOKEN,
      client_id: ZOHO_CLIENT_ID,
      client_secret: ZOHO_CLIENT_SECRET,
      grant_type: 'refresh_token',
    }),
  });
  const data = await res.json();
  cachedAccessToken = data.access_token;
  cachedExpiry = Date.now() + data.expires_in * 1000;
  return cachedAccessToken;
}

export default async function handler(req, res) {
  try {
    const token = await getAccessToken();

    if (req.method === 'GET' && req.query.action === 'items') {
      const apiRes = await fetch(
        `https://inventory.${ZOHO_BASE_DOMAIN}/api/v1/items?organization_id=${ZOHO_ORG_ID}`,
        { headers: { Authorization: `Zoho-oauthtoken ${token}` } }
      );
      const json = await apiRes.json();
      return res.status(apiRes.status).json(json);
    }

    if (req.method === 'POST' && req.query.action === 'lead') {
      const { email, phone, firstName, lastName, productName, notes } = await req.json?.() || req.body;
      const lead = {
        Last_Name: lastName || 'Website Lead',
        First_Name: firstName,
        Email: email,
        Phone: phone,
        Lead_Source: 'Website Menu',
        [ZOHO_FIELD_API_NAME]: productName,
        Description: `Product: ${productName}${notes ? `\\nNotes: ${notes}` : ''}`,
      };
      const crmRes = await fetch(`https://www.${ZOHO_BASE_DOMAIN}/crm/v2/Leads`, {
        method: 'POST',
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: [lead], trigger: ['workflow'] }),
      });
      const json = await crmRes.json();
      return res.status(crmRes.status).json(json);
    }

    res.status(404).json({ error: 'Invalid route' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

