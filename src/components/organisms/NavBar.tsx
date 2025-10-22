"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import MarketUpdate from "./MarketUpdate";
import LocaleLink from "@/components/common/LocaleLink";

type MenuItem = {
  label: string;
  href: string;
  submenu?: Array<{
    label: string;
    href: string;
  }>;
};

const NavBar = () => {
  const router = useRouter();
  const { locale } = router;
  
  const menuItems: MenuItem[] = [
    { label: "Beranda", href: "/" },
    {
      label: "Profil",
      href: "/profil",
      submenu: [
        { label: "Profil Perusahaan", href: "/profil/perusahaan" },
        { label: "Wakil Pialang", href: "/profil/wakil-pialang" },
        { label: "Legalitas", href: "/profil/legalitas" },
        { label: "Fasilitas & Layanan", href: "/informasi/fasilitas-layanan" },
        { label: "Informasi Umum", href: "/informasi/umum" },
        { label: "Video Umum", href: "/informasi/video-umum" },
        { label: "Karier", href: "/careers" },
      ],
    },
    {
      label: "Produk",
      href: "/produk",
      submenu: [
        { label: "Produk Multilateral (JFX)", href: "/produk/JFX" },
        { label: "Produk Bilateral (SPA)", href: "/produk/SPA" },
        { label: "Prosedur Registrasi Online", href: "/prosedur/registrasi-online" },
        { label: "Prosedur Penarikan", href: "/prosedur/penarikan" },
        { label: "Petunjuk Transaksi", href: "/prosedur/petunjuk-transaksi" },
      ],
    },
    {
      label: "Analisis",
      href: "/analisis",
      submenu: [
        { label: "Berita", href: "/analisis/berita" },
        { label: "Kalender Ekonomi", href: "/analisis/economic-calendar" },
        { label: "Data Historis", href: "/analisis/historical-data" },
        { label: "Pivot & Fibonacci", href: "/analisis/pivot-fibonacci" },
      ],
    },
    { label: "Hubungi Kami", href: "/hubungi-kami" },
  ];

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const handleMouseEnter = (label: string) => {
    if (!isMobile) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setOpenDropdown(label);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setOpenDropdown(null);
      }, 200); // delay close
    }
  };

  const closeAllMenus = () => {
    setOpenDropdown(null);
    setMenuOpen(false);
  };


  return (
    <header className="sticky top-0 z-40">
      <div className="bg-zinc-800 text-white">
        <div className="flex justify-between items-center px-3 md:px-10 lg:px-22 py-3">
          {/* Logo */}
          <LocaleLink 
            href="/" 
            className="flex items-center gap-3 text-base sm:text-lg lg:text-xl font-bold"
          >
            <img src="/assets/logo-rfb.png" alt="Logo RFB" className="h-6 md:h-10" />
            <span>Rifan Financindo Berjangka</span>
          </LocaleLink>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} />
          </button>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-6 text-base">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.submenu ? (
                  <>
                    <div className="flex items-center">
                      <LocaleLink
                        href={item.href}
                        className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {item.label}
                      </LocaleLink>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="px-1 focus:outline-none"
                      >
                        <i className="fa-solid fa-chevron-down text-sm" />
                      </button>
                    </div>
                    {openDropdown === item.label && (
                      <div 
                        className="absolute top-full left-0 w-56 mt-2 z-50" 
                        onMouseEnter={() => handleMouseEnter(item.label)} 
                        onMouseLeave={handleMouseLeave}
                      >
                        <ul className="bg-white text-black rounded shadow">
                          {item.submenu.map((sub) => (
                            <li key={sub.href}>
                              <LocaleLink 
                                href={sub.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={closeAllMenus}
                              >
                                {sub.label}
                              </LocaleLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <LocaleLink
                    href={item.href}
                    className="text-center hover:border-b-2 border-green-700 transition text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={closeAllMenus}
                  >
                    {item.label}
                  </LocaleLink>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden px-6 pb-4 space-y-2 text-base bg-zinc-900">
            {menuItems.map((item) => (
              <div key={item.label}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="w-full flex justify-between items-center py-2 text-white"
                    >
                      {item.label}
                      <i
                        className={`fa-solid fa-chevron-down transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <ul className="pl-4">
                        {item.submenu.map((sub) => (
                          <li key={sub.href}>
                            <LocaleLink
                              href={sub.href}
                              className="block py-2 text-white hover:text-green-400"
                              onClick={closeAllMenus}
                            >
                              {sub.label}
                            </LocaleLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <LocaleLink
                    href={item.href}
                    className="block py-2 text-white hover:text-green-400"
                    onClick={closeAllMenus}
                  >
                    {item.label}
                  </LocaleLink>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
      <MarketUpdate />
    </header>
  );
}

export default NavBar;