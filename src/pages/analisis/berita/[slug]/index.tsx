import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PageTemplate from '@/components/templates/PageTemplate';
import ProfilContainer from '@/components/templates/PageContainer/Container';
import NotFound from '@/components/moleculs/NotFound';
import DetailBerita from '@/components/organisms/DetailBerita';

interface Berita {
    id: number;
    judul: string;
    isi: string;
    gambar: string;
    created_at: string;
    slug: string;
    kategori?: string;
}

export default function BeritaDetail() {
    const router = useRouter();
    const { slug } = router.query;
    const [berita, setBerita] = useState<Berita | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchBerita = async () => {
            try {
                const response = await fetch('/api/portalberita');
                if (!response.ok) throw new Error('Gagal mengambil data berita');
                
                const data = await response.json();
                console.log('Data dari API:', data);
                console.log('Mencari berita dengan slug:', slug);
                
                const foundBerita = data.find((item: Berita) => {
                    console.log('Memeriksa item:', item.slug, '==', slug, '=>', item.slug === slug);
                    return item.slug === slug;
                });
                
                console.log('Berita ditemukan:', foundBerita);
                setBerita(foundBerita || null);
            } catch (error) {
                console.error('Error fetching berita:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBerita();
    }, [slug]);

    const formatDate = (inputDate: string) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
        };
        const parsedDate = new Date(inputDate);
        return parsedDate.toLocaleDateString("id-ID", options);
    };

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    if (loading) {
        return (
            <PageTemplate title="Memuat...">
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title="Memuat Berita...">
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-pulse text-gray-500">Memuat berita...</div>
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    if (!berita) {
        return (
            <PageTemplate title="Berita Tidak Ditemukan">
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title="Berita Tidak Ditemukan">
                        <div className='text-center'>
                            <NotFound />
                            <div>
                                <a href="/analisis/berita" className='bg-green-500 hover:bg-green-400 px-2 py-1 rounded text-black transition-all duration-300'>&#129032; Kembali ke Halaman Berita</a>
                            </div>
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    return (
        <PageTemplate title={berita.judul}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={berita.judul}>
                    <DetailBerita
                        date={berita.created_at}
                        title={berita.judul}
                        img={berita.gambar}
                        content={berita.isi}
                        kategori={berita.kategori || "Berita"}
                    />
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
