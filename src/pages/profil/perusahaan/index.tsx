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

  const keunggulanGrid = [
    {
      image: "/assets/penghargaan/RFB_Terbaik_ke-1_Ketaatan_Penempatan_Margin_2024.png",
      title: "KBI",
      subtitle: "Terbaik ke-1 Ketaatan Penempatan Margin 2024",
    },
    {
      image: "/assets/penghargaan/3rd_Rifan_Financindo_Berjangka_-_highest_volume_broker.png",
      title: "JFX",
      subtitle: "Broker Dengan Volume Tertinggi Ke-3",
    },
    {
      image: "/assets/penghargaan/RFB-PIALANG_TERBAIK_1_TAHUN_2017.png",
      title: "KBI",
      subtitle: "Anggota Kliring Pialang Terbaik 1 Tahun 2017",
    },
    {
      image: "/assets/penghargaan/RFB-TOP_3RD_TRANSAKSI_MULTILATERAL_2017.png",
      title: "JFX",
      subtitle: "Transaksi Multilateral Terbanyak Peringkat 3 Tahun 2017",
    },
    {
      image: "/assets/penghargaan/RFB-TOP_2ND_TRANSAKSI_BILATERAL_2017.png",
      title: "JFX",
      subtitle: "Transaksi Bilateral Terbanyak Peringkat 2 Tahun 2017",
    },
    {
      image: "/assets/penghargaan/RFB-KBI_2014.png",
      title: "KBI",
      subtitle: "Anggota Kliring Terbaik III Tahun 2014 ",
    },
    {
      image: "/assets/penghargaan/PIALANG_TERBAIK.png",
      title: "KBI",
      subtitle: "Pialang Terbaik 1",
    },
    {
      image: "/assets/penghargaan/RFB-TOP_3RD_PIALANG_TRANSAKSI_BILATERAL_TERBANYAK_2013.png",
      title: "JFX",
      subtitle: "Pialang Dengan Volume Transaksi Bilateral Terbanyak ke III Tahun 2013",
    },
    {
      image: "/assets/penghargaan/TRANSAKSI_BILATERAL_2011.png",
      title: "JFX",
      subtitle: "Pialang Dengan Volume Bilateral Terbaik 2011",
    },
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
                  <strong>PT. Rifan Financindo Berjangka</strong> adalah anggota
                  dari bursa berjangka yang ada di Indonesia yaitu Jakarta
                  Futures Exchange (JFX) serta untuk menjamin integritas
                  keuangan perusahaan juga merupakan anggota dari lembaga
                  kliring dari bursa berjangka tersebut yaitu anggota dari
                  Indonesian Derivatives Clearing House (KBI). Perusahaan
                  berkomitmen untuk melaksanakan perdagangan berjangka secara
                  teratur, wajar, efektif dan transparan yang diatur dalam
                  undang-undang di bidang Perdagangan Berjangka untuk memberikan
                  kepastian hukum bagi semua pihak dalam kegiatan Perdagangan
                  Berjangka di Indonesia.
                </p>
                <p>
                  <strong>PT Rifan Financindo Berjangka</strong> telah
                  berpengalaman lebih dari 20 tahun di industri Perdagangan
                  Berjangka Komoditi dan merupakan perusahaan pialang terbesar
                  dengan menduduki posisi teratas dari 10 perusahaan pialang
                  berjangka dengan transaksi teraktif di PT Bursa Berjangka
                  Jakarta. Selain anggota bursa, PT Rifan Financindo Berjangka
                  juga merupakan anggota PT Kliring Berjangka Indonesia
                  (Persero) dan terdaftar resmi di Badan Pengawas Perdagangan
                  Berjangka Komoditi (BAPPEBTI). Sejak tahun 2000 PT Rifan
                  Financindo Berjangka terus berkembang dengan jumlah kantor
                  operasional yang tersebar di kota-kota besar di Indonesia.
                  Berkantor pusat di Jakarta (Axa Tower) dan kantor cabang yang
                  berada di Jakarta (DBS Bank Tower), Bandung, Semarang, Solo,
                  Yogyakarta, Surabaya (Ciputra World), Medan, Pekanbaru dan
                  Palembang, Balikpapan dan Surabaya (Pakuwon Tower).
                </p>
              </div>
            </div>

            {/* Kenapa Anda Harus Memilih Kami */}
            <div className="space-y-5">
              <TitleH3>Kenapa Anda Harus Memilih Kami</TitleH3>
              <div className="space-y-4 text-left text-base text-gray-700">
                <ol className="list-decimal space-y-3 pl-6">
                  <li>
                    <strong>Kepastian Hukum:</strong> Seluruh produk yang
                    ditransaksikan melalui PT Rifan Financindo Berjangka
                    tercatat di Bursa Berjangka Jakarta, dan dana jaminan
                    (margin) Nasabah ditempatkan di rekening terpisah
                    (Segregated Account) yang diawasi oleh Bappebti serta
                    disetorkan ke Kliring Berjangka Indonesia.
                  </li>
                  <li>
                    <strong>Fasilitas Registrasi Online:</strong> Registrasi
                    akun dapat dilakukan secara online melalui website resmi
                    kami dengan fitur REGISTRASI AKUN ONLINE.
                  </li>
                  <li>
                    <strong>Fasilitas Online Trading dan Akun Demo:</strong>{" "}
                    Nasabah dapat bertransaksi kapan saja dan di mana saja
                    dengan akses internet. Tersedia akun demo untuk simulasi
                    sebelum transaksi riil.
                  </li>
                  <li>
                    <strong>Laporan Transaksi Harian:</strong> Nasabah menerima
                    laporan harian yang mencakup rekap transaksi, posisi
                    ekuitas, dan posisi transaksi terbuka.
                  </li>
                  <li>
                    <strong>Keamanan Dana:</strong> Dana nasabah disimpan
                    terpisah dari aset perusahaan dan diawasi oleh Bappebti.
                    Dana hanya digunakan sesuai perintah nasabah.
                  </li>
                  <li>
                    <strong>Penarikan Dana Cepat:</strong> Proses penarikan dana
                    dapat dilakukan maksimal dalam tiga hari kerja (T+3), bahkan
                    bisa lebih cepat (T+1).
                  </li>
                  <li>
                    <strong>Wakil Pialang Berjangka Profesional:</strong> Tim
                    Wakil Pialang kami profesional dan terlatih untuk memberikan
                    rekomendasi berdasarkan analisis fundamental dan teknikal.
                  </li>
                  <li>
                    <strong>Portal Berita dan Analisa:</strong> Portal berita{" "}
                    <a
                      href="https://www.rfbnews.com"
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      www.rfbnews.com
                    </a>{" "}
                    tersedia 24 jam untuk riset dan analisa pasar.
                  </li>
                  <li>
                    <strong>SITNa:</strong> Nasabah dapat memonitor transparansi
                    transaksi melalui sistem SITNa untuk memastikan pencatatan
                    di Bursa dan Kliring Berjangka.
                  </li>
                </ol>
              </div>
            </div>

            {/* Visi */}
            <div className="space-y-5">
              <TitleH3>Visi</TitleH3>
              <div className="flex flex-col justify-center items-center gap-3">
                {VisiItems.map((item, index) => (
                  <CardVisiMisi key={`visi-${index}`}>{item}</CardVisiMisi>
                ))}
              </div>
            </div>

            {/* Misi */}
            <div className="space-y-5">
              <TitleH3>Misi</TitleH3>
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
              Penghargaan
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
