// Profil Perusahaan

import KontakCard from "@/components/atoms/KontakCard";
import CabangCard from "@/components/moleculs/CabangCard";
import Header2 from "@/components/moleculs/Header2";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function HubungiKami() {
    const kantorCabang = [
        {
            kota: "MEDAN",
            alamat: "Best & Grow Tower (J.W.MARRIOT) Lt. 12, Unit #1205-1209 Jl. Putri Hijau No. 10, Medan 20111",
            telepon: "(061) 414 0575",
            fax: "(061) 414 0576",
            link: "https://maps.google.com/?q=Best+%26+Grow+Tower+Medan"
        },
        {
            kota: "PALEMBANG",
            alamat: "Kompleks Pertokoan Palembang Square Unit 112.113.115 Jl. Kampus POM IX, Palembang 30137",
            telepon: "(0711) 380 555",
            fax: "(0711) 380 666",
            link: "https://maps.google.com/?q=Palembang+Square+Kompleks+Pertokoan"
        },
        {
            kota: "SEMARANG",
            alamat: "Ruko S. Parman Corner Unit 5 & 6 Jl. S. Parman No. 47A, Semarang 50231",
            telepon: "(024) 850 8868",
            fax: "(024) 850 8869",
            link: "https://maps.google.com/?q=Jl.+S.+Parman+No.+47A,+Semarang"
        },
        {
            kota: "JAKARTA",
            alamat: "DBS Bank Tower LT. 14 & 20, CIPUTRA WORLD I Jl. Prof. DR. Satrio Kav. 3-5, Jakarta Selatan 12940",
            telepon: "(021) 2988 8700",
            fax: "(021) 2988 8701",
            link: "https://maps.google.com/?q=DBS+Bank+Tower+Jakarta"
        },
        {
            kota: "SURABAYA",
            alamat: "Ciputra World Office Tower - Lantai 32 Kawasan Ciputra World, Jl. Mayjen Sungkono 89, Surabaya 60224",
            telepon: "(031) 6000 9800",
            fax: "(031) 6000 7800",
            link: "https://maps.google.com/?q=Jl.+Mayjen+Sungkono+89,+Surabaya"
        },
        {
            kota: "PEKANBARU",
            alamat: "Jl. Jend. Sudirman No. 453, Pekanbaru - Riau 28116",
            telepon: "(0761) 7870018",
            fax: "(0761) 7870019",
            link: "https://maps.google.com/?q=Jl.+Jend.+Sudirman+No.+453,+Pekanbaru"
        },
        {
            kota: "BANDUNG",
            alamat: "Jl. Pajajaran No. 94, Bandung Jawa Barat 40173",
            telepon: "(022) 20599899",
            fax: "(022) 20599919",
            link: "https://maps.google.com/?q=Jl.+Pajajaran+No.+94,+Bandung"
        },
        {
            kota: "SOLO",
            alamat: "Jl. Adisucipto No. 86, Surakarta, Jawa Tengah 57144",
            telepon: "(0271) 738 111",
            fax: "(0271) 738 222",
            link: "https://maps.google.com/?q=Jl.+Adisucipto+No.+86,+Surakarta"
        },
        {
            kota: "YOGYAKARTA",
            alamat: "Malioboro City, Jl. Laksda Adisucipto KM.8, Yogyakarta 55281",
            telepon: "(0274) 280 3111",
            fax: "(0274) 280 3222",
            link: "https://maps.google.com/?q=Malioboro+City+Yogyakarta"
        },
        {
            kota: "BALIKPAPAN",
            alamat: "Jl. Jend. Sudirman No. 47, Balikpapan 76114",
            telepon: "(0542) 731 627",
            fax: "(0542) 731 513",
            link: "https://maps.google.com/?q=Jl.+Jend.+Sudirman+No.+47,+Balikpapan"
        },
        {
            kota: "SURABAYA II",
            alamat: "Pakuwon Tower - Lantai 26, Jl. Embong Malang No. 21 - 31, Surabaya 60261",
            telepon: "(031) 992 54889",
            fax: "(031) 992 49600",
            link: "https://maps.google.com/?q=Pakuwon+Tower+Embong+Malang,+Surabaya"
        }
    ];

    return (
        <PageTemplate title="Hubungi Kami">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Hubungi Kami: PT. Rifan Financindo Berjangka">
                    <div className="space-y-5 text-left">
                        <div className="space-y-5">
                            <h2 className="text-2xl uppercase font-bold">Kantor Pusat</h2>
                            <div className="">
                                <h5 className="text-lg uppercase font-medium">Jakarta</h5>
                                <a href="https://maps.google.com/?q=AXA+Tower+Kuningan+City+Lt.+23%2C+25%2C+30+%26+35%0D%0AJl.+Prof.+DR.+Satrio+Kav.+18%2C+Kuningan+Setiabudi%2C+Jakarta+12940"
                                    className="hover:underline hover:text-green-500 text-base md:text-lg">AXA Tower Kuningan City Lt. 23, 25, 30 & 35 Jl. Prof. DR. Satrio Kav. 18, Kuningan Setiabudi, Jakarta 12940</a>
                                <p><strong>Telepon:</strong> (021) 30056300</p>
                                <p><strong>Fax (AXA Tower): </strong> +62 21 3005 8500</p>
                                <p><strong>Email:</strong> <a href="mailto:info@rfb.co.id">corporate@rifan-financindo-berjangka.co.id</a></p>
                            </div>
                        </div>

                        <hr className="border-zinc-300" />

                        <div className="flex flex-col gap-3">
                            <a href="https://pengaduan.bappebti.go.id/" className="uppercase font-bold text-lg md:text-xl text-green-500 hover:text-green-600">Pengaduan Online</a>
                            <a href="mailto:corporate@rifan-financindo-berjangka.co.id" className="uppercase font-bold text-lg md:text-xl text-green-500 hover:text-green-600">Penyampaian Keluhan Online</a>
                        </div>

                        <div className="space-y-4">
                            <Header2 title="Kantor Cabang" className="font-bold text-zinc-700" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {kantorCabang.map((cabang, index) => (
                                    <CabangCard
                                        key={index}
                                        kota={cabang.kota}
                                        alamat={cabang.alamat}
                                        telepon={cabang.telepon}
                                        fax={cabang.fax}
                                        link={cabang.link}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate >
    );
}
