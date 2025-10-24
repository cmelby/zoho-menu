// api/items.js - returns Zoho Inventory items
// Query params supported: ?page=1&per_page=200

const { getAccessToken } = require('./_utils');
const { ZOHO_ORG_ID, ZOHO_BASE_DOMAIN = 'zohoapis.com' } = process.env;

module.exports = async (req, res) => {
  try {
    const token = await getAccessToken();
    const url = new URL(`https://inventory.${ZOHO_BASE_DOMAIN}/api/v1/items`);
    url.searchParams.set('organization_id', ZOHO_ORG_ID);
    if (req.query && req.query.page) url.searchParams.set('page', req.query.page);
    if (req.query && req.query.per_page) url.searchParams.set('per_page', req.query.per_page);

    const apiRes = await fetch(url, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });
    const json = await apiRes.json();
    res.status(apiRes.status).json(json);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
