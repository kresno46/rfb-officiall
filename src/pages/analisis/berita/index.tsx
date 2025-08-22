// Profil Perusahaan

import BeritaSection from "@/components/organisms/BeritaSection";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function Multilateral() {
    return (
        <PageTemplate title="Berita Terbaru">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Berita Terbaru">
                    <div className="space-y-10">
                        <BeritaSection showHeader={false} />

                        {/* Button https://www.newsmaker.id/index.php/id/ */}
                        <div className="flex justify-center">
                            <a href="https://www.newsmaker.id/index.php/id/" target="_blank" rel="noopener noreferrer"
                                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white transition-all duration-300">Lihat Berita Lainnya</a>
                        </div>
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate >
    );
}
