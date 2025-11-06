import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

interface CalendarEvent {
  time: string;
  country: string;
  impact: 'High' | 'Medium' | 'Low';
  figures: string;
  previous: string;
  forecast: string;
  actual: string;
}

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'navbar', 'footer', 'economic-calendar'])),
    },
  };
};

export default function EconomicCalendar() {
    const { t } = useTranslation('economic-calendar');
    const [dataKalender, setDataKalender] = useState<CalendarEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/economic-calendar');
                if (!response.ok) {
                    throw new Error(t('error'));
                }
                const data = await response.json();
                setDataKalender(data);
            } catch (err) {
                console.error('Error:', err);
                setError(t('error'));
                // Fallback ke data statis jika API gagal
                setDataKalender([
                    {
                        time: "08:00",
                        country: "USA",
                        impact: "High",
                        figures: "GDP",
                        previous: "3.0%",
                        forecast: "3.2%",
                        actual: "3.5%",
                    },
                    {
                        time: "09:30",
                        country: "JPN",
                        impact: "Medium",
                        figures: "CPI",
                        previous: "1.1%",
                        forecast: "1.3%",
                        actual: "1.4%",
                    },
                    {
                        time: "10:45",
                        country: "EUR",
                        impact: "Low",
                        figures: "PMI",
                        previous: "50.1",
                        forecast: "51.0",
                        actual: "50.5",
                    },
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <PageTemplate title={t('title')}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={t('title')}>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-pulse text-gray-500">{t('loading')}</div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10">
                            <p className="text-red-500 mb-4">{error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                {t('common:tryAgain', 'Coba Lagi')}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {/* Filter Button Section */}
                            <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:gap-3 gap-3">
                                {['today', 'thisWeek', 'previousWeek', 'nextWeek'].map((filterKey) => (
                                    <button
                                        key={filterKey}
                                        className="w-full sm:w-fit px-4 py-2 bg-zinc-200 hover:bg-green-300 rounded-lg transition-all duration-300 text-sm md:text-base text-center"
                                    >
                                        {t(`filters.${filterKey}`)}
                                    </button>
                                ))}
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto rounded-lg border border-zinc-200">
                                {dataKalender.length > 0 ? (
                                    <table className="w-full text-sm md:text-base min-w-[700px]">
                                        <thead className="bg-green-600 text-white">
                                            <tr>
                                                <th className="p-2 text-center">{t('time')}</th>
                                                <th className="p-2 text-center">{t('country')}</th>
                                                <th className="p-2 text-center">{t('impact')}</th>
                                                <th className="p-2 text-center">{t('figures')}</th>
                                                <th className="p-2 text-center">{t('previous')}</th>
                                                <th className="p-2 text-center">{t('forecast')}</th>
                                                <th className="p-2 text-center">{t('actual')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataKalender.map((row, index) => (
                                                <tr
                                                    key={index}
                                                    className={`text-center ${index % 2 === 0 ? "bg-white" : "bg-zinc-100"} hover:bg-green-100 transition`}
                                                >
                                                    <td className="p-2">{row.time}</td>
                                                    <td className="p-2">{row.country}</td>
                                                    <td className="p-2">
                                                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                                            row.impact === 'High' ? 'bg-red-100 text-red-800' :
                                                            row.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-green-100 text-green-800'
                                                        }`}>
                                                            {t(row.impact.toLowerCase())}
                                                        </span>
                                                    </td>
                                                    <td className="p-2">{row.figures}</td>
                                                    <td className="p-2">{row.previous}</td>
                                                    <td className="p-2">{row.forecast}</td>
                                                    <td className="p-2 font-medium">{row.actual}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-center py-10 text-gray-500">
                                        {t('noData')}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
