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

                const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://rfbdev.newsmaker.id").replace(/\/$/, "");

                // Mapping dan bentuk URL gambar dengan benar
                const processedData = data.map((item) => {
                    let imageUrl: string | undefined = undefined;

                    if (item.image) {
                        // Contoh hasil akhir yang diinginkan:
                        // https://rfbdev.newsmaker.id/img/berita/2025-07-07-xxx.jpg
                        imageUrl = `${baseUrl}/img/berita/${item.image}`;
                    }

                    return {
                        ...item,
                        image: imageUrl,
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
                            link={`/informasi/umum/${item.slug}`}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center">Tidak ada data berita.</p>
            )}
        </div>
    );
}
