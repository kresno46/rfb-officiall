import NewsCard2 from "../moleculs/NewsCard2";

export default function UmumSection() {
    const newsItems = [
        {
            title: "Tentang PT Rifan Financindo Berjangka dan Perannya dalam Perdagangan Berjangka Komoditi di Indonesia",
            date: "2022-01-01",
            content:
                "PT Rifan Financindo Berjangka (RFB) adalah perusahaan pialang berjangka terpercaya di Indonesia yang telah beroperasi selama bertahun-tahun dan menawarkan berbagai layanan perdagangan komoditi serta derivatif. RFB berkomitmen untuk menyediakan solusi investasi terbaik kepada nasabah dengan standar layanan profesional, keamanan transaksi yang terjamin, serta transparansi yang tinggi guna mendukung pertumbuhan investasi masyarakat.",
            link: "/profil/perusahaan",
        },
        {
            title: "Legalitas dan Perizinan Resmi PT Rifan Financindo Berjangka sebagai Pialang Berjangka yang Diawasi oleh Bappebti",
            date: "2022-01-01",
            content:
                "PT Rifan Financindo Berjangka telah mendapatkan izin resmi dan diawasi secara ketat oleh Badan Pengawas Perdagangan Berjangka Komoditi (Bappebti) serta merupakan anggota dari Bursa Berjangka Jakarta (BBJ) dan Kliring Berjangka Indonesia (KBI). Hal ini memberikan jaminan keamanan, transparansi, dan integritas bagi setiap transaksi nasabah, sehingga kepercayaan nasabah tetap terjaga dalam setiap aktivitas perdagangan.",
            link: "/profil/legalitas",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {newsItems.map((item, index) => (
                <NewsCard2
                    key={index}
                    date={item.date}
                    title={item.title}
                    content={item.content}
                    link={item.link}
                />
            ))}
        </div>
    );
}
