import { ReactNode } from "react";

interface CardFasilitasProps {
    title: string;
    content: string | ReactNode;
}

export default function CardFasilitas({ title, content }: CardFasilitasProps) {
    return (
        <div className="bg-gray-50 p-6 rounded-2xl shadow border border-zinc-200 hover:border-green-500 hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-bold text-gray-800 mb-3">{title}</h2>
            <div className="text-gray-700 text-justify leading-relaxed text-base">
                {content}
            </div>
        </div>
    );
}
