// pages/api/deezerProxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query.q; // Extract query parameter from the request

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }
  try {
      const response = await fetch(`https://api.deezer.com/search?q=${query}`);
      const data = await response.json();

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
}

//'https://api.deezer.com/chart/album/albums'