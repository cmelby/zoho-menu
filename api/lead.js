// api/lead.js — creates a Zoho CRM Lead
const { getAccessToken, readJson, ZOHO_BASE_DOMAIN } = require('./_utils');
const { ZOHO_FIELD_API_NAME = 'Product_Interested_In' } = process.env;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const token = await getAccessToken();
    const body = await readJson(req);
    const { email, phone, firstName, lastName, productName, notes } = body || {};

    const lead = {
      Last_Name: lastName || 'Website Lead',
      First_Name: firstName || undefined,
      Email: email || undefined,
      Phone: phone || undefined,
      Lead_Source: 'Website Menu',
    };
    lead[ZOHO_FIELD_API_NAME] = productName;
    lead.Description = `Product: ${productName}${notes ? `\nNotes: ${notes}` : ''}`;

    const url = `https://www.${ZOHO_BASE_DOMAIN}/crm/v2/Leads`;
    const crmRes = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [lead], trigger: ['workflow'] }),
    });

    const txt = await crmRes.text();
    try {
      const json = JSON.parse(txt);
      return res.status(crmRes.status).json(json);
    } catch {
      return res.status(crmRes.status).send(txt);
    }
  } catch (err) {
    return res.status(500).json({ error: String(err.message || err) });
  }
};
