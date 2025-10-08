import VideoCard from "../moleculs/VideoCard";

export default function VideoSection() {
    const videoList = [
        { title: "PT Rifan Financindo Berjangka Company Profile", desc: "Video Profil Perusahaan PT Rifan Financindo Berjangka", videoUrl: "https://www.youtube.com/embed/RWDEw0kIaEI?si=GxnrdoErsgDDicfI" },
        {
            title: "PT Rifan Financindo Berjangka Company Profile", desc: "Video Profil Perusahaan PT Rifan Financindo Berjangka", videoUrl: "https://www.youtube.com/embed/RWDEw0kIaEI?si=GxnrdoErsgDDicfI"
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoList.map((item, index) => (
                <VideoCard key={index} title={item.title} description={item.desc} videoUrl={item.videoUrl} />
            ))}
        </div>
    );
}