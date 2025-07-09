import NewsCard from "@/components/moleculs/Newscard";
import Header2 from "@/components/moleculs/Header2";
import beritaList from "@/data/BeritaList";

interface BeritaSectionProps {
    limit?: number;
    showHeader?: boolean;
    className?: string;
}

export default function BeritaSection({ className, limit, showHeader = true }: BeritaSectionProps) {
    const data = typeof limit === "number" ? beritaList.slice(0, limit) : beritaList;

    return (
        <div className={`${className}`}>
            {showHeader && <Header2 title="Berita Terbaru" />}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((berita, index) => (
                    <NewsCard
                        key={index}
                        title={berita.title}
                        date={berita.date}
                        content={berita.content ?? ""}   // ← pastikan content selalu string
                        slug={berita.slug}
                    />
                ))}
            </div>
        </div>
    );
}
