// Home

import { useState, useEffect } from "react";
import PageTemplate from "@/components/templates/PageTemplate";
import CarouselWithContent from "@/components/organisms/CarouselWithContent";
import ProdukContainer from "@/components/organisms/ProdukContainer";
import BeritaSection from "@/components/organisms/BeritaSection";
import AboutUs from "@/components/organisms/AboutUs";
import Iso from "@/components/organisms/Market";
import Pengumuman from "@/components/organisms/Pengumuman";
import ModalPopup from "@/components/moleculs/ModalPopup";


export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Buka modal otomatis saat halaman load
    setShowModal(true);
  }, []);

  const handleCloseModal = () => setShowModal(false);

  return (
    <PageTemplate>
      <ModalPopup isOpen={showModal} onClose={handleCloseModal} title="Selamat Datang!">
        <div className="flex flex-col items-center gap-3">
          <div className="bg-zinc-200 p-5 rounded-lg">
            <img src="/assets/logo-rfb.png" alt="Modal Popup" className="h-30" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-center text-green-800">
            Welcome to PT Rifan Financindo Berjangka
          </h1>
          <p className="text-lg text-center">Join us now and start your trading journey!</p>
          <a href="https://regol.rifan-financindo-berjangka.co.id/" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-all duration-300">Register Now</a>
        </div>
      </ModalPopup>

      {/* Carousel */}
      <CarouselWithContent />

      {/* Content */}
      <div className="py-10 bg-white space-y-10">
        <div className="space-y-10 mb-20">
          <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-36 2xl:px-52">
            <AboutUs />
          </div>

          <hr className="border-gray-200" />

          <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-36 2xl:px-52">
            <ProdukContainer />
          </div>

          <hr className="border-gray-200" />

          <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-36 2xl:px-52">
            <BeritaSection limit={3} className="mx-auto flex flex-col gap-7 px-4  lg:px-16" />
          </div>
        </div>

        <Iso />

        <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-36 2xl:px-52 my-20">
          <Pengumuman showHeader={true} className="mx-auto px-4" />
        </div>
      </div>
    </PageTemplate>
  );
}
