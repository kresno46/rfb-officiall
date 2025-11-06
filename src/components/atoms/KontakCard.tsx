import { useTranslation } from 'next-i18next';

interface KontakCardProps {
    type: 'telepon' | 'fax' | 'email' | string;
    content: string;
}

export default function KontakCard({ type, content }: KontakCardProps) {
    const { t } = useTranslation('hubungi-kami');
    
    return (
        <div className="bg-zinc-200 rounded p-1 justify-center inline-flex gap-2 text-sm md:text-base w-full">
            <div className="font-medium">{t(`kontak.${type}`)}: </div>
            <div>{content}</div>
        </div>
    );
}