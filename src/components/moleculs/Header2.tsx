import Link from 'next/link';
import { useTranslation } from 'next-i18next';

interface Header2Props {
    title: string;
    subtitle?: string;
    center?: boolean;
    className?: string;
    showViewAll?: boolean;
    viewAllHref?: string;
    viewAllKey?: string;
}

export default function Header2({ 
    title, 
    subtitle,
    center = false, 
    className = "",
    showViewAll = false,
    viewAllHref = "",
    viewAllKey = "viewAll"
}: Header2Props) {
    const { t } = useTranslation('berita');
    const baseClass = "text-xl text-gray-400";
    const centerClass = center ? "text-center" : "";
    
    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
                <div className={`${center ? 'text-center' : ''}`}>
                    <h2 className={`text-2xl font-bold ${className}`}>
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-gray-600 mt-2">{subtitle}</p>
                    )}
                </div>
                <div className="h-0.5 bg-green-500 w-25 rounded-full"></div>
            </div>
            
            {showViewAll && viewAllHref && (
                <Link 
                    href={viewAllHref}
                    className="text-green-500 hover:text-green-600 text-sm font-medium transition-colors"
                >
                    {t(viewAllKey)} →
                </Link>
            )}
        </div>
    );
}
