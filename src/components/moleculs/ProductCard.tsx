interface ProductCardProps {
    title: string;
    image?: string;
    className?: string;
    category: string;
    slug: string;
}

export default function ProductCard({
    title,
    image,
    className = "",
    category,
    slug,
}: ProductCardProps) {
    return (
        <a href={`/produk/${category}/${slug}`} className={`${className} bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300`}>
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="w-full h-40 object-cover"
                />
            )}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-green-600 text-center mb-2">{title}</h3>
            </div>
        </a>
    );
}
