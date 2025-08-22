import CardFasilitas from "@/components/moleculs/CardFasilitas";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";
import items from "@/data/FasilitasLayanan";

export default function FasilitasLayanan() {
    return (
        <PageTemplate title="Fasilitas & Layanan">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Fasilitas & Layanan">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {items.map((item, index) => (
                            <CardFasilitas key={index} title={item.title} content={item.content} />
                        ))}
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    )
}