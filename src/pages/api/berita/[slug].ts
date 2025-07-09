import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;

    if (!slug || typeof slug !== 'string') {
        return res.status(400).json({ error: 'Slug tidak valid' });
    }

    try {
        const response = await fetch(`http://rfb-backpanel.test/api/berita/${encodeURIComponent(slug)}`);

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Data tidak ditemukan' });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error: any) {
        console.error("Error fetching berita detail:", error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
