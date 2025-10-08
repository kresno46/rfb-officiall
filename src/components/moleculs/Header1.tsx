interface Header1Props {
    title: string;
    center?: boolean;
    className?: string;
}

export default function Header1({ title, center = false, className = "" }: Header1Props) {
    const centerClass = center ? "text-center" : "";
    return (
        <h1 className={`${centerClass} ${className}`}>
            {title}
        </h1>
    );
}
