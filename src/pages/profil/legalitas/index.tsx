// // Profil Perusahaan

// import ProfilContainer from "@/components/templates/PageContainer/Container";
// import PageTemplate from "@/components/templates/PageTemplate";

// export default function Legalitas() {
//     return (
//         <PageTemplate title="Legalitas - PT Solid Gold Berjangka">
//             <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
//                 <ProfilContainer title="Legalitas Bisnis">
//                     <div></div>
//                 </ProfilContainer>
//             </div>
//         </PageTemplate >
//     );
// }

// Legalitas Bisnis

import BusinessContainer from "@/components/templates/PageContainer/BusinessContainer";
import PageTemplate from "@/components/templates/PageTemplate";
import { useState } from "react";

const LegalitasBisnisList = [
  {
    name: "AXA Tower - Jakarta",
    image: "/assets/legalitas-bisnis/legalitasJKT-AXAtower.jpg",
  },
  {
    name: "AXA TOWER - JAKARTA",
    image: "/assets/legalitas-bisnis/legalitasJKT-AXAtower(2).jpg",
  },
  {
    name: "AXA TOWER - JAKARTA",
    image: "/assets/legalitas-bisnis/legalitasJKT-AXAtower(5).jpg",
  },
  {
    name: "DBS Tower - Jakarta",
    image: "/assets/legalitas-bisnis/legalitasJKT-DBStower.jpg",
  },
  {
    name: "Medan",
    image: "/assets/legalitas-bisnis/legalitasMEDAN.jpg",
  },
  {
    name: "Bandung",
    image: "/assets/legalitas-bisnis/legalitasBANDUNG.jpg",
  },
  {
    name: "Palembang",
    image: "/assets/legalitas-bisnis/legalitasPALEMBANG.jpg",
  },
  {
    name: "Pekanbaru",
    image: "/assets/legalitas-bisnis/legalitasPEKANBARU.jpg",
  },
  {
    name: "Semarang",
    image: "/assets/legalitas-bisnis/legalitasSEMARANG.jpg",
  },
  {
    name: "Solo",
    image: "/assets/legalitas-bisnis/legalitasSOLO.jpg",
  },
  {
    name: "Surabaya I",
    image: "/assets/legalitas-bisnis/legalitasSURABAYA.jpg",
  },
  {
    name: "Surabaya II",
    image: "/assets/legalitas-bisnis/legalitasSURABAYA.jpg",
  },
  {
    name: "Yogyakarta",
    image: "/assets/legalitas-bisnis/legalitasYOGYAKARTA.jpg",
  },
  {
    name: "Balikpapan",
    image: "/assets/legalitas-bisnis/legalitasBALIKPAPAN.jpeg",
  },
];

export default function LegalitasBisnis() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <PageTemplate title="Legalitas - PT Solid Gold Berjangka">
      <div className="my-10 mx-10 md:mx-52">
        <BusinessContainer title="Legalitas Bisnis">
          <div className="flex gap-6 overflow-x-auto px-4 py-2">
            {LegalitasBisnisList.map((item) => (
              <div
                key={item.name}
                onClick={() => setSelectedImage(item.image)}
                className="relative cursor-pointer min-w-[250px] transition-transform duration-300 ease-in-out hover:scale-110"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-2 text-sm uppercase transition-opacity duration-300 hover:opacity-0">
                  {item.name}
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
