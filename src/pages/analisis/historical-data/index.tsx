import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import HistoricalDataContent from "@/components/organisms/HistoricalDataContent";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
                'navbar',
                'footer',
                'historical-data'
            ])),
        },
    };
}

export default function HistoricalData() {
    const { t } = useTranslation('historical-data');
    
    return (
        <PageTemplate title={t('title')}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={t('title')}>
                    <HistoricalDataContent />
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}


