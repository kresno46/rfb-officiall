import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import BeritaSection from "@/components/organisms/BeritaSection";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'berita', 'navbar', 'footer'])),
    },
  };
};

export default function BeritaPage() {
  const { t } = useTranslation('berita');
  
  return (
    <PageTemplate title={t('title')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('title')}>
          <div className="space-y-10">
            <BeritaSection showHeader={false} />

            {/* Button https://www.newsmaker.id/index.php/id/ */}
            <div className="flex justify-center">
              <a 
                href="https://www.newsmaker.id/index.php/id/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white transition-all duration-300"
              >
                {t('viewAll')}
              </a>
            </div>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}
