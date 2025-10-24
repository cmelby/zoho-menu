// api/lead.js - creates a Zoho CRM Lead from a product click
// POST JSON body: { email?, phone?, firstName?, lastName?, productName, notes? }

const { getAccessToken, readJson } = require('./_utils');
const {
  ZOHO_BASE_DOMAIN = 'zohoapis.com',
  ZOHO_FIELD_API_NAME = 'Product_Interested_In', // set in Vercel env if different
} = process.env;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  try {
    const token = await getAccessToken();
    const body = await readJson(req);
    const { email, phone, firstName, lastName, productName, notes } = body || {};

    const lead = {
      Last_Name: lastName || 'Website Lead', // Zoho CRM requires Last_Name
      First_Name: firstName || undefined,
      Email: email || undefined,
      Phone: phone || undefined,
      Lead_Source: 'Website Menu',
    };
    // dynamic custom field for product interest
    lead[ZOHO_FIELD_API_NAME] = productName;
    lead.Description = `Product: ${productName}${notes ? `\nNotes: ${notes}` : ''}`;

    const crmRes = await fetch(`https://www.${ZOHO_BASE_DOMAIN}/crm/v2/Leads`, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [lead], trigger: ['workflow'] }),
    });
    const json = await crmRes.json();
    res.status(crmRes.status).json(json);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
