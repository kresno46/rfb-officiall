import CardDetail from "../atoms/CardDetail";

interface NewsCardProps {
    title: string;
    date: string;
    content: string;
    slug: string;
}

export default function NewsCard({
    title,
    date,
    content,
    slug,
}: NewsCardProps) {

    // Fungsi untuk memotong teks tanpa memotong di tengah kata
    function stripHtml(html: string = ""): string {
        if (typeof html !== "string") return "";
        return html.replace(/<[^>]*>/g, "").trim();
    }

    function trimText(text: string = "", maxChars: number) {
        const plainText = stripHtml(text);
        return plainText.length > maxChars ? plainText.slice(0, maxChars).trim() + "..." : plainText;
    }

    const trimmedExcerpt = trimText(content, 200);  // Ubah jadi 200 atau sesuai kebutuhan

    const formatDate = (inputDate: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "long",
            year: "numeric",
        };
        const parsedDate = new Date(inputDate);
        return parsedDate.toLocaleDateString("id-ID", options);
    };

    const fullLink = `/analisis/berita/${slug}`;

    return (
        <div className="rounded-lg h-full flex flex-col bg-zinc-100 hover:bg-zinc-200 p-5 transition-all duration-300">
            <p className="text-base text-gray-500 mb-1 uppercase">{formatDate(date)}</p>
            <h3 className="text-2xl font-semibold text-green-600 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4 text-lg">{trimmedExcerpt}</p>
            <CardDetail link={fullLink} />
        </div>
    );
}
