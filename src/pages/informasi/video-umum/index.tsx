import VideoSection from "@/components/organisms/VideoSection";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function Video() {
    return (
        <PageTemplate title="Video">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Video PT Rifan Financindo Berjangka">
                    <VideoSection />
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
