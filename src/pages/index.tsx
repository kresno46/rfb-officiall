// Home.jsx

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
    // Open modal automatically on page load
    setShowModal(true);
  }, []);

  const handleCloseModal = () => setShowModal(false);

  return (
    <PageTemplate>
      <ModalPopup
        isOpen={showModal}
        onClose={handleCloseModal}
        title="Selamat Datang!"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="bg-zinc-200 p-5 rounded-lg">
            <img src="/assets/logo-rfb.png" alt="Modal Popup" className="h-30" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-center text-green-800">
            Welcome to PT Rifan Financindo Berjangka
          </h1>
          <p className="text-lg text-center">
            Join us now and start your trading journey!
          </p>
          <a
            href="https://regol.rifan-financindo-berjangka.co.id/"
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-all duration-300"
          >
            Register Now
          </a>

          {/* NEW Later Button */}
          <button
            onClick={handleCloseModal}
            className="text-gray-600 hover:text-gray-800 mt-2 underline"
          >
            Later
          </button>
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
            <BeritaSection className="mx-auto flex flex-col gap-7 px-4 lg:px-16" />
          </div>
        </div>

        <Iso />

        <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-36 2xl:px-52 my-20">
          <Pengumuman showHeader={true} className="mx-auto px-4" />
        </div>

        <div className="container mx-auto px-4">
          {/* --- BERIZIN DAN DIAWASI --- */}
          <div className="text-center mt-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1d2127] mb-6">BERIZIN DAN DIAWASI</h2>

            <div className="flex flex-wrap justify-center items-center gap-8">
              <a href="https://www.bappebti.go.id/" target="_blank">
                <img
                  src="/assets/bappebti-logo.png"
                  className="h-14 sm:h-16 md:h-20 object-contain"
                  alt="Bappebti"
                />
              </a>
              <a href="https://ojk.go.id/" target="_blank">
                <img
                  src="/assets/logo-ojk.png"
                  className="h-16 sm:h-20 md:h-24 object-contain"
                  alt="OJK"
                />
              </a>
              <a href="https://www.bi.go.id/" target="_blank">
                <img
                  src="/assets/logo-bankindonesia.png"
                  className="h-10 sm:h-14 md:h-16 object-contain"
                  alt="Bank Indonesia"
                />
              </a>
            </div>
          </div>

          {/* --- KEANGGOTAAN DARI --- */}
          <div className="text-center mt-12">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1d2127] mb-6">KEANGGOTAAN DARI</h2>

            <div className="flex flex-wrap justify-center items-center gap-12">
              <a href="https://www.jfx.co.id/" target="_blank">
                <img
                  src="/assets/logo-jfx.png"
                  className="h-16 sm:h-20 md:h-24 object-contain"
                  alt="JFX"
                />
              </a>
              <a
                href="https://www.ptkbi.com/index.php/c_kbi_wppue_01_anggota_mitra#PL"
                target="_blank"
              >
                <img
                  src="/assets/logo-kbi.png"
                  className="h-16 sm:h-20 md:h-24 object-contain"
                  alt="KBI"
                />
              </a>
              <a
                href="https://www.aspebtindo.org/anggota/daftar-anggota"
                target="_blank"
              >
                <img
                  src="/assets/logo-aspebtindo.png"
                  className="h-16 sm:h-20 md:h-24 object-contain"
                  alt="Aspebtindo"
                />
              </a>
            </div>
          </div>
        </div>

        <section className="bg-black text-white mb-5 py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Kiri */}
              <div className="flex-1 text-center lg:text-left">
                <img
                  src="/assets/tradingview.jpg"
                  alt="TradingView"
                  className="h-12 md:h-14 object-contain mx-auto lg:mx-0 mb-4"
                />
                <p className="text-sm md:text-base leading-relaxed">
                  Chart yang kami gunakan disediakan oleh TradingView, sebuah platform
                  charting bagi para trader dan investor dari seluruh penjuru dunia.
                  Temukan berbagai instrumen finansial seperti chart{" "}
                  <span className="font-semibold">EURUSD, BTCUSDT, IHSG</span>, dan juga peralatan seperti{" "}
                  <a
                    href="https://www.tradingview.com/screener/"
                    target="_blank"
                    className="text-green-400 hover:underline"
                  >
                    Stock Screener
                  </a>{" "}
                  yang tersedia secara gratis dan dapat membantu dalam aktivitas trading
                  dan investasi anda.
                </p>
              </div>

              {/* Kanan */}
              <div className="flex-shrink-0">
                <a
                  href="https://www.rfbnews.com/index.php/id/analysis/live-chart"
                  target="_blank"
                  className="btn bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg text-sm md:text-base"
                >
                  Live Chart
                </a>
              </div>
            </div>
          </div>
        </section>


      </div>
    </PageTemplate>
  );
}
