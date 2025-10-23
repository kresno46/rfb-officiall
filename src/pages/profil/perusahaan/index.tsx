import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import CardVisiMisi from "@/components/atoms/CardVisiMisi";
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

export default function ProfilPerusahaan() {
  const { t } = useTranslation(['perusahaan', 'common', 'navbar', 'footer']);
  
  // Get translations with fallback to empty array if not available yet
  const getTranslatedArray = (key: string, fallback: any[] = []) => {
    const value = t(key, { returnObjects: true });
    return Array.isArray(value) ? value : fallback;
  };

  const VisiItems = getTranslatedArray('perusahaan:visiItems', []) as string[];
  const MisiItems = getTranslatedArray('perusahaan:misiItems', []) as string[];
  const achievements = getTranslatedArray('perusahaan:achievements', []) as Array<{title: string, subtitle: string}>;
  const whyChooseUs = getTranslatedArray('perusahaan:whyChooseUs', []) as Array<{title: string, description: string}>;
  
  const keunggulanGrid = achievements.map((item, index) => ({
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
    ][index],
    ...item
  }));

  const anggotaLogos = [
    { src: "/assets/logo-jfx.png", alt: "JFX" },
    { src: "/assets/logo-kbi.png", alt: "KBI" },
    { src: "/assets/logo-aspebtindo.png", alt: "ASPEBTINDO" },
    { src: "/assets/logo-bappebti.png", alt: "BAPPEBTI" },
  ];

  return (
    <PageTemplate title={t('perusahaan:pageTitle')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('perusahaan:profilTitle')}>
          <div className="space-y-10 text-center">
            {/* Tentang Kami */}
            <div className="space-y-5">
              <TitleH3>{t('perusahaan:tentangKamiTitle')}</TitleH3>
              <div className="space-y-3 text-base text-gray-700">
                <div dangerouslySetInnerHTML={{ __html: t('perusahaan:aboutUs.p1') }} />
                <div dangerouslySetInnerHTML={{ __html: t('perusahaan:aboutUs.p2') }} />
              </div>
            </div>

            {/* Kenapa Anda Harus Memilih Kami */}
            <div className="space-y-5">
              <TitleH3>{t('perusahaan:keunggulanTitle')}</TitleH3>
              <div className="space-y-4 text-left text-base text-gray-700">
                <ol className="list-decimal space-y-3 pl-6">
                  {whyChooseUs.map((item, index) => (
                    <li key={index}>
                      <div dangerouslySetInnerHTML={{ __html: `<strong>${item.title}</strong> ${item.description}` }} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Visi */}
            <div className="space-y-5">
              <TitleH3>{t('perusahaan:visiTitle')}</TitleH3>
              <div className="flex flex-col justify-center items-center gap-3">
                {VisiItems.map((item, index) => (
                  <CardVisiMisi key={`visi-${index}`}>{item}</CardVisiMisi>
                ))}
              </div>
            </div>

            {/* Misi */}
            <div className="space-y-5">
              <TitleH3>{t('perusahaan:misiTitle')}</TitleH3>
              <div className="flex flex-col justify-center items-center gap-3">
                {MisiItems.map((item, index) => (
                  <CardVisiMisi key={`misi-${index}`}>{item}</CardVisiMisi>
                ))}
              </div>
            </div>
          </div>

          {/* Penghargaan - Grid */}
          <div className="my-10">
            <TitleH3 className="text-center mb-12">
              {t('perusahaan:penghargaanTitle')}
            </TitleH3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {keunggulanGrid.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-lg text-gray-800">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="my-10" />

          {/* Anggota Dari */}
          <div className="text-center">
            <h3 className="text-xl mb-4">{t('perusahaan:anggotaDari')}</h3>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
              {anggotaLogos.map((logo, index) => (
                <img
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 sm:h-14 md:h-16 w-auto object-contain"
                />
              ))}
            </div>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}
