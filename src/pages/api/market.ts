import type { NextApiRequest, NextApiResponse } from 'next';

type MarketData = {
  symbol: string;
  last: number;
  percentChange: number;
};

function cleanJsonResponse(text: string): string {
  // Hapus karakter kontrol yang tidak valid
  let cleaned = text.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
  
  // Perbaiki masalah koma di antara objek
  // 1. Hapus koma berurutan (,,)
  cleaned = cleaned.replace(/,,+/g, ',');
  // 2. Perbaiki pola }\s*{ menjadi },{
  cleaned = cleaned.replace(/}\s*{/g, '},{');
  // 3. Pastikan ada koma di antara objek-objek
  cleaned = cleaned.replace(/}\s*([^,}\]]|$)/g, '},$1');
  // 4. Hapus koma di akhir array/object
  cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
  
  return cleaned;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(
      "https://www.newsmaker.id/quotes/live?s=LGD+LSI+GHSIK5+SN1M5+LCOPN5+DJIA+DAX+DX+AUDUSD+EURUSD+GBPUSD+CHF+JPY+RP"
    );
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch market data' });
    }
    
    const text = await response.text();
    const cleanedText = cleanJsonResponse(text);
    
    try {
      const data: MarketData[] = JSON.parse(cleanedText);
      return res.status(200).json(data);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      console.error("Original response:", text);
      console.error("Cleaned response:", cleanedText);
      throw new Error("Failed to parse market data");
    }
  } catch (error) {
    console.error("Error fetching market data:", error);
    res.status(500).json({ 
      error: "Failed to fetch data",
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
