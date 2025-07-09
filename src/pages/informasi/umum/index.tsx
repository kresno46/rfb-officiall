
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PengumumanHome from "@/components/organisms/Pengumuman";

export default function InformasiUmum() {
    return (
        <PageTemplate title="Informasi Umum">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Informasi Umum">
                    <PengumumanHome showHeader={false} />
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
