import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CardCategoryPialang from "@/components/atoms/CardCategoryPialang";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import { getKategoriWakilPialang, KategoriWakilPialang } from '@/services/wakilPialangService';

export default function WakilPialang() {
    const [kategoriList, setKategoriList] = useState<KategoriWakilPialang[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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
            <PageTemplate title="Wakil Pialang">
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title="Wakil Pialang">
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
            <PageTemplate title="Wakil Pialang">
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title="Wakil Pialang">
                        <div className="text-center py-10 text-red-500">
                            {error}
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    return (
        <PageTemplate title="Wakil Pialang">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Wakil Pialang">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {kategoriList.map((kategori) => (
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
