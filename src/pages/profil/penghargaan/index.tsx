import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TitleH3 from "@/components/atoms/TitleH3";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'navbar',
        'footer',
        'perusahaan'
      ])),
    },
  };
};

export default function PenghargaanPage() {
  const { t } = useTranslation(['perusahaan', 'common', 'navbar', 'footer']);

  // Get translated awards data
  const achievements = t('perusahaan:achievements', { returnObjects: true });
  const formattedKeunggulanGrid = Array.isArray(achievements) ? achievements.map((item: any, index: number) => ({
    ...item,
    image: [
      "/assets/penghargaan/RFB_Terbaik_ke-1_Ketaatan_Penempatan_Margin_2024.png",
      "/assets/penghargaan/3rd_Rifan_Financindo_Berjangka_-_highest_volume_broker.png",
      "/assets/penghargaan/RFB-PIALANG_TERBAIK_1_TAHUN_2017.png",
      "/assets/penghargaan/RFB-TOP_3RD_TRANSAKSI_MULTILATERAL_2017.png",
      "/assets/penghargaan/RFB-TOP_2ND_TRANSAKSI_BILATERAL_2017.png",
      "/assets/penghargaan/RFB-KBI_2014.png",
      "/assets/penghargaan/PIALANG_TERBAIK.png",
      "/assets/penghargaan/RFB-TOP_3RD_PIALANG_TRANSAKSI_BILATERAL_TERBANYAK_2013.png",
      "/assets/penghargaan/TRANSAKSI_BILATERAL_2011.png"
    ][index]
  })) : [];

  return (
    <PageTemplate title={t('perusahaan:penghargaanTitle')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('perusahaan:penghargaanTitle')}>
          <div className="space-y-10">
            {/* Penghargaan */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <TitleH3 className="text-green-700 mb-6 border-b pb-2">
                {t('perusahaan:penghargaanTitle')}
              </TitleH3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {formattedKeunggulanGrid.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="group bg-white rounded-lg overflow-hidden hover:bg-gray-50 transition-colors duration-200 border border-gray-100"
                  >
                    <div className="h-48 flex items-center justify-center p-4 bg-white">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 border-t border-gray-100">
                      <h4 className="font-bold text-green-700 text-sm md:text-base mb-1">{item.title}</h4>
                      <p className="text-xs md:text-sm text-gray-600">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}