// api/items.js — fetch Inventory items
const { getAccessToken, INVENTORY_HOST } = require('./_utils');
const { ZOHO_ORG_ID } = process.env;

module.exports = async (req, res) => {
  try {
    if (!ZOHO_ORG_ID) return res.status(500).json({ error: 'Missing ZOHO_ORG_ID env var' });

    const token = await getAccessToken();

    // ✅ Inventory lives on inventory.<zoho(.com|.eu|.in)>
    const url = new URL(`https://inventory.${INVENTORY_HOST}/api/v1/items`);
    url.searchParams.set('organization_id', ZOHO_ORG_ID);
    if (req.query?.page) url.searchParams.set('page', req.query.page);
    if (req.query?.per_page) url.searchParams.set('per_page', req.query.per_page);

    let apiRes;
    try {
      apiRes = await fetch(url, { headers: { Authorization: `Zoho-oauthtoken ${token}` } });
    } catch (e) {
      return res.status(500).json({ error: `Inventory fetch failed (${url}) :: ${e?.message || e}` });
    }

    const txt = await apiRes.text();
    try { return res.status(apiRes.status).json(JSON.parse(txt)); }
    catch { return res.status(apiRes.status).send(txt); }
  } catch (err) {
    return res.status(500).json({ error: String(err.message || err) });
  }
};
