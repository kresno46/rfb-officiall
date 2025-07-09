import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

export default function ProductDetail() {
    const router = useRouter();
    const { category, slug } = router.query;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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
                if (!response.ok) throw new Error("Gagal memuat data produk");

                const data: Product[] = await response.json();
                const found = data.find(item => item.slug === slug);

                setProduct(found || null);
            } catch (error) {
                console.error("Gagal fetch:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [category, slug]);

    if (!category || !slug || loading) {
        return (
            <PageTemplate title="Memuat...">
                <div className="text-center py-20">Memuat produk...</div>
            </PageTemplate>
        );
    }

    if (!product) {
        return (
            <PageTemplate title="Produk Tidak Ditemukan">
                <div className="text-center py-20">Produk tidak ditemukan.</div>
            </PageTemplate>
        );
    }

    return (
        <PageTemplate title={product.name}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={product.name}>
                    <div>
                        <div className="flex justify-center mb-6">
                            <img
                                src={`http://rfb-backpanel.test/img/produk/${product.image}`}
                                alt={product.name}
                                className="w-full max-h-100 object-cover rounded-lg shadow"
                            />
                        </div>
                        <div
                            className="text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: product.deskripsi || "" }}
                        />
                        {product.specs && (
                            <div className="mt-8 border-t pt-4 text-sm prose max-w-none prose-p:my-2 prose-table:border prose-th:border prose-td:border prose-th:bg-gray-100">
                                <div dangerouslySetInnerHTML={{ __html: product.specs }} />
                            </div>
                        )}
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
