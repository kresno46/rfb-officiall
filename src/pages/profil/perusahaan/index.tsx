import CardVisiMisi from "@/components/atoms/CardVisiMisi";
import TitleH3 from "@/components/atoms/TitleH3";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function ProfilPerusahaan() {
    const VisiItems = [
        "Menjadi perusahaan nomor satu dalam industri perdagangan berjangka komoditi di Indonesia",
        "Menerapkan Good Corporate Governance dalam menjalankan kegiatan sebagai pialang berjangka yang menjunjung tinggi nilai fairness dan kepastian hukum bagi setiap orang yang terlibat di dalamnya.",
    ];

    const MisiItems = [
        "Meningkatkan literasi dan edukasi kepada masyarakat dengan menggandeng otoritas dan SRO melalui press rilis media, seminar dsb.",
        "Meningkatkan kompetensi Wakil Pialang Berjangka melalui pelatihan-pelatihan eksternal maupun internal agar dalam bekerja menjadi lebih profesional.",
        "Penerapan prosedur kerja standar yang ketat terutama terhadap penerimaan calon nasabah.",
    ];

    const anggotaLogos = [
        { src: "/assets/logo-jfx.png", alt: "JFX" },
        { src: "/assets/logo-kbi.png", alt: "KBI" },
        { src: "/assets/logo-aspebtindo.png", alt: "ASPEBTINDO" },
        { src: "/assets/logo-bappebti.png", alt: "BAPPEBTI" },
    ];

    return (
        <PageTemplate title="Profil Perusahaan">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="PT. Rifan Financinda Berjangka">
                    <div className="space-y-10 text-center">
                        {/* Tentang Kami */}
                        <div className="space-y-5">
                            <TitleH3>Tentang Kami</TitleH3>
                            <div className="space-y-3 text-base text-gray-700">
                                <p>
                                    <strong>PT. Rifan Financindo Berjangka</strong> adalah anggota dari bursa berjangka yang ada di Indonesia yaitu Jakarta Futures Exchange (JFX) serta untuk menjamin integritas keuangan perusahaan juga merupakan anggota dari lembaga kliring dari bursa berjangka tersebut yaitu anggota dari Indonesian Derivatives Clearing House (KBI). Perusahaan berkomitmen untuk melaksanakan perdagangan berjangka secara teratur, wajar, efektif dan transparan yang diatur dalam undang-undang di bidang Perdagangan Berjangka untuk memberikan kepastian hukum bagi semua pihak dalam kegiatan Perdagangan Berjangka di Indonesia.
                                </p>
                                <p>
                                    <strong>PT Rifan Financindo Berjangka</strong> telah berpengalaman lebih dari 20 tahun di industri Perdagangan Berjangka Komoditi dan merupakan perusahaan pialang terbesar dengan menduduki posisi teratas dari 10 perusahaan pialang berjangka dengan transaksi teraktif di PT Bursa Berjangka Jakarta. Selain anggota bursa, PT Rifan Financindo Berjangka juga merupakan anggota PT Kliring Berjangka Indonesia (Persero) dan terdaftar resmi di Badan Pengawas Perdagangan Berjangka Komoditi (BAPPEBTI). Sejak tahun 2000 PT Rifan Financindo Berjangka terus berkembang dengan jumlah kantor operasional yang tersebar di kota-kota besar di Indonesia. Berkantor pusat di Jakarta (Axa Tower) dan kantor cabang yang berada di Jakarta (DBS Bank Tower), Bandung, Semarang, Solo, Yogyakarta, Surabaya (Ciputra World), Medan, Pekanbaru dan Palembang, Balikpapan dan Surabaya (Pakuwon Tower).
                                </p>
                            </div>
                        </div>

                        {/* Visi */}
                        <div className="space-y-5">
                            <TitleH3>Visi</TitleH3>
                            <div className="flex flex-col justify-center items-center gap-3">
                                {VisiItems.map((item, index) => (
                                    <CardVisiMisi key={`visi-${index}`}>
                                        {item}
                                    </CardVisiMisi>
                                ))}
                            </div>
                        </div>

                        {/* Misi */}
                        <div className="space-y-5">
                            <TitleH3>Misi</TitleH3>
                            <div className="flex flex-col justify-center items-center gap-3">
                                {MisiItems.map((item, index) => (
                                    <CardVisiMisi key={`misi-${index}`}>
                                        {item}
                                    </CardVisiMisi>
                                ))}
                            </div>
                        </div>
                    </div>

                    <hr className="my-10" />

                    {/* Anggota Dari */}
                    <div className="text-center">
                        <h3 className="text-xl mb-4">Anggota Dari:</h3>
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
