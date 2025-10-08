export default function AboutUs() {
    return (
        <div className="flex flex-col md:flex-row gap-8 items-center px-4 py-10">
            {/* Gambar */}
            <div className="w-full flex justify-center">
                <img
                    src="/assets/gedung-rfb.jpg"
                    alt="Rifan Financindo Berjangka"
                    className="w-full max-w-md md:max-w-[500px] rounded shadow-lg"
                />
            </div>

            {/* Konten */}
            <div className="space-y-4 text-justify">
                <h1 className="text-2xl md:text-4xl font-bold text-green-800">
                    Selamat Datang di Rifan Financindo Berjangka
                </h1>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    PT Rifan Financindo Berjangka (“RFB”) berpengalaman lebih dari 20 tahun di industri
                    Perdagangan Berjangka Komoditi dan merupakan perusahaan pialang terbesar dengan
                    menduduki posisi teratas dari 10 perusahaan pialang berjangka teraktif dari PT Kliring
                    Berjangka Indonesia (Persero). Selain anggota dari KBI (Persero), PT Rifan Financindo
                    Berjangka juga merupakan anggota PT Bursa Berjangka Jakarta dan terdaftar resmi di
                    Badan Pengawas Perdagangan Berjangka Komoditi (BAPPEBTI). Sejak tahun 2000, PT Rifan
                    Financindo Berjangka terus berkembang dengan jumlah kantor operasional sekarang di
                    Jakarta (2 kantor), Bandung, Semarang, Solo, Yogyakarta, Surabaya (2 kantor), Medan,
                    Pekanbaru, Palembang dan Balikpapan.
                </p>
            </div>
        </div>
    );
}
