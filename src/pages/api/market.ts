import type { NextApiRequest, NextApiResponse } from 'next';

type MarketData = {
  symbol: string;
  last: number;
  percentChange: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
  valueChange: number;
};

type ApiResponse = {
  status: string;
  data: MarketData[];
  // other fields...
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(
      "https://endpoapi-production-3202.up.railway.app/api/quotes"
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Gagal mengambil data market' });
    }

    const apiResponse: ApiResponse = await response.json();

    if (apiResponse.status !== 'success' || !apiResponse.data) {
      return res.status(500).json({ error: 'Invalid API response' });
    }

    return res.status(200).json(apiResponse.data);
  } catch (error) {
    console.error("Error fetching market data:", error);
    res.status(500).json({
      error: "Failed to fetch data",
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
