import Link from 'next/link';

interface Header2Props {
    title: string;
    center?: boolean;
    className?: string;
    showViewAll?: boolean;
    viewAllHref?: string;
}

export default function Header2({ 
    title, 
    center = false, 
    className = "",
    showViewAll = false,
    viewAllHref = ""
}: Header2Props) {
    const baseClass = "text-xl text-gray-400";
    const centerClass = center ? "text-center" : "";
    
    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
                <h1 className={`${baseClass} ${centerClass} ${className} uppercase`}>
                    {title}
                </h1>
                <div className="h-0.5 bg-green-500 w-25 rounded-full"></div>
            </div>
            
            {showViewAll && viewAllHref && (
                <Link 
                    href={viewAllHref}
                    className="text-green-500 hover:text-green-600 text-sm font-medium transition-colors"
                >
                    Lihat Semua Berita →
                </Link>
            )}
        </div>
    );
}
