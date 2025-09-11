import Link from 'next/link';

interface CardCategoryPialangProps {
  title: string;
  slug?: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function CardCategoryPialang({ 
  title, 
  slug, 
  description = '',
  icon = null 
}: CardCategoryPialangProps) {
  return (
    <Link 
      href={`/profil/wakil-pialang/${slug}`}
      className="group block h-full"
    >
      <div className="relative overflow-hidden bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col hover:-translate-y-1">
        {icon && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg w-12 h-12 flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors duration-300">
            {icon}
          </div>
        )}
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
          {title}
        </h3>
        
        {description && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-green-600 group-hover:text-green-700 font-medium text-sm transition-colors duration-300">
          Lihat Detail
          <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
        
        {/* Hover effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </div>
    </Link>
  );
}