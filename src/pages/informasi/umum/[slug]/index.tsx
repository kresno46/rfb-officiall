import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PageTemplate from '@/components/templates/PageTemplate';
import ProfilContainer from '@/components/templates/PageContainer/Container';
import NotFound from '@/components/moleculs/NotFound';
import DetailBerita from '@/components/organisms/DetailBerita';

type Berita = {
    id: number;
    image: string;
    kategori: string;
    status: string;
    judul: string;
    slug: string;
    isi: string;
    created_at: string;
    updated_at: string;
};

export default function BeritaDetail() {
    const router = useRouter();
    const { slug } = router.query;

    const [berita, setBerita] = useState<Berita | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!router.isReady || !slug) return;

        async function fetchBerita() {
            try {
                const response = await fetch(`/api/berita/${slug}`);
                if (!response.ok) throw new Error('Data tidak ditemukan');

                const data: Berita = await response.json();
                setBerita(data);
            } catch (error) {
                console.error('Gagal memuat berita:', error);
                setBerita(null);
            } finally {
                setLoading(false);
            }
        }

        fetchBerita();
    }, [router.isReady, slug]);

    const formatDate = (inputDate: string) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        };
        const parsedDate = new Date(inputDate);
        return parsedDate.toLocaleDateString('id-ID', options);
    };

    if (loading) {
        return (
            <PageTemplate title="Memuat...">
                <div className="text-center py-20">Memuat data berita...</div>
            </PageTemplate>
        );
    }

    if (!berita) {
        return (
            <PageTemplate title="Berita Tidak Ditemukan">
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title="Berita Tidak Ditemukan">
                        <div className="text-center">
                            <NotFound />
                            <div>
                                <a
                                    href="/analisis/berita"
                                    className="bg-green-500 hover:bg-green-400 px-2 py-1 rounded text-black transition-all duration-300"
                                >
                                    &#129032; Halaman Berita
                                </a>
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
                        date={formatDate(berita.created_at)}
                        title={berita.judul}
                        img={`http://rfb-backpanel.test/img/berita/${berita.image}`}
                        kategori={berita.kategori}
                        content={berita.isi}
                    />
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
