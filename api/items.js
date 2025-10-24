// api/items.js - returns Zoho Inventory items
// Query params supported: ?page=1&per_page=200

// api/items.js
const { getAccessToken, ZOHO_BASE_DOMAIN } = require('./_utils');
const { ZOHO_ORG_ID } = process.env;

module.exports = async (req, res) => {
  try {
    const token = await getAccessToken();

    if (!ZOHO_ORG_ID) {
      return res.status(500).json({ error: 'Missing ZOHO_ORG_ID env var' });
    }

    const url = new URL(`https://inventory.${ZOHO_BASE_DOMAIN}/api/v1/items`);
    url.searchParams.set('organization_id', ZOHO_ORG_ID);
    if (req.query && req.query.page) url.searchParams.set('page', req.query.page);
    if (req.query && req.query.per_page) url.searchParams.set('per_page', req.query.per_page);

    const apiRes = await fetch(url, { headers: { Authorization: `Zoho-oauthtoken ${token}` } });
    const text = await apiRes.text();
    // Try JSON parse, but return raw on error so you can read it in the browser.
    try {
      const json = JSON.parse(text);
      return res.status(apiRes.status).json(json);
    } catch {
      return res.status(apiRes.status).send(text);
    }
  } catch (err) {
    return res.status(500).json({ error: String(err.message || err) });
  }
};
