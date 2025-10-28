// api/whoami.js — confirms OAuth + org reachability with a minimal call
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
      'Accept': 'application/json'
    };

    let r;
    try {
      r = await fetch(url, { headers });
    } catch (e) {
      return res.status(500).json({ error: `Org check failed (${url}) :: ${e?.message || e}` });
    }

    const text = await r.text();
    try {
      const json = JSON.parse(text);
      // Return a trimmed payload so we don't leak full org data
      return res.status(r.status).json({
        status: r.status,
        org_header_used: true,
        sample: Array.isArray(json?.organizations)
          ? json.organizations.slice(0, 1)
          : json
      });
    } catch {
      return res.status(r.status).send(text);
    }
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
}