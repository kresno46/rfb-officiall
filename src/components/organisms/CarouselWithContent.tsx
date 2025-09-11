"use client";

import { useEffect, useRef, useState } from "react";

interface Slide {
    title: string;
    description: string;
    image: string;
}

const slides: Slide[] = [
    {
        title: "Selamat Datang di PT. Rifan Financindo Berjangka",
        description: "Pialang berjangka terpercaya untuk masa depan keuangan Anda.",
        image: "/assets/corousel-1.png",
    },
    {
        title: "Solusi Investasi Profesional",
        description: "Kami hadir untuk membantu Anda meraih masa depan finansial yang lebih baik.",
        image: "/assets/corousel-2.png",
    },
    {
        title: "Layanan Konsultasi Eksklusif",
        description: "Didukung oleh analis berpengalaman dan teknologi modern.",
        image: "/assets/corousel-3.png",
    },
];

const items = [
    { label: "Registrasi Akun Online", link: "https://regol.rifan-financindo-berjangka.co.id/" },
    { label: "Akun Demo", link: "https://demo.rifanberjangka.com/login" },
    { label: "Akun Real", link: "https://etrade.rifanberjangka.com/login" },
];

const totalSlides = slides.length;
const fullSlides = [slides[totalSlides - 1], ...slides, slides[0]];

export default function CarouselWithContent() {
    const [index, setIndex] = useState(1);
    const [transitioning, setTransitioning] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [showModal, setShowModal] = useState(false);
    const [agreeChecked, setAgreeChecked] = useState(false);
    const [showTnC, setShowTnC] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);

    const goTo = (newIndex: number) => {
        setIndex(newIndex);
        setTransitioning(true);
    };

    const goToNext = () => goTo(index + 1);
    const goToPrev = () => goTo(index - 1);

    const handleTransitionEnd = () => {
        if (index === 0) {
            setTransitioning(false);
            setTimeout(() => setIndex(totalSlides), 10);
        } else if (index === fullSlides.length - 1) {
            setTransitioning(false);
            setTimeout(() => setIndex(1), 10);
        }
    };

    useEffect(() => {
        if (!transitioning) return;

        timeoutRef.current = setTimeout(goToNext, 20000);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [index, transitioning]);

    return (
        <div className="relative w-full overflow-hidden text-white">
            <div
                className="flex"
                style={{
                    transform: `translateX(-${index * 100}%)`,
                    transition: transitioning ? "transform 2s ease-in-out" : "none",
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {fullSlides.map((slide, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-full flex flex-col-reverse md:flex-row items-center justify-center gap-8 px-6 py-12 md:px-32"
                    >
                        {/* Teks */}
                        <div className="text-center md:text-left max-w-xl">
                            <h1 className="text-2xl md:text-4xl font-bold mb-4">{slide.title}</h1>
                            <p className="text-base md:text-lg mb-6">{slide.description}</p>
                            <div className="flex flex-col md:flex-row gap-3">
                                {items.map((item, i) => {
                                    const isDemo = item.label === "Akun Demo";
                                    return isDemo ? (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setShowModal(true);
                                                setAgreeChecked(false);
                                            }}
                                            className="inline-block bg-white hover:bg-gray-100 transition text-green-800 rounded-full px-5 py-3 font-semibold shadow"
                                        >
                                            {item.label}
                                        </button>
                                    ) : (
                                        <a
                                            key={i}
                                            href={item.link}
                                            target="_blank"
                                            className="inline-block bg-white hover:bg-gray-100 transition text-green-800 rounded-full px-5 py-3 font-semibold shadow"
                                        >
                                            {item.label}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Gambar */}
                        <div className="mt-8 md:mt-0">
                            <img src={slide.image} alt={slide.title} className="h-100 md:h-120 w-auto object-contain" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        aria-label={`Slide ${i + 1}`}
                        onClick={() => goTo(i + 1)}
                        className={`h-3 w-3 rounded-full transition-all ${index === i + 1 ? "bg-white scale-110" : "bg-white/40"}`}
                    />
                ))}
            </div>

            {/* Tombol Navigasi */}
            <button
                aria-label="Previous Slide"
                onClick={goToPrev}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2"
            >
                &#10094;
            </button>
            <button
                aria-label="Next Slide"
                onClick={goToNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2"
            >
                &#10095;
            </button>

            {/* Main Modal */}
            {showModal && !showTnC && !showPrivacy && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white text-black rounded-lg p-6 w-11/12 max-w-md shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Syarat Penggunaan</h2>
                        <p className="mb-4 text-sm">
                            Harap centang kotak di bawah ini untuk melanjutkan ke halaman akun demo.
                        </p>

                        <div className="flex items-start gap-2 mb-6">
                            <input
                                type="checkbox"
                                id="agree"
                                checked={agreeChecked}
                                onChange={(e) => setAgreeChecked(e.target.checked)}
                                className="mt-1"
                            />
                            <label htmlFor="agree" className="text-sm">
                                Saya telah membaca dan menyetujui{" "}
                                <button
                                    onClick={() => setShowTnC(true)}
                                    className="text-green-700 underline hover:text-green-900"
                                >
                                    Syarat dan Ketentuan
                                </button>{" "}
                                serta{" "}
                                <button
                                    onClick={() => setShowPrivacy(true)}
                                    className="text-green-700 underline hover:text-green-900"
                                >
                                    Kebijakan Privasi
                                </button>.
                            </label>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                            >
                                Batal
                            </button>
                            <button
                                disabled={!agreeChecked}
                                onClick={() => {
                                    window.open("https://demo.rifanberjangka.com/login", "_blank");
                                    setShowModal(false);
                                }}
                                className={`px-4 py-2 rounded text-white ${
                                    agreeChecked ? "bg-green-600 hover:bg-green-700" : "bg-green-300 cursor-not-allowed"
                                }`}
                            >
                                Lanjut ke Demo
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TnC Modal */}
            {showTnC && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white text-black rounded-lg p-6 w-11/12 max-w-md shadow-lg relative">
                        <button
                            className="absolute top-2 right-3 text-lg font-bold"
                            onClick={() => setShowTnC(false)}
                        >
                            ×
                        </button>
                        <h3 className="text-lg font-semibold mb-2">Syarat dan Ketentuan</h3>
                        <p className="text-sm mb-4">
                            Ini adalah teks dummy untuk syarat dan ketentuan penggunaan akun demo. Silakan baca dengan seksama.
                        </p>
                    </div>
                </div>
            )}

            {/* Privacy Policy Modal */}
            {showPrivacy && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white text-black rounded-lg p-6 w-11/12 max-w-md shadow-lg relative">
                        <button
                            className="absolute top-2 right-3 text-lg font-bold"
                            onClick={() => setShowPrivacy(false)}
                        >
                            ×
                        </button>
                        <h3 className="text-lg font-semibold mb-2">Kebijakan Privasi</h3>
                        <p className="text-sm mb-4">
                            Ini adalah teks dummy untuk kebijakan privasi. Informasi Anda akan dijaga dengan aman sesuai kebijakan kami.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
