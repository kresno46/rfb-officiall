// Profil Perusahaan

import CardCategoryPialang from "@/components/atoms/CardCategoryPialang";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function WakilPialang() {
    const WakilPialangList = [
        "AXA Tower - Jakarta",
        "DBS Tower - Jakarta",
        "Medan",
        "Solo",
        "Surabaya Ciputra",
        "Balikpapan",
        "Palembang",
        "Bandung",
        "Pekanbaru",
        "Surabaya Pakuwon",
        "Semarang",
        "Yogyakarta",
    ];

    return (
        <PageTemplate title="Wakil Pialang">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Wakil Pialang">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {WakilPialangList.map((item) => (
                            <CardCategoryPialang title={item} />
                        ))}
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate >
    );
}
