import React, { useState } from 'react';
import Link from 'next/link';
import ApplyModal from './ApplyModal';

interface CareerCardProps {
  city: string;
  position: string;
  id: number;
  slug: string;
}

const CareerCard: React.FC<CareerCardProps> = ({ city, position, id, slug }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="p-5">
          <div className="flex items-center mb-4">
            <div className="p-2.5 rounded-lg mr-1">
              <svg 
                className="w-6 h-6 text-[#5db846]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">{city}</h3>
          </div>

          <div className="mb-6 pl-1">
            <h4 className="text-lg text-gray-900">{position}</h4>
          </div>

          <div className="flex flex-col space-y-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full text-center bg-[#d22a27] hover:bg-[#b82421] text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer"
            >
              Lamar Sekarang
            </button>
            <Link 
              href={`/careers/${slug}`}
              className="w-full text-center bg-white border-2 border-[#5db846] text-[#5db846] hover:bg-[#5db846]/5 font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Lihat Detail
            </Link>
          </div>
        </div>
      </div>

      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        position={position}
        city={city}
      />
    </>
  );
};

export default CareerCard;
