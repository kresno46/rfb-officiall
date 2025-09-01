import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch('https://portalnews.newsmaker.id/api/berita');
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('Data mentah dari API:', JSON.stringify(data, null, 2));
        
        // Format data sesuai dengan yang dibutuhkan komponen
        const formattedData = data.data.map((item: any) => {
            // Hapus awalan 'uploads/' jika sudah ada di path gambar
            const cleanImagePath = item.images?.[0]?.replace(/^uploads\//, '') || '';
            const imageUrl = cleanImagePath ? `https://portalnews.newsmaker.id/uploads/${cleanImagePath}` : null;
            console.log(`Item ID ${item.id}:`, {
                judul: item.title,
                imagePath: item.images?.[0],
                fullImageUrl: imageUrl,
                hasImages: !!item.images?.length
            });
            
            return {
                id: item.id,
                judul: item.title,
                isi: item.content,
                slug: item.slug,
                gambar: imageUrl,
                created_at: item.created_at,
                kategori: item.kategori?.name || 'Umum'
            };
        });
        
        res.status(200).json(formattedData);
    } catch (error) {
        console.error('Error fetching berita:', error);
        res.status(500).json({ error: 'Gagal mengambil data berita' });
    }
}
