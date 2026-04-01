// api/submissions.js
// Vercel Serverless Function — fetches JotForm submission counts
// Requires JOTFORM_API_KEY environment variable to be set in Vercel project settings.

const FORMS = [
  { id: '260737827140862', label: 'Pledge Form' },
  { id: '260737955450868', label: 'Feedback Form' },
  { id: '260871636009055', label: 'Contact Form' },
];

export default async function handler(req, res) {
  // Allow CORS from same origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

  const apiKey = process.env.JOTFORM_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'JOTFORM_API_KEY not configured.' });
  }

  try {
    const results = await Promise.all(
      FORMS.map(async (form) => {
        const url = `https://api.jotform.com/form/${form.id}?apiKey=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
          return { id: form.id, label: form.label, count: null, error: 'API error' };
        }

        const data = await response.json();
        // JotForm API returns count in data.content.count
        const count = data?.content?.count ?? null;

        return { id: form.id, label: form.label, count };
      })
    );

    return res.status(200).json({ forms: results });
  } catch (err) {
    console.error('Submissions API error:', err);
    return res.status(500).json({ error: 'Failed to fetch submission counts.' });
  }
}
