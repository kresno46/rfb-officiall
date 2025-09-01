import { useEffect, useState } from "react";
import NewsCard2 from "@/components/moleculs/NewsCard2";
import Header1 from "@/components/moleculs/Header1";

type Berita = {
    id: number;
    image?: string;  
    kategori: string;
    status: string;
    judul: string;
    slug: string;
    isi: string;
    created_at: string;
    updated_at: string;
};

// Tambahkan props showHeader
type PengumumanHomeProps = {
    showHeader?: boolean;
    className?: string;
};

export default function PengumumanHome({ showHeader = true, className }: PengumumanHomeProps) {
    const [pengumumanList, setPengumumanList] = useState<Berita[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchBerita() {
            try {
                const response = await fetch("/api/berita");
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data: Berita[] = await response.json();
                
                // Proses URL gambar
                const processedData = data.map(item => {
                    
                    // Proses URL gambar
                    let imageUrl = item.image;
                    if (imageUrl) {
                        // Dapatkan nama file dari path
                        const fileName = imageUrl.split('/').pop()?.split('?')[0] || '';
                        const baseImagePath = '/img/berita/';
                        
                        // Coba format URL yang mungkin
                        const possiblePaths = [
                            `${baseImagePath}${fileName}`,  // Format: /img/berita/nama-file.jpg
                            imageUrl.startsWith('storage/') ? `${baseImagePath}${imageUrl.replace('storage/', '')}` : null,
                            imageUrl  // Format asli sebagai fallback
                        ].filter(Boolean);

                        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://kpf-backpanel-production.up.railway.app';
                        
                        for (const path of possiblePaths) {
                            if (!path) continue;
                            try {
                                const cleanPath = String(path).trim().replace(/^\/+/, '');
                                const url = new URL(cleanPath, baseUrl);
                                
                                if (url.hostname === new URL(baseUrl).hostname) {
                                    imageUrl = url.toString();
                                    break;
                                }
                            } catch (e) {
                                // Error handling tetap dipertahankan
                            }
                        }
                    }
                    
                    return {
                        ...item,
                        image: imageUrl
                    };
                });
            
                setPengumumanList(processedData);
            } catch (error) {
                console.error("Gagal memuat berita:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBerita();
    }, []);

    return (
        <div className={className}>
            {/* Tampilkan Header jika showHeader true */}
            {showHeader && (
                <Header1 title="Pengumuman" center className="mb-10 uppercase font-bold text-2xl md:text-3xl" />
            )}

            {loading ? (
                <p className="text-center">Memuat...</p>
            ) : pengumumanList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {pengumumanList.map((item) => (
                        <NewsCard2
                            key={item.id}
                            title={item.judul}
                            date={item.created_at}
                            content={item.isi}
                            image={item.image}
                            category={item.kategori}
                            link={`/pengumuman/${item.slug}`}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center">Tidak ada data berita.</p>
            )}
        </div>
    );
}
