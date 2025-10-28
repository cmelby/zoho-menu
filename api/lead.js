// Create a Lead in Zoho CRM (ESM)
import { getAccessToken, readJson, CRM_BASE } from './_utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const token = await getAccessToken();
    const body  = await readJson(req);
    const { email, phone, firstName, lastName, productName, notes } = body || {};

    const lead = {
      Last_Name:   lastName || 'Website Lead',
      First_Name:  firstName || undefined,
      Email:       email || undefined,
      Phone:       phone || undefined,
      Lead_Source: 'Website Menu',
      Description: `Product: ${productName}${notes ? `\nNotes: ${notes}` : ''}`
    };
    if (process.env.ZOHO_FIELD_API_NAME) {
      lead[process.env.ZOHO_FIELD_API_NAME] = productName;
    }

    const url = `${CRM_BASE}/Leads`;
    let crmRes;
    try {
      crmRes = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: [lead], trigger: ['workflow'] })
      });
    } catch (e) {
      return res.status(500).json({ error: `CRM lead fetch failed (${url}) :: ${e?.name || 'Error'} ${e?.code || ''} ${e?.message || e}` });
    }

    const txt = await crmRes.text();
    try { res.status(crmRes.status).json(JSON.parse(txt)); }
    catch { res.status(crmRes.status).send(txt); }
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
}
