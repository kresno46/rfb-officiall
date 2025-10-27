import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import VideoSection from "@/components/organisms/VideoSection";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'navbar',
      'footer',
      'video'
    ])),
  },
});

export default function Video() {
    const { t } = useTranslation('video');
    
    return (
        <PageTemplate title={t('pageTitle')}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={t('pageTitle')}>
                    <VideoSection />
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
