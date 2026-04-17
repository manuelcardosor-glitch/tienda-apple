export default async function handler(req, res) {
  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSMJxgVcqPEUg-kQx-uBqvE_pQNX7nTNBw3g5numTxhzDWFkxKDsydn3tIOytfUKVyvc1__tazlIm50/pub?gid=1760700189&single=true&output=csv';
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const text = await response.text();
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.status(200).send(text);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
