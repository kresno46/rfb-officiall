
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PengumumanHome from "@/components/organisms/Pengumuman";

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'navbar',
      'footer',
      'pengumuman',
      'berita'
    ])),
  },
});

export default function InformasiUmum() {
    const { t } = useTranslation('pengumuman');
    
    return (
        <PageTemplate title={t('title')}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={t('title')}>
                    <PengumumanHome showHeader={false} />
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
