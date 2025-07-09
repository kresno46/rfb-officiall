"use client";

import { useEffect, useRef, useState } from "react";
import MarketUpdate from "./MarketUpdate";

const menuItems = [
    { label: "Beranda", href: "/" },
    {
        label: "Profil",
        submenu: [
            { label: "Profil Perusahaan", href: "/profil/perusahaan" },
            { label: "Wakil Pialang", href: "/profil/wakil-pialang" },
            { label: "Legalitas", href: "/profil/legalitas" },
            { label: "Fasilitas & Layanan", href: "/informasi/fasilitas-layanan" },
            { label: "Informasi Umum", href: "/informasi/umum" },
            { label: "Video Umum", href: "/informasi/video-umum" },
        ],
    },
    {
        label: "Produk",
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
        submenu: [
            { label: "Berita", href: "/analisis/berita" },
            { label: "Kalender Ekonomi", href: "/analisis/economic-calendar" },
            { label: "Data Historis", href: "/analisis/historical-data" },
            { label: "Pivot & Fibonacci", href: "/analisis/pivot-fibonacci" },
        ],
    },
    // {
    //     label: "Prosedur Investasi",
    //     submenu: [
    //         { label: "Prosedur Registrasi Online", href: "/prosedur/registrasi-online" },
    //         { label: "Prosedur Penarikan", href: "/prosedur/penarikan" },
    //         { label: "Petunjuk Transaksi", href: "/prosedur/petunjuk-transaksi" },
    //     ],
    // },
    // {
    //     label: "Informasi",
    //     submenu: [
    //         { label: "Umum", href: "/informasi/umum" },
    //         { label: "Video Umum", href: "/informasi/video-umum" },
    //     ],
    // },
    { label: "Hubungi Kami", href: "/hubungi-kami" },
];

export default function Navbar() {
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
            {/* Navbar utama */}
            <div className="bg-zinc-800 text-white">
                <div className="flex justify-between items-center px-3 md:px-10 lg:px-22 py-3">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-3 text-base sm:text-lg lg:text-xl font-bold">
                        <img src="/assets/logo-rfb.png" alt="Logo RFB" className="h-6 md:h-10" />
                        <span>Rifan Financindo Berjangka</span>
                    </a>

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
                                        <button
                                            onClick={() => isMobile && toggleDropdown(item.label)}
                                            className="flex items-center gap-1 text-center hover:border-b-2 border-green-700 transition"
                                        >
                                            {item.label}
                                            <i className="fa-solid fa-chevron-down text-sm mt-1" />
                                        </button>
                                        {openDropdown === item.label && (
                                            <div className="absolute top-full left-0 w-56 mt-2 z-50" onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
                                                <ul className="bg-white text-black rounded shadow">
                                                    {item.submenu.map((sub) => (
                                                        <li key={sub.href}>
                                                            <a
                                                                href={sub.href}
                                                                className="block px-4 py-2 hover:bg-gray-100"
                                                            >
                                                                {sub.label}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <a
                                        href={item.href}
                                        className="text-center hover:border-b-2 border-green-700 transition"
                                    >
                                        {item.label}
                                    </a>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Menu Mobile */}
                {menuOpen && (
                    <nav className="md:hidden px-6 pb-4 space-y-2 text-base bg-zinc-900">
                        {menuItems.map((item) => (
                            <div key={item.label}>
                                {item.submenu ? (
                                    <>
                                        <button
                                            onClick={() => toggleDropdown(item.label)}
                                            className="w-full flex justify-between items-center py-2"
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
                                                        <a
                                                            href={sub.href}
                                                            className="block py-2 text-white hover:text-green-400"
                                                            onClick={closeAllMenus}
                                                        >
                                                            {sub.label}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <a
                                        href={item.href}
                                        className="block py-2 text-white hover:text-green-400"
                                        onClick={closeAllMenus}
                                    >
                                        {item.label}
                                    </a>
                                )}
                            </div>
                        ))}
                    </nav>
                )}
            </div>

            {/* Market Update */}
            <MarketUpdate />
        </header>
    );
}