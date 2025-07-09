import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
};

export default function ProdukByCategory() {
    const router = useRouter();
    const { category } = router.query;

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!category) return;

        const categoryStr = String(category).toLowerCase();
        let apiUrl = "";

        if (categoryStr === "jfx") {
            apiUrl = "/api/jfx";
        } else if (categoryStr === "spa") {
            apiUrl = "/api/spa";
        } else {
            setProducts([]);
            setLoading(false);
            return;
        }

        async function fetchProducts() {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error("Gagal memuat data produk");

                const data = await response.json();
                const formattedData: Product[] = data.map((item: any) => ({
                    ...item,
                    category: categoryStr.toUpperCase(),
                }));

                setProducts(formattedData);
            } catch (error) {
                console.error("Error fetching:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [category]);

    const categoryTitle = category ? String(category).toUpperCase() : "";

    return (
        <PageTemplate title={`Produk ${categoryTitle}`}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={`Produk ${categoryTitle}`}>
                    {loading ? (
                        <p className="text-center py-10">Memuat produk...</p>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    title={product.name}
                                    image={`http://rfb-backpanel.test/img/produk/${product.image}`}
                                    category={product.category}
                                    slug={`${product.slug}`}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 mt-10">Tidak ada produk ditemukan.</p>
                    )}
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
