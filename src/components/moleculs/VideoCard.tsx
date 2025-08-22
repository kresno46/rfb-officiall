interface VideoCardProps {
    title: string;
    description: string;
    videoUrl: string; // embed YouTube URL
}

export default function VideoCard({ title, description, videoUrl }: VideoCardProps) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-black aspect-video">
                <iframe
                    src={videoUrl}
                    title={title}
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            </div>

            <div className="p-4 text-center space-y-2">
                <h3 className="text-blue-900 font-bold text-sm sm:text-base">{title}</h3>
                <p className="text-blue-600 text-xs sm:text-sm italic">{description}</p>
            </div>
        </div>
    );
}
