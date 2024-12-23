// pages/api/deezerProxy.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const albumId = req.query.q; // Extract query parameter from the request

  if (!albumId || albumId === "0") {
    return res.status(400).json({ error: "albumId is required" });
  }
  try {
    const response = await fetch(
      `https://api.deezer.com/album/${albumId}/tracks`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
