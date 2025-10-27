const { getAccessToken, readJson, ZOHO_BASE_DOMAIN } = require('./_utils');
const { ZOHO_FIELD_API_NAME = 'Product_Interested_In' } = process.env;

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const token = await getAccessToken();
    const { email, phone, firstName, lastName, productName, notes } = await readJson(req);

    const lead = {
      Last_Name: lastName || 'Website Lead',
      First_Name: firstName || undefined,
      Email: email || undefined,
      Phone: phone || undefined,
      Lead_Source: 'Website Menu'
    };
    lead[ZOHO_FIELD_API_NAME] = productName;
    lead.Description = `Product: ${productName}${notes ? `\nNotes: ${notes}` : ''}`;

    const url = `https://www.${ZOHO_BASE_DOMAIN}/crm/v2/Leads`;

    let crmRes;
    try {
      crmRes = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Zoho-oauthtoken ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [lead], trigger: ['workflow'] })
      });
    } catch (e) {
      return res.status(500).json({ error: `CRM lead fetch failed (${url}) :: ${e?.message || e}` });
    }

    const txt = await crmRes.text();
    try { return res.status(crmRes.status).json(JSON.parse(txt)); }
    catch { return res.status(crmRes.status).send(txt); }
  } catch (err) {
    return res.status(500).json({ error: String(err.message || err) });
  }
};

