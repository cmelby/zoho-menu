// api/items.js — lists Zoho Inventory items
import { getAccessToken, INVENTORY_HOST } from './_utils.js';

export default async function handler(req, res) {
  try {
    const orgId = process.env.ZOHO_ORG_ID;
    if (!orgId) return res.status(500).json({ error: 'Missing ZOHO_ORG_ID env var' });

    const token = await getAccessToken();
    const url = new URL(`https://inventory.${INVENTORY_HOST}/api/v1/items`);
    url.searchParams.set('organization_id', orgId);
    if (req.query?.page)     url.searchParams.set('page', req.query.page);
    if (req.query?.per_page) url.searchParams.set('per_page', req.query.per_page);

    const apiRes = await fetch(url, { headers: { Authorization: `Zoho-oauthtoken ${token}` } });
    const text = await apiRes.text();

    try {
      const json = JSON.parse(text);
      res.status(apiRes.status).json(json);
    } catch {
      res.status(apiRes.status).send(text);
    }
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
}

