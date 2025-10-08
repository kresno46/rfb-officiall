// Profil Perusahaan

import ProdukContainer2 from "@/components/organisms/ProdukContainerMultilateral";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function Multilateral() {
    return (
        <PageTemplate title="404 Not Found - PT Solid Gold Berjangka">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer hideTitle={true}>
                    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
                        <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Halaman Tidak Ditemukan</h2>
                        <p className="text-gray-600 mb-6">
                            Maaf, halaman yang kamu cari tidak tersedia atau telah dipindahkan.
                        </p>
                        <a href="/" className="text-white bg-green-700 px-6 py-3 rounded hover:bg-green-800 transition">
                            Kembali ke Beranda
                        </a>
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate >
    );
}
