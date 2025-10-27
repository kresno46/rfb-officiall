
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import BusinessContainer from "@/components/templates/PageContainer/BusinessContainer";
import PageTemplate from "@/components/templates/PageTemplate";
import { useState } from "react";

export const getStaticProps = async ({ locale = 'id' }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'navbar',
      'footer',
      'legalitas'
    ])),
  },
});

interface LegalitasItem {
  id: string;
  name: string;
  image: string;
}

const LegalitasBisnisList: LegalitasItem[] = [
  {
    id: 'jakarta1',
    name: "cities.jakarta",
    image: "/assets/legalitas-bisnis/legalitasJKT-AXAtower.jpg"
  },
  {
    id: 'jakarta2',
    name: "cities.jakarta",
    image: "/assets/legalitas-bisnis/legalitasJKT-AXAtower(2).jpg"
  },
  {
    id: 'jakarta3',
    name: "cities.jakarta",
    image: "/assets/legalitas-bisnis/legalitasJKT-AXAtower(5).jpg"
  },
  {
    id: 'jakarta4',
    name: "cities.jakarta",
    image: "/assets/legalitas-bisnis/legalitasJKT-AXAtower(6).jpg"
  },
  {
    id: 'surabaya1',
    name: "cities.surabaya",
    image: "/assets/legalitas-bisnis/legalitasSBY.jpg"
  },
  {
    id: 'surabaya2',
    name: "cities.surabaya",
    image: "/assets/legalitas-bisnis/legalitasSURABAYA.jpg"
  },
  {
    id: 'medan',
    name: "cities.medan",
    image: "/assets/legalitas-bisnis/legalitasMEDAN.jpg"
  },
  {
    id: 'semarang',
    name: "cities.semarang",
    image: "/assets/legalitas-bisnis/legalitasSMG.jpg"
  },
  {
    id: 'yogyakarta',
    name: "cities.yogyakarta",
    image: "/assets/legalitas-bisnis/legalitasYOGYAKARTA.jpg"
  },
  {
    id: 'balikpapan',
    name: "cities.balikpapan",
    image: "/assets/legalitas-bisnis/legalitasBALIKPAPAN.jpeg"
  }
];

export default function LegalitasBisnis() {
  const { t } = useTranslation(['legalitas']);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <PageTemplate title={t('pageTitle')}>
      <div className="my-10 mx-10 md:mx-52">
        <BusinessContainer title={t('businessContainer.title')}>
          <div className="flex gap-6 overflow-x-auto px-4 py-2">
            {LegalitasBisnisList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleImageClick(item.image)}
                className="relative cursor-pointer min-w-[250px] transition-transform duration-300 ease-in-out hover:scale-110"
              >
                <img
                  src={item.image}
                  alt={t(item.name)}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-2 text-sm uppercase transition-opacity duration-300 hover:opacity-0">
                  {t(item.name)}
                </div>
              </div>
            ))}
          </div>
        </BusinessContainer>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-0 right-0 text-white text-4xl px-4 py-2"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt="Zoomed Preview"
              className="w-full h-auto max-h-[80vh] object-contain transform scale-100 transition-transform duration-300"
            />
          </div>
        </div>
      )}
    </PageTemplate>
  );
}
