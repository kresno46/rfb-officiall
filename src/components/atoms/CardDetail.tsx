import Link from 'next/link';

interface CardDetailProps {
    link?: string;
}

export default function CardDetail({ link }: CardDetailProps) {
    // Jika link tidak ada, render sebagai div
    if (!link) {
        return (
            <div className="bg-gray-400 w-fit text-white px-3 py-1 rounded-lg font-medium inline-flex items-center mt-auto space-x-3 cursor-not-allowed">
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>Baca Selengkapnya</span>
            </div>
        );
    }

    // Jika link ada, gunakan Link dari Next.js dengan properti yang tepat
    return (
        <Link
            href={link}
            className="bg-green-600 hover:bg-green-700 w-fit text-white px-3 py-1 rounded-lg font-medium inline-flex items-center mt-auto space-x-3 transition-all duration-300 relative z-10"
            passHref
            onClick={(e) => {
                e.stopPropagation();
                // Tambahkan logika tambahan jika diperlukan
            }}
            onMouseDown={(e) => e.stopPropagation()}
        >
            <i className="fa-solid fa-magnifying-glass"></i>
            <span>Baca Selengkapnya</span>
        </Link>
    );
}
