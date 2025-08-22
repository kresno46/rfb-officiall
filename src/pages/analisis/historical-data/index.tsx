// Historical Data Page

import HistoricalDataContent from "@/components/organisms/HistoricalDataContent";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function HistoricalData() {
    return (
        <PageTemplate title="Historical Data">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Historical Data">
                    <HistoricalDataContent />
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
