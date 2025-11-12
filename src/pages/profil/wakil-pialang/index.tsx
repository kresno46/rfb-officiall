import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CardCategoryPialang from "@/components/atoms/CardCategoryPialang";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import { getKategoriWakilPialang, KategoriWakilPialang } from '@/services/wakilPialangService';

export const getStaticProps = async ({ locale = 'id' }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'navbar',
      'footer',
      'wakil-pialang'
    ])),
  },
});

interface WakilPialangProps {
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

export default function WakilPialang() {
    const { t } = useTranslation(['wakil-pialang']);
    const [kategoriList, setKategoriList] = useState<KategoriWakilPialang[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    
    // We'll use the API data directly for category names

    useEffect(() => {
        const fetchKategori = async () => {
            try {
                const data = await getKategoriWakilPialang();
                setKategoriList(data);
            } catch (err) {
                setError('Gagal memuat data kategori wakil pialang');
                console.error('Error fetching kategori wakil pialang:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchKategori();
    }, []);

    const handleKategoriClick = (slug: string) => {
        router.push(`/profil/wakil-pialang/${slug}`);
    };

    if (isLoading) {
        return (
            <PageTemplate title={t('listTitle')}>
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title={t('listTitle')}>
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    if (error) {
        return (
            <PageTemplate title={t('listTitle')}>
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title={t('listTitle')}>
                        <div className="text-center py-10 text-red-500">
                            {error}
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    // If translations are not loaded yet, show loading state
    if (isLoading) {
        return (
            <PageTemplate title={t('listTitle')}>
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title={t('listTitle')}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {Array(6).fill(0).map((_, index) => (
                                <div key={index} className="animate-pulse h-40 bg-gray-200 rounded-lg"></div>
                            ))}
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    // If there's an error, show error message
    if (error) {
        return (
            <PageTemplate title={t('listTitle')}>
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title={t('listTitle')}>
                        <div className="text-center py-10">
                            <p className="text-red-500">{error}</p>
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    // Use the API data directly for category names
    const enhancedCategories = kategoriList;

    return (
        <PageTemplate title={t('listTitle')}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={t('listTitle')}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {enhancedCategories.map((kategori) => (
                            <CardCategoryPialang 
                                key={`kategori-${kategori.id}`}
                                title={kategori.nama_kategori}
                                slug={kategori.slug}
                            />
                        ))}
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
