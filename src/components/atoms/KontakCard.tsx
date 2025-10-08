interface KontakCardProps {
    title: string;
    content: string;
}

export default function KontakCard({ title, content }: KontakCardProps) {
    return (
        <div className="bg-zinc-200 rounded p-1 justify-center inline-flex gap-2 text-sm md:text-base w-full">
            <div className="font-medium">{title}: </div>
            <div>{content}</div>
        </div>
    );
}