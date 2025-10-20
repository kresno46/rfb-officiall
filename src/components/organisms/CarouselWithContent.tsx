"use client";

import { useEffect, useRef, useState } from "react";
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
    const fullSlides = totalSlides > 0 
        ? [slides[totalSlides - 1], ...slides, slides[0]]
        : [];

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
        if (!transitioning || fullSlides.length === 0) return;

        timeoutRef.current = setTimeout(goToNext, 5000);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [index, transitioning, fullSlides.length]);

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
                    transition: transitioning ? 'transform 0.5s ease-in-out' : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {fullSlides.map((slide, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-full flex flex-col-reverse md:flex-row items-center justify-center gap-8 px-6 py-12 md:px-32"
                        style={{
                            backgroundImage: `url(http://rfb-backend.test/storage/${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="text-center md:text-left max-w-xl bg-black bg-opacity-50 p-6 rounded-lg">
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
                                            rel="noopener noreferrer"
                                            className="inline-block bg-white hover:bg-gray-100 transition text-green-800 rounded-full px-5 py-3 font-semibold shadow"
                                        >
                                            {item.label}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i + 1)}
                        className={`h-3 w-3 rounded-full transition-all ${index === i + 1 ? 'bg-white scale-110' : 'bg-white/40'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrev}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2"
                aria-label="Previous slide"
            >
                ❮
            </button>
            <button
                onClick={goToNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2"
                aria-label="Next slide"
            >
                ❯
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
