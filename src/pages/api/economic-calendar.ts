import { NextApiRequest, NextApiResponse } from 'next';

interface CalendarEvent {
  id: number;
  title: string;
  time: string;
  country: string;
  impact: 'High' | 'Medium' | 'Low';
  figures: string;
  previous: string;
  forecast: string;
  actual: string;
  created_at: string;
  updated_at: string;
}

interface CalendarResponse {
  status: string;
  data: CalendarEvent[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://portalnews.newsmaker.id/api/v1/kalender-ekonomi', {
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer RFB-115886a7f25067f3'
      },
      cache: 'no-store' as RequestCache
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data: CalendarResponse = await response.json();
    
    if (data.status !== 'success' || !Array.isArray(data.data)) {
      throw new Error('Invalid API response format');
    }
    
    // Format data to match the frontend structure
    const formattedData = data.data.map(event => ({
      time: event.time,
      country: event.country,
      impact: event.impact,
      figures: event.figures,
      previous: event.previous,
      forecast: event.forecast,
      actual: event.actual
    }));
    
    res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error fetching economic calendar:', error);
    res.status(500).json({ 
      error: 'Failed to fetch economic calendar data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
