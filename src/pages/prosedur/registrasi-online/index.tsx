import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import RegistrationFlow from "@/components/organisms/RegistrationFlow";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import { GetStaticProps } from 'next';

export default function RegistrationOnline() {
    const { t } = useTranslation('regol');
    
    return (
        <PageTemplate title={t('title')}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={t('title')}>
                    <RegistrationFlow />
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => ({
    props: {
        ...(await serverSideTranslations(locale, [
            'common',
            'navbar',
            'footer',
            'regol'
        ])),
    },
});
