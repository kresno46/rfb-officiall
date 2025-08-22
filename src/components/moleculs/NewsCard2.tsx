import CardDetail from "../atoms/CardDetail";

interface NewsCard2Props {
    date: string;
    title: string;
    content: string;
    link: string;
}

export default function NewsCard2({ date, title, content, link }: NewsCard2Props) {
    // Fungsi format tanggal ke DD MMMM YYYY
    const formatDate = (inputDate: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "long",
            year: "numeric",
        };
        const parsedDate = new Date(inputDate);
        return parsedDate.toLocaleDateString("id-ID", options);
    };

    // Fungsi truncate
    const truncate = (text: string, maxLength: number) =>
        text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    // Fungsi hapus HTML tag
    const stripHtml = (html: string) => {
        if (!html) return "";
        return html.replace(/<[^>]+>/g, '');
    };

    return (
        <div className="flex flex-col sm:flex-row gap-8 items-center bg-zinc-100 p-4 rounded-lg shadow">
            <div className="w-full space-y-4 text-gray-700">
                <p className="font-semibold text-lg text-gray-500 uppercase">
                    {formatDate(date)}
                </p>
                <h2 className="text-lg sm:text-2xl font-semibold text-green-700 hover:text-green-600 transition">
                    {truncate(stripHtml(title), 100)}
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                    {truncate(stripHtml(content), 300)}
                </p>
                <CardDetail link={link} />
            </div>
        </div>
    );
}
