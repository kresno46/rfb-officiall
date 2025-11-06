import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import { useState } from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import PivotSection from "@/components/organisms/PivotSection"; 
import FibonacciSection from "@/components/organisms/FIbonacciSection";
import HistoricalDataContent from "@/components/organisms/HistoricalDataContent";

export default function PivotFibonacciPage() {
    const { t } = useTranslation(['pivot-fibo', 'common', 'navbar', 'footer']);
    const [activeTab, setActiveTab] = useState("Pivot");

    return (
        <PageTemplate title={t('title')}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={t('title')}>
                    <div className="space-y-6">
                        <div className="mb-8">
                            <p className="text-gray-600 mb-4">
                                {t('description')}
                            </p>
                        </div>
                        {/* Tabs */}
                        <div className="flex border-b space-x-4">
                            {["Pivot", "Fibonacci"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 font-medium ${activeTab === tab
                                        ? "border-b-2 border-green-500 text-green-600"
                                        : "text-gray-500 hover:text-green-500"
                                        }`}
                                >
                                    {t(`tabs.${tab.toLowerCase()}`)}
                                </button>
                            ))}
                        </div>

                        {/* Dynamic Section */}
                        {activeTab === "Pivot" && <PivotSection />}
                        {activeTab === "Fibonacci" && <FibonacciSection />}

                        <hr className="border-zinc-200" />

                        <HistoricalDataContent />
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
                'navbar',
                'footer',
                'pivot-fibo',
                'historical-data',
            ])),
        },
    };
};
