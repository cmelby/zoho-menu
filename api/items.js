// api/items.js — returns Zoho Inventory items (supports ?page=&per_page=)
const { getAccessToken, ZOHO_BASE_DOMAIN } = require('./_utils');
const { ZOHO_ORG_ID } = process.env;

module.exports = async (req, res) => {
  try {
    if (!ZOHO_ORG_ID) {
      return res.status(500).json({ error: 'Missing ZOHO_ORG_ID env var' });
    }

    const token = await getAccessToken();

    const url = new URL(`https://inventory.${ZOHO_BASE_DOMAIN}/api/v1/items`);
    url.searchParams.set('organization_id', ZOHO_ORG_ID);
    if (req.query && req.query.page) url.searchParams.set('page', req.query.page);
    if (req.query && req.query.per_page) url.searchParams.set('per_page', req.query.per_page);

    let apiRes;
    try {
      apiRes = await fetch(url, { headers: { Authorization: `Zoho-oauthtoken ${token}` } });
    } catch (e) {
      return res.status(500).json({ error: `Inventory fetch failed (${url}) :: ${e?.message || e}` });
    }

    const txt = await apiRes.text();
    try {
      const json = JSON.parse(txt);
      return res.status(apiRes.status).json(json);
    } catch {
      return res.status(apiRes.status).send(txt);
    }
  } catch (err) {
    return res.status(500).json({ error: String(err.message || err) });
  }
};
