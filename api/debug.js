const { ZOHO_BASE_DOMAIN, ACCOUNTS_HOST } = require('./_utils');

module.exports = async (_req, res) => {
  res.status(200).json({
    ZOHO_BASE_DOMAIN,
    ACCOUNTS_HOST,
    HAS_CLIENT_ID: !!process.env.ZOHO_CLIENT_ID,
    HAS_CLIENT_SECRET: !!process.env.ZOHO_CLIENT_SECRET,
    HAS_REFRESH_TOKEN: !!process.env.ZOHO_REFRESH_TOKEN,
    HAS_ORG_ID: !!process.env.ZOHO_ORG_ID,
    token_url: `https://accounts.${ACCOUNTS_HOST}/oauth/v2/token`,
    items_base: `https://inventory.${ZOHO_BASE_DOMAIN}/api/v1/items`
  });
};

