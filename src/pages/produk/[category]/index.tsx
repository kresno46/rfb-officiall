import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import ProductCard from "@/components/moleculs/ProductCard";
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";

type Product = {
    id: number;
    image: string;
    name: string;
    slug: string;
    deskripsi?: string;
    specs?: string;
    category: string;
    created_at?: string;
    updated_at?: string;
};

type ApiResponse = {
    data?: Product[];
    error?: string;
};

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'navbar',
      'footer',
      'produk'
    ])),
  },
});

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { category: 'jfx' } },
      { params: { category: 'spa' } },
    ],
    fallback: true,
  };
};

export default function ProdukByCategory() {
    const { t } = useTranslation('produk');
    const router = useRouter();
    const { category } = router.query;

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!category) return;

        // Normalisasi kategori ke lowercase
        const categoryStr = String(category).toLowerCase();
        console.log('Category from URL:', category, 'Normalized:', categoryStr);
        
        let apiUrl = "";
        let validCategory = true;

        // Tentukan endpoint API berdasarkan kategori
        switch(categoryStr) {
            case 'jfx':
                apiUrl = "/api/jfx";
                break;
            case 'spa':
                apiUrl = "/api/spa";
                break;
            default:
                console.error('Kategori tidak valid:', categoryStr);
                validCategory = false;
        }

        if (!validCategory) {
            setProducts([]);
            setLoading(false);
            setError(`Kategori "${category}" tidak valid`);
            return;
        }

        console.log('Fetching from API:', apiUrl);

        async function fetchProducts() {
            try {
                setLoading(true);
                setError(null);
                
                console.log(`Fetching products from: ${apiUrl}`);
                const response = await fetch(apiUrl);
                
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
                }

                const result: ApiResponse = await response.json();
                console.log('API Response:', result);

                // Handle both direct array response and { data: [...] } format
                const productsData = Array.isArray(result) ? result : (result.data || []);
                
                if (!Array.isArray(productsData)) {
                    throw new Error('Format data tidak valid dari API');
                }

                const formattedData: Product[] = productsData.map((item: any) => ({
                    id: item.id,
                    name: item.name || 'Nama tidak tersedia',
                    slug: item.slug || `product-${item.id}`,
                    image: item.image || '',
                    deskripsi: item.deskripsi,
                    specs: item.specs,
                    category: categoryStr,
                    created_at: item.created_at,
                    updated_at: item.updated_at
                }));

                console.log('Formatted Products:', formattedData);
                setProducts(formattedData);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data');
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [category]);

    // Dapatkan nama kategori untuk ditampilkan
    const getCategoryName = (cat: string | string[] | undefined) => {
        if (!cat) return '';
        const normalized = String(cat).toLowerCase();
        if (normalized === 'jfx') return t('categories.jfx');
        if (normalized === 'spa') return t('categories.spa');
        return '';
    };
    
    const categoryName = getCategoryName(category);
    
    return (
        <PageTemplate title={`${t('title')} ${categoryName}`}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={`${t('title')} ${categoryName}`}>
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
                            <p className="text-gray-600">{t('loading')}</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20">
                            <div className="text-red-500 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Gagal Memuat Data</h3>
                            <p className="text-gray-600 mb-6">{error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                Coba Lagi
                            </button>
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={`${product.id}-${product.slug}`}
                                    title={product.name}
                                    image={product.image ? `https://rfbdev.newsmaker.id/img/produk/${product.image}` : ''}
                                    category={getCategoryName(category)}
                                    slug={product.slug}
                                    description={product.deskripsi}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Produk</h3>
                            <p className="text-gray-600">{t('noProducts')}</p>
                        </div>
                    )}
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
