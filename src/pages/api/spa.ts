// pages/api/jfx.ts

import type { NextApiRequest, NextApiResponse } from 'next';

type Spa = {
    id: number;
    image: string;
    name: string;
    slug: string;
    deskripsi: string;
    specs: string;
    created_at: string;
    updated_at: string;
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch("http://rfb-backpanel.test/api/spa");
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch SPA Product' });
        }

        const data: Spa[] = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching berita:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

