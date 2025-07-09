import { useEffect, useState } from "react";
import ProductCard from "@/components/moleculs/ProductCard";
import Header1 from "@/components/moleculs/Header1";

type Product = {
    id: number;
    image: string;
    name: string;
    slug: string;
    deskripsi?: string;
    specs?: string;
    category: string;  // Tambahan untuk membedakan jenis produk
};

export default function ProdukContainer() {
    const [productList, setProductList] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const [jfxRes, spaRes] = await Promise.all([
                    fetch("/api/jfx"),
                    fetch("/api/spa"),
                ]);

                if (!jfxRes.ok || !spaRes.ok) throw new Error("Gagal memuat data produk");

                const jfxData = await jfxRes.json();
                const spaData = await spaRes.json();

                const jfxProducts: Product[] = jfxData.map((item: any) => ({
                    ...item,
                    category: "JFX",
                }));

                const spaProducts: Product[] = spaData.map((item: any) => ({
                    ...item,
                    category: "SPA",
                }));

                setProductList([...jfxProducts, ...spaProducts]);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div className="mx-auto px-4">
            <Header1 title="Produk Kami" center className="mb-6 text-2xl md:text-3xl" />

            {loading ? (
                <p className="text-center py-10">Memuat produk...</p>
            ) : productList.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {productList.map((product) => (
                        <ProductCard
                            key={`${product.category}-${product.id}`}
                            title={product.name}
                            image={`http://rfb-backpanel.test/img/produk/${product.image}`}
                            category={product.category}
                            slug={`${product.slug}`}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center py-10">Tidak ada produk tersedia.</p>
            )}
        </div>
    );
}
