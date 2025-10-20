"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { getBanners } from "@/services/bannerService";

interface Slide {
    id: number;
    title: string;
    description: string;
    image: string;
    order: number;
    is_active: boolean;
}

const items = [
    { label: "Registrasi Akun Online", link: "https://regol.rifan-financindo-berjangka.co.id/" },
    { label: "Akun Demo", link: "https://demo.rifanberjangka.com/login" },
    { label: "Akun Real", link: "https://etrade.rifanberjangka.com/login" },
];

export default function CarouselWithContent() {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [index, setIndex] = useState(1);
    const [transitioning, setTransitioning] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [agreeChecked, setAgreeChecked] = useState(false);
    const [showTnC, setShowTnC] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const bannerData = await getBanners();
                setSlides(bannerData);
            } catch (err) {
                setError('Gagal memuat banner. Silakan coba lagi nanti.');
                console.error('Error fetching banners:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBanners();
    }, []);

    const totalSlides = slides.length;

    const [canNavigate, setCanNavigate] = useState(true);
    const navigateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const goTo = useCallback((newIndex: number) => {
        if (!canNavigate || totalSlides === 0) return;
        
        // Handle infinite loop for carousel
        let nextIndex = newIndex;
        if (newIndex < 0) {
            nextIndex = totalSlides - 1;
        } else if (newIndex >= totalSlides) {
            nextIndex = 0;
        }
        
        setIndex(nextIndex);
        setTransitioning(true);
        setCanNavigate(false);
        
        // Reset navigation cooldown after animation completes
        if (navigateTimeout.current) {
            clearTimeout(navigateTimeout.current);
        }
        
        navigateTimeout.current = setTimeout(() => {
            setCanNavigate(true);
        }, 1000); // 1 second cooldown
    }, [canNavigate, totalSlides]);

    const goToNext = useCallback(() => {
        if (canNavigate) {
            goTo(index + 1);
        }
    }, [index, canNavigate, goTo]);

    const goToPrev = useCallback(() => {
        if (canNavigate) {
            goTo(index - 1);
        }
    }, [index, canNavigate, goTo]);

    const handleTransitionEnd = () => {
        setTransitioning(false);
    };

    useEffect(() => {
        if (!transitioning || totalSlides === 0) return;

        timeoutRef.current = setTimeout(goToNext, 5000);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [index, transitioning, totalSlides, goToNext]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 bg-gray-100 text-gray-700">
                Memuat banner...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64 bg-red-100 text-red-700 p-4">
                {error}
            </div>
        );
    }

    if (slides.length === 0) {
        return (
            <div className="flex justify-center items-center h-64 bg-gray-100 text-gray-700">
                Tidak ada banner yang tersedia
            </div>
        );
    }

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
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-full flex flex-col-reverse md:flex-row items-center justify-center gap-8 px-6 py-8 md:px-16 lg:px-32"
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
                                            className="inline-block bg-white hover:bg-gray-100 transition text-[#080031] rounded-full px-5 py-3 font-semibold shadow"
                                        >
                                            {item.label}
                                        </button>
                                    ) : (
                                        <a
                                            key={i}
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block bg-white hover:bg-gray-100 transition text-[#080031] rounded-full px-5 py-3 font-semibold shadow"
                                        >
                                            {item.label}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Gambar */}
                        <div className="mt-8 md:mt-0 w-full md:w-1/2 flex-shrink-0">
                            <div className="relative w-full h-[300px] md:h-[450px] lg:h-[420px]">
                                <div 
                                    className="w-full h-full bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(http://rfb-backend.test/storage/${slide.image})`,
                                    }}
                                ></div>
                            </div>
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
                        onClick={() => goTo(i)}
                        className={`h-3 w-3 rounded-full transition-all ${index === i ? "bg-white scale-110" : "bg-white/40"}`}
                    />
                ))}
            </div>

            {/* Tombol Navigasi */}
            <button
                aria-label="Previous Slide"
                onClick={goToPrev}
                disabled={!canNavigate}
                className={`absolute top-1/2 left-4 -translate-y-1/2 text-white rounded-full p-2 transition-all duration-300 ${
                    canNavigate 
                        ? 'bg-white/30 hover:bg-white/50 cursor-pointer' 
                        : 'bg-white/20 cursor-not-allowed opacity-70'
                }`}
            >
                &#10094;
            </button>
            <button
                aria-label="Next Slide"
                onClick={goToNext}
                disabled={!canNavigate}
                className={`absolute top-1/2 right-4 -translate-y-1/2 text-white rounded-full p-2 transition-all duration-300 ${
                    canNavigate 
                        ? 'bg-white/30 hover:bg-white/50 cursor-pointer' 
                        : 'bg-white/20 cursor-not-allowed opacity-70'
                }`}
            >
                &#10095;
            </button>

            {/* Modal for Terms and Conditions */}
            {showModal && !showTnC && !showPrivacy && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Syarat dan Ketentuan</h2>
                        <p className="mb-4">
                            Dengan melanjutkan, Anda menyetujui Syarat dan Ketentuan serta Kebijakan Privasi kami.
                        </p>
                        <div className="flex items-start mb-4">
                            <input
                                type="checkbox"
                                id="agree"
                                checked={agreeChecked}
                                onChange={(e) => setAgreeChecked(e.target.checked)}
                                className="mt-1 mr-2"
                            />
                            <label htmlFor="agree" className="text-sm">
                                Saya setuju dengan{' '}
                                <button 
                                    onClick={() => setShowTnC(true)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Syarat dan Ketentuan
                                </button>{' '}
                                dan{' '}
                                <button 
                                    onClick={() => setShowPrivacy(true)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Kebijakan Privasi
                                </button>
                            </label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => window.open('https://demo.rifanberjangka.com/login', '_blank')}
                                disabled={!agreeChecked}
                                className={`px-4 py-2 text-white rounded ${
                                    agreeChecked ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            >
                                Lanjutkan ke Demo
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Terms and Conditions Modal */}
            {showTnC && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Syarat dan Ketentuan</h2>
                            <button
                                onClick={() => setShowTnC(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="prose max-w-none">
                            <p>Isi syarat dan ketentuan akan ditampilkan di sini.</p>
                            <p>Pastikan untuk membaca dengan seksama sebelum melanjutkan.</p>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setShowTnC(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Kembali
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Privacy Policy Modal */}
            {showPrivacy && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Kebijakan Privasi</h2>
                            <button
                                onClick={() => setShowPrivacy(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="prose max-w-none">
                            <p>Isi kebijakan privasi akan ditampilkan di sini.</p>
                            <p>Kami menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda.</p>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setShowPrivacy(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Kembali
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
