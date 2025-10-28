import { ZOHO_BASE_DOMAIN, ACCOUNTS_HOST, APIS_HOST, INVENTORY_BASE, CRM_BASE } from './_utils.js';

export default async function handler(_req, res) {
  res.status(200).json({
    ZOHO_BASE_DOMAIN,
    ACCOUNTS_HOST,
    APIS_HOST,
    INVENTORY_BASE,
    CRM_BASE,
    HAS_CLIENT_ID:     !!process.env.ZOHO_CLIENT_ID,
    HAS_CLIENT_SECRET: !!process.env.ZOHO_CLIENT_SECRET,
    HAS_REFRESH_TOKEN: !!process.env.ZOHO_REFRESH_TOKEN,
    HAS_ORG_ID:        !!process.env.ZOHO_ORG_ID
  });
}

