import { useTranslation } from 'next-i18next';

export default function AboutUs() {
    const { t } = useTranslation('about-us');
    
    return (
        <div className="flex flex-col md:flex-row gap-8 items-center px-4 py-10">
            {/* Gambar */}
            <div className="w-full flex justify-center">
                <img
                    src="/assets/gedung-rfb.jpg"
                    alt="Rifan Financindo Berjangka"
                    className="w-full max-w-md md:max-w-[500px] rounded shadow-lg"
                />
            </div>

            {/* Konten */}
            <div className="space-y-4 text-justify">
                <h1 className="text-2xl md:text-4xl font-bold text-green-800">
                    {t('title')}
                </h1>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    {t('description')}
                </p>
            </div>
        </div>
    );
}
