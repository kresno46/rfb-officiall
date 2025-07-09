interface Header2Props {
    title: string;
    center?: boolean;
    className?: string;
}

export default function Header2({ title, center = false, className = "" }: Header2Props) {
    const baseClass = "text-xl text-gray-400";
    const centerClass = center ? "text-center" : "";
    return (
        <div className="flex md:items-center flex-col md:flex-row gap-3">
            <h1 className={`${baseClass} ${centerClass} ${className} uppercase`}>
                {title}
            </h1>
            <div className="h-0.5 bg-green-500 w-25 rounded-full"></div>
        </div>
    );
}
