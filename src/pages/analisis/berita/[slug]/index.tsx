import { useRouter } from 'next/router';
import beritaList from '@/data/BeritaList';
import PageTemplate from '@/components/templates/PageTemplate';
import ProfilContainer from '@/components/templates/PageContainer/Container';
import NotFound from '@/components/moleculs/NotFound';
import DetailBerita from '@/components/organisms/DetailBerita';

export default function BeritaDetail() {
    const router = useRouter();
    const { slug } = router.query;

    const berita = beritaList.find(item => item.slug === slug);

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

    if (!berita) {
        return (
            <PageTemplate title="Berita Tidak Ditemukan">
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title="Berita Tidak Ditemukan">
                        <div className='text-center'>
                            <NotFound />
                            <div>
                                <a href="/analisis/berita" className='bg-green-500 hover:bg-green-400 px-2 py-1 rounded text-black transition-all duration-300'>&#129032; Halaman Berita</a>
                            </div>
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    return (
        <PageTemplate title={berita.title}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={berita.title}>
                    <DetailBerita
                        date={berita.date}
                        title={berita.title}
                        img={berita.img}
                        content={berita.content}
                    />
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
