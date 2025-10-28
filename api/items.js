// api/items.js — lists Zoho Inventory items with org header + robust errors
import { getAccessToken, INVENTORY_HOST } from './_utils.js';

export default async function handler(req, res) {
  try {
    const orgId = process.env.ZOHO_ORG_ID;
    if (!orgId) return res.status(500).json({ error: 'Missing ZOHO_ORG_ID env var' });

    const token = await getAccessToken();

    const page     = req.query?.page     ?? '1';
    const per_page = req.query?.per_page ?? '200';

    // Use a *string* URL (not URL object) + include only simple query
    const url = `https://inventory.${INVENTORY_HOST}/api/v1/items?page=${encodeURIComponent(page)}&per_page=${encodeURIComponent(per_page)}`;

    // Prefer the org header for zohoapis calls
    const headers = {
      'Authorization': `Zoho-oauthtoken ${token}`,
      'X-com-zoho-inventory-organizationid': orgId,
      'Accept': 'application/json'
    };

    let apiRes;
    try {
      apiRes = await fetch(url, { headers });
    } catch (e) {
      return res.status(500).json({ error: `Inventory fetch failed (${url}) :: ${e?.message || e}` });
    }

    const txt = await apiRes.text();
    try {
      const json = JSON.parse(txt);
      return res.status(apiRes.status).json(json);
    } catch {
      // If Zoho returned HTML/text, pass it through so we can read the reason
      return res.status(apiRes.status).send(txt);
    }
  } catch (err) {
    return res.status(500).json({ error: String(err.message || err) });
  }
}
