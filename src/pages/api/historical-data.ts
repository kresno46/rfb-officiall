import { NextApiRequest, NextApiResponse } from 'next';

interface HistoricalDataItem {
  id: number;
  symbol: string;
  date: string;
  event: string | null;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  change: string | null;
  volume: number | null;
  openInterest: number | null;
  createdAt: string;
  updatedAt: string;
}

interface SymbolData {
  symbol: string;
  data: HistoricalDataItem[];
  updatedAt: string;
}

interface ApiResponse {
  status: string;
  data: SymbolData[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Ambil data dari API eksternal
    const response = await fetch('https://endpoapi-production-3202.up.railway.app/api/historical');
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Kembalikan data dalam format yang diharapkan
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Error in historical-data API:', error);
    return res.status(500).json({ 
      status: 'error',
      message: 'Gagal mengambil data historis',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
