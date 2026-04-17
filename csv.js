export default async function handler(request) {
  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSMJxgVcqPEUg-kQx-uBqvE_pQNX7nTNBw3g5numTxhzDWFkxKDsydn3tIOytfUKVyvc1__tazlIm50/pub?gid=1760700189&single=true&output=csv';

  try {
    const res = await fetch(CSV_URL);
    if (!res.ok) throw new Error('Upstream HTTP ' + res.status);
    const text = await res.text();
    return new Response(text, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const config = {
  runtime: 'edge',
};
