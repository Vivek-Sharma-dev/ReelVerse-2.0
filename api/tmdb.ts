import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. get endpoint and other params related
  const { endpoint, ...restParams } = req.query;

  if (!endpoint) {
    return res.status(400).json({ error: 'Endpoint parameter is required' });
  }

  // 3. get secure TMDB key from vercel deskboard
  const apiKey = process.env.VITE_TMDB_API_KEY; 

  // 4. make TMDB String
  const queryString = new URLSearchParams({
    ...restParams as Record<string, string>,
    api_key: apiKey || ''
  }).toString();

  const url = `https://api.themoviedb.org/3/${endpoint}?${queryString}`;

  try {
    const response = await fetch(url, { method: 'GET' });
    
    if (!response.ok) {
      return res.status(response.status).json({ error: `TMDB responded with status ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch data from TMDB proxy server' });
  }
}