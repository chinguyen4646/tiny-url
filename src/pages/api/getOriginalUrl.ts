import type { NextApiRequest, NextApiResponse } from "next";
import UrlShortener from "../../UrlShortener";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed - GET required" });
  }

  const urlShortener = new UrlShortener();

  const code = req.query.code as string;
  
  const originalUrl = await urlShortener.getOriginalUrl(code);

  if (!originalUrl) {
    return res.status(404).json({ error: "URL not found" });
  }

  return res.status(200).json(originalUrl);
}
