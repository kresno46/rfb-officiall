interface DetailBeritaProps {
    date: string;
    title: string;
    kategori: string;
    img: string;
    content: string;
}

const formatDate = (inputDate: string) => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    };
    const parsedDate = new Date(inputDate);
    return parsedDate.toLocaleDateString("id-ID", options);
};

export default function DetailBerita({ date, title, img, content, kategori }: DetailBeritaProps) {
    return (
        <div>
            <div className="mb-6 flex justify-center" >
                <img
                    src={img}
                    alt={title}
                    className="w-full max-h-100 object-cover rounded-lg shadow"
                />
            </div>

            <div className="flex items-center gap-4 mb-4">
                <div className="bg-zinc-100 w-fit px-3 py-1 rounded" >
                    <p className="text-base text-gray-500">{formatDate(date)}</p>
                </div>
                <i className="fa-solid fa-grip-lines-vertical"></i>
                <div className="bg-zinc-100 w-fit px-3 py-1 rounded" >
                    <p className="text-base text-gray-500">{kategori}</p>
                </div>
            </div>

            <div
                className="text-gray-700 text-lg leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: content }}
            ></div>
        </div>
    );
}
