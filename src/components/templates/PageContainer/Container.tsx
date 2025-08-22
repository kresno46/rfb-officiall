import { ReactNode } from "react";

interface ProfilContainerProps {
    children: ReactNode;
    title?: string;
    hideTitle?: boolean;
}

export default function ProfilContainer({ children, title, hideTitle = false }: ProfilContainerProps) {
    return (
        <div className="bg-white border-8 rounded-2xl border-amber-400">
            {!hideTitle && title && (
                <div>
                    <div className="text-center text-2xl md:text-3xl font-bold my-5 md:my-10">
                        <h1>{title}</h1>
                    </div>
                    <hr className="m-0" />
                </div>
            )}
            <div className="px-5 md:px-10 my-5 md:my-10">
                {children}
            </div>
        </div>
    );
}
