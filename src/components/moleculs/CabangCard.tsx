import KontakCard from "../atoms/KontakCard";

interface CabangCardProps {
    kota: string;
    alamat: string;
    telepon: string;
    fax: string;
    link: string;
}


export default function CabangCard({ kota, alamat, telepon, fax, link }: CabangCardProps) {
    return (
        <a href={link} className="bg-white rounded-xl shadow hover:shadow-lg p-5 border border-zinc-200 hover:border-green-500 flex flex-col h-full transition-all duration-300">
            <h5 className="text-lg uppercase font-bold text-zinc-700 mb-2">{kota}</h5>
            <p className="mb-4">
                {alamat}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
                <KontakCard title="Telepon" content={telepon} />
                <KontakCard title="Fax" content={fax} />
            </div>
        </a>
    );
}
