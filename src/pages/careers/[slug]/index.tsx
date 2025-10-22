import React, { useState, useEffect } from 'react';
import PageTemplate from '@/components/templates/PageTemplate';
import ProfilContainer from '@/components/templates/PageContainer/Container';
import ApplyModal from '@/components/moleculs/ApplyModal';
import { fetchCareerBySlug } from '@/services/careerService';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { Career } from '@/services/careerService';

interface CareerDetailProps {
  career: Career | null;
}

const CareerDetail: React.FC<CareerDetailProps> = ({ career }) => {
  if (!career) {
    return (
      <PageTemplate title="Lowongan Tidak Ditemukan">
        <div className="container mx-auto px-4 py-10">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Lowongan Tidak Ditemukan</h1>
            <p className="text-gray-600">Maaf, lowongan yang Anda cari tidak dapat ditemukan.</p>
          </div>
        </div>
      </PageTemplate>
    );
  }

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <PageTemplate title={`${career.posisi} - ${career.nama_kota}`}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={career.nama_kota}>
          {/* Judul Posisi */}
          <div className="text-left mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{career.posisi}</h1>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Tanggung Jawab Pekerjaan */}
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Tanggung Jawab Pekerjaan</h2>
                {career.responsibilities ? (
                  <div 
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{ 
                      __html: career.responsibilities
                        .replace(/<p(\s+[^>]*)?>/g, (match, p1) => {
                          if (/^\s*$/.test(match)) return match;
                          return `<p class="mb-3 leading-relaxed"${p1 || ''}>`;
                        })
                        .replace(/<h2/g, '<h2 class="text-xl font-semibold mt-6 mb-3 text-gray-800"')
                        .replace(/<h3/g, '<h3 class="text-lg font-medium mt-5 mb-2 text-gray-800"')
                        .replace(/<ul/g, '<ul class="list-disc pl-6 space-y-1.5 my-4"')
                        .replace(/<ol/g, '<ol class="list-decimal pl-6 space-y-1.5 my-4"')
                        .replace(/<li/g, '<li class="mb-1"')
                        .replace(/<a/g, '<a class="text-[#d22a27] hover:text-[#b82421] hover:underline"')
                    }}
                  />
                ) : (
                  <div className="text-gray-500">
                    <p>Tidak ada deskripsi tanggung jawab yang tersedia.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Kualifikasi */}
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Kualifikasi</h2>
                {career.qualifications ? (
                  <div 
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{ 
                      __html: career.qualifications
                        .replace(/<p(\s+[^>]*)?>/g, (match, p1) => {
                          if (/^\s*$/.test(match)) return match;
                          return `<p class="mb-3 leading-relaxed"${p1 || ''}>`;
                        })
                        .replace(/<h2/g, '<h2 class="text-xl font-semibold mt-6 mb-3 text-gray-800"')
                        .replace(/<h3/g, '<h3 class="text-lg font-medium mt-5 mb-2 text-gray-800"')
                        .replace(/<ul/g, '<ul class="list-disc pl-6 space-y-1.5 my-4"')
                        .replace(/<ol/g, '<ol class="list-decimal pl-6 space-y-1.5 my-4"')
                        .replace(/<li/g, '<li class="mb-1"')
                        .replace(/<a/g, '<a class="text-[#d22a27] hover:text-[#b82421] hover:underline"')
                    }}
                  />
                ) : (
                  <div className="text-gray-500">
                    <p>Tidak ada kualifikasi yang tersedia.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tombol Lamar dan Kembali */}
            <div className="pt-6 border-t text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center bg-[#d22a27] hover:bg-[#b82421] text-white font-medium py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg cursor-pointer hover:scale-105 transform transition-transform"
                >
                  Lamar Sekarang
                </button>
                <Link 
                  href="/careers"
                  className="inline-flex items-center justify-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg transition duration-200 shadow-sm hover:shadow cursor-pointer"
                >
                  Kembali
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Aplikasi Anda akan diproses oleh tim kami dan kami akan menghubungi Anda jika Anda memenuhi kualifikasi.
              </p>
            </div>
          </div>
        </ProfilContainer>

        {/* Apply Modal */}
        <ApplyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          position={career.posisi}
          city={career.nama_kota}
          karierId={career.id}
        />
      </div>
    </PageTemplate>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  
  try {
    // Fetch the specific career by slug
    const response = await fetch(`http://rfb-backend.test/api/karier/slug/${slug}`);
    const data = await response.json();
    
    if (!data.success || !data.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        career: data.data,
      },
      revalidate: 60, // Regenerate the page every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching career:', error);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Fetch all careers to generate static paths
    const response = await fetch('http://rfb-backend.test/api/karier');
    const data = await response.json();
    
    if (!data.success || !data.data) {
      return {
        paths: [],
        fallback: 'blocking',
      };
    }

    // Generate paths for all careers
    const paths = data.data.map((career: any) => ({
      params: { slug: career.slug },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export default CareerDetail;
