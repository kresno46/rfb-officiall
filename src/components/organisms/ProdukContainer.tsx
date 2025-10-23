import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import ProductCard from "@/components/moleculs/ProductCard";
import Header1 from "@/components/moleculs/Header1";

type Product = {
    id: number;
    image: string;
    name: string;
    slug: string;
    deskripsi?: string;
    specs?: string;
    category: string;
};

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "https://rfbdev.newsmaker.id/";

export default function ProdukContainer() {
    const { t } = useTranslation('produk');
    const [productList, setProductList] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const [jfxRes, spaRes] = await Promise.all([
                    fetch("/api/jfx"),
                    fetch("/api/spa"),
                ]);

                if (!jfxRes.ok) throw new Error(`JFX error: ${jfxRes.status}`);
                if (!spaRes.ok) throw new Error(`SPA error: ${spaRes.status}`);

                const jfxData = await jfxRes.json();
                const spaData = await spaRes.json();

                const jfxProducts: Product[] = Array.isArray(jfxData)
                    ? jfxData.map((item: any) => ({
                        ...item,
                        category: "JFX",
                    }))
                    : [];

                const spaProducts: Product[] = Array.isArray(spaData)
                    ? spaData.map((item: any) => ({
                        ...item,
                        category: "SPA",
                    }))
                    : [];

                setProductList([...jfxProducts, ...spaProducts]);
            } catch (error) {
                console.error("Gagal memuat produk:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div className="mx-auto px-4">
            <Header1 title={t("title")} center className="mb-6 text-2xl md:text-3xl" />

            {loading ? (
                <p className="text-center py-10">{t("loading")}</p>
            ) : productList.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {productList.map((product) => (
                        <ProductCard
                            key={`${product.category}-${product.id}`}
                            title={product.name}
                            description={product.deskripsi}
                            image={`${BASE_IMAGE_URL}/img/produk/${product.image}`}
                            category={product.category}
                            slug={product.slug}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center py-10">{t("noProducts")}</p>
            )}
        </div>
    );
}
