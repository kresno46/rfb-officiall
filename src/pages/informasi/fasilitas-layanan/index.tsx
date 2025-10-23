import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import CardFasilitas from "@/components/moleculs/CardFasilitas";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export const getStaticProps = async ({ locale = 'id' }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'navbar',
      'footer',
      'fasilitas-layanan'
    ])),
  },
});

export default function FasilitasLayanan() {
    const { t, i18n } = useTranslation('fasilitas-layanan');
    const items = t('items', { returnObjects: true });

    return (
        <PageTemplate title={t('pageTitle')}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={t('title')}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.isArray(items) && items.map((item: any, index: number) => (
                            <CardFasilitas 
                                key={index} 
                                title={item.title} 
                                content={item.content} 
                            />
                        ))}
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    )
}