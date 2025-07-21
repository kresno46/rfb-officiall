import type { NextApiRequest, NextApiResponse } from 'next';

type MarketData = {
  symbol: string;
  last: number;
  percentChange: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(
      "https://www.newsmaker.id/quotes/live?s=LGD+LSI+GHSIK5+SN1M5+LCOPN5+DJIA+DAX+DX+AUDUSD+EURUSD+GBPUSD+CHF+JPY+RP"
    );
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch market data' });
    }
    
    const data: MarketData[] = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching market data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
