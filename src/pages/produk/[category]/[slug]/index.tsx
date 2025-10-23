import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";

type Product = {
    id: number;
    image: string;
    name: string;
    slug: string;
    deskripsi?: string;
    specs?: string;
    created_at?: string;
    updated_at?: string;
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
    paths: [], // No pre-rendered paths at build time
    fallback: 'blocking',
  };
};

export default function ProductDetail() {
    const { t } = useTranslation('produk');
    const router = useRouter();
    const { category, slug } = router.query;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!category || !slug) return;

        const categoryStr = String(category).toLowerCase();
        let apiUrl = "";

        if (categoryStr === "jfx") {
            apiUrl = "/api/jfx";
        } else if (categoryStr === "spa") {
            apiUrl = "/api/spa";
        } else {
            setProduct(null);
            setLoading(false);
            return;
        }

        async function fetchProduct() {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error(t('errorLoading'));

                const data: Product[] = await response.json();
                const found = data.find(item => item.slug === slug);

                setProduct(found || null);
                setError(null);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError(t('errorLoading'));
                setProduct(null);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [category, slug]);

    if (!category || !slug || loading) {
        return (
            <PageTemplate title={t('loadingProduct')}>
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title={t('loadingProduct')}>
                        <div className="text-center py-20">{t('loadingProduct')}</div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    if (!product || error) {
        return (
            <PageTemplate title={t('productNotFound')}>
                <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                    <ProfilContainer title={t('productNotFound')}>
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('productNotFound')}</h2>
                            <p className="text-gray-600 mb-6">{error || t('noProducts')}</p>
                            <Link
                                href={`/produk/${category}`}
                                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white transition-all duration-300 inline-flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                {t('backToProducts')}
                            </Link>
                        </div>
                    </ProfilContainer>
                </div>
            </PageTemplate>
        );
    }

    const categoryName = String(category).toLowerCase() === 'jfx' ? t('categories.jfx') : t('categories.spa');
    
    return (
        <PageTemplate title={product.name}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={product.name}>
                    <div className="mb-6">
                        <Link 
                            href={`/produk/${category}`}
                            className="text-green-600 hover:text-green-800 inline-flex items-center mb-4"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {t('backToProducts')}
                        </Link>
                    </div>
                    
                    <div>
                        <div className="flex justify-center mb-6">
                            <img
                                src={`https://rfbdev.newsmaker.id/img/produk/${product.image}`}
                                alt={product.name}
                                className="w-full max-h-96 object-contain rounded-lg shadow"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=No+Image+Available';
                                }}
                            />
                        </div>
                        
                        {product.deskripsi && (
                            <div 
                                className="text-gray-700 leading-relaxed mb-8 prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: product.deskripsi }}
                            />
                        )}
                        
                        {product.specs && (
                            <div className="mt-8 border-t pt-6">
                                <h3 className="text-xl font-semibold mb-4">{t('specifications')}</h3>
                                <div 
                                    className="prose max-w-none prose-p:my-2 prose-table:border prose-th:border prose-td:border prose-th:bg-gray-100"
                                    dangerouslySetInnerHTML={{ __html: product.specs }}
                                />
                            </div>
                        )}
                        
                        <div className="mt-8 pt-6 border-t">
                            <Link 
                                href={`/produk/${category}`}
                                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white transition-all duration-300 inline-flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                {t('backToProducts')}
                            </Link>
                        </div>
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
