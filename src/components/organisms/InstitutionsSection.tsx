import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

const InstitutionsSection = () => {
  const { t } = useTranslation('common');

  const institutions = [
    {
      title: t('institutions.licensedAndSupervised'),
      items: [
        { 
          name: 'Bappebti', 
          url: 'https://www.bappebti.go.id/', 
          logo: '/assets/bappebti-logo.png',
          className: 'h-14 sm:h-16 md:h-20'
        },
        { 
          name: 'OJK', 
          url: 'https://ojk.go.id/', 
          logo: '/assets/logo-ojk.png',
          className: 'h-16 sm:h-20 md:h-24'
        },
        { 
          name: 'Bank Indonesia', 
          url: 'https://www.bi.go.id/', 
          logo: '/assets/logo-bankindonesia.png',
          className: 'h-10 sm:h-14 md:h-16'
        },
      ]
    },
    {
      title: t('institutions.membershipOf'),
      items: [
        { 
          name: 'JFX', 
          url: 'https://www.jfx.co.id/', 
          logo: '/assets/logo-jfx.png',
          className: 'h-16 sm:h-20 md:h-24'
        },
        { 
          name: 'KBI', 
          url: 'https://www.ptkbi.com/index.php/c_kbi_wppue_01_anggota_mitra#PL', 
          logo: '/assets/logo-kbi.png',
          className: 'h-16 sm:h-20 md:h-24'
        },
        { 
          name: 'Aspebtindo', 
          url: 'https://www.aspebtindo.org/anggota/daftar-anggota', 
          logo: '/assets/logo-aspebtindo.png',
          className: 'h-16 sm:h-20 md:h-24'
        },
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {institutions.map((section, idx) => (
        <div key={idx} className="text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1d2127] mb-6">
            {section.title}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {section.items.map((item, itemIdx) => (
              <Link 
                href={item.url} 
                key={itemIdx} 
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src={item.logo}
                  width={item.className.includes('24') ? 96 : item.className.includes('20') ? 80 : 60}
                  height={item.className.includes('24') ? 96 : item.className.includes('20') ? 80 : 60}
                  className={`${item.className} w-auto object-contain`}
                  alt={item.name}
                />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstitutionsSection;
