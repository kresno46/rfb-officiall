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

interface ApiResponse {
  status: string;
  updatedAt: string;
  total: number;
  data: Array<{
    symbol: string;
    last: number;
    high: number;
    low: number;
    open: number;
    prevClose: number;
    valueChange: number;
    percentChange: number;
  }>;
  source: string;
  nonce: number;
  symbols: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("https://endpoapi-production-3202.up.railway.app/api/quotes");
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Gagal mengambil data market' });
    }
    
    const data: ApiResponse = await response.json();
    
    if (data.status !== 'success' || !Array.isArray(data.data)) {
      throw new Error('Format respons tidak valid');
    }
    
    // Map data ke format yang diharapkan oleh komponen
    const formattedData: MarketData[] = data.data.map(item => ({
      symbol: item.symbol,
      last: item.last,
      percentChange: item.percentChange,
      high: item.high,
      low: item.low,
      open: item.open,
      prevClose: item.prevClose,
      valueChange: item.valueChange
    }));
    
    return res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching market data:", error);
    res.status(500).json({ 
      error: "Failed to fetch data",
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
