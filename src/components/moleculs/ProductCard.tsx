interface ProductCardProps {
    title: string;
    image?: string;
    className?: string;
    category: string;
    slug: string;
    description?: string;
}

export default function ProductCard({
    title,
    image,
    className = "",
    category,
    slug,
    description = ""
}: ProductCardProps) {
    return (
        <a 
            href={`/produk/${category}/${slug}`} 
            className={`${className} group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
        >
            <div className="relative h-48 overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/400x300?text=Image+Not+Available';
                        }}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-green-50 to-blue-50 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-medium bg-green-600 px-2 py-1 rounded-full">
                        {category.toUpperCase()}
                    </span>
                </div>
            </div>
            
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 h-14">
                    {title}
                </h3>
                {description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                        {description.replace(/<[^>]*>?/gm, '')}
                    </p>
                )}
                <div className="flex justify-between items-center">
                    <span className="inline-flex items-center text-sm font-medium text-green-600">
                        Lihat Detail
                        <svg 
                            className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M14 5l7 7m0 0l-7 7m7-7H3" 
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </a>
    );
}
