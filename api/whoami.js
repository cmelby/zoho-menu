// Lightweight health check against Inventory API
import { getAccessToken, INVENTORY_HOST } from './_utils.js';

export default async function handler(_req, res) {
  try {
    const orgId = process.env.ZOHO_ORG_ID;
    if (!orgId) return res.status(500).json({ error: 'Missing ZOHO_ORG_ID env var' });

    const token = await getAccessToken();
    const url = `https://inventory.${INVENTORY_HOST}/api/v1/organizations`;
    const headers = {
      'Authorization': `Zoho-oauthtoken ${token}`,
      'X-com-zoho-inventory-organizationid': orgId,
      'Accept': 'application/json',
      'User-Agent': 'genosismenu/1.0 (vercel-serverless; node20)'
    };

    let r;
    try { r = await fetch(url, { headers }); }
    catch (e) {
      return res.status(500).json({ error: `Org check failed (${url}) :: ${e?.name || 'Error'} ${e?.code || ''} ${e?.message || e}` });
    }

    const text = await r.text();
    try { res.status(r.status).json(JSON.parse(text)); }
    catch { res.status(r.status).send(text); }
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
}