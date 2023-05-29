import type { NextApiRequest, NextApiResponse } from "next";
import UrlShortener from "../../UrlShortener";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed - POST required" });
  }

  const urlShortener = new UrlShortener();

  const originalUrl = req.body.url;

  const shortUrl = await urlShortener.shortenUrl(originalUrl);

  if (!shortUrl) {
    return res.status(424).json({ error: "Short url not created" });
  }

  return res.status(201).json(shortUrl);
}
