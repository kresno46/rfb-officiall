"use client";

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { locale } = router;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const { pathname, asPath, query } = router;
    
    // Navigasi ke halaman yang sama dengan locale baru
    router.push(
      { pathname, query },
      asPath,
      { locale: newLocale }
    );
  };

  return (
    <div className="text-white">
      <select
        value={locale || 'id'}
        onChange={handleLanguageChange}
        className="border border-white rounded bg-transparent px-2 py-1 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-white cursor-pointer"
      >
        <option className="text-black" value="id">
          🇮🇩 {t('indonesian')}
        </option>
        <option className="text-black" value="en">
          🇬🇧 {t('english')}
        </option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
