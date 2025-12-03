import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AboutUs() {
    const { t } = useTranslation('about-us');
    const router = useRouter();
    const { locale } = router;
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[300px] lg:h-[500px]">
                {/* Kolom Kiri - Gambar */}
                <div className="w-full h-full min-h-[300px] lg:min-h-0 overflow-hidden rounded-xl shadow-lg bg-gray-50">
                    <div className="w-full h-full flex items-center justify-center p-4">
                        <img
                            src="/assets/gedung-rfb.jpg"
                            alt="Rifan Financindo Berjangka"
                            className="w-auto h-auto max-w-full max-h-full object-contain"
                        />
                    </div>
                </div>

                {/* Kolom Kanan - Dibagi 2 bagian */}
                <div className="flex flex-col h-full">
                    <div className="h-full flex flex-col">
                        {/* Bagian Atas - Judul */}
                        <h1 className="text-2xl md:text-4xl font-bold text-green-800 mb-3">
                            {t('title')}
                        </h1>
                        
                        {/* Bagian Tengah - Deskripsi */}
                        <div className="flex-1 overflow-y-auto pr-2">
                            <p className="text-base md:text-[17px] text-gray-700 leading-relaxed m-0" style={{ whiteSpace: 'pre-line' }}>
                                {t('description')}
                            </p>
                        </div>

                        {/* Bagian Bawah - Tombol */}
                        <div className="mt-3">
                            <Link 
                                href="/profil/perusahaan" 
                                locale={locale}
                                className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium py-2.5 px-7 rounded-lg transition duration-300 text-sm md:text-base"
                            >
                                {t('seeMore')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
