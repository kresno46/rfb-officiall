import { useEffect, useState } from 'react';
import NewsCard from "@/components/moleculs/Newscard";
import Header2 from "@/components/moleculs/Header2";

interface Berita {
    id: number;
    judul: string;
    isi: string;
    gambar: string;
    created_at: string;
    slug: string;
}

interface BeritaSectionProps {
    limit?: number;
    showHeader?: boolean;
    className?: string;
}

export default function BeritaSection({ className, limit, showHeader = true }: BeritaSectionProps) {
    const [berita, setBerita] = useState<Berita[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Mengambil data dari API...');
                const response = await fetch('/api/portalberita');
                if (!response.ok) {
                    throw new Error('Gagal mengambil data berita');
                }
                const data = await response.json();
                console.log('Data berhasil diambil, total:', data.length);
                
                // Log detail setiap item
                data.forEach((item: any, index: number) => {
                    console.log(`Item ${index + 1}:`, {
                        id: item.id,
                        judul: item.judul,
                        gambar: item.gambar,
                        hasImage: !!item.gambar,
                        imageUrl: item.gambar ? new URL(item.gambar).toString() : 'Tidak ada gambar'
                    });
                });
                
                setBerita(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Error fetching berita:', err);
                setError('Gagal memuat data berita. Silakan coba lagi nanti.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const data = limit ? berita.slice(0, limit) : berita;

    return (
        <div className={`${className}`}>
            {showHeader && <Header2 title="Berita Terbaru" />}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <p>Memuat berita...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : berita.length > 0 ? (
                    data.map((item) => (
                        <div key={item.id} onClick={(e) => e.stopPropagation()}>
                            <NewsCard
                                title={item.judul}
                                date={new Date(item.created_at).toLocaleDateString()}
                                content={item.isi}
                                slug={item.slug}
                                image={item.gambar}
                            />
                        </div>
                    ))
                ) : (
                    <p>Tidak ada berita tersedia</p>
                )}
            </div>
        </div>
    );
}
