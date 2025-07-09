"use client";

import { useEffect, useRef, useState } from "react";

interface Slide {
    title: string;
    description: string;
    image: string;
}

const slides: Slide[] = [
    {
        title: "Selamat Datang di PT. Solid Gold Berjangka",
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
    const [index, setIndex] = useState(1); // start dari 1 karena clone
    const [transitioning, setTransitioning] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const goTo = (newIndex: number) => {
        setIndex(newIndex);
        setTransitioning(true);
    };

    const goToNext = () => goTo(index + 1);
    const goToPrev = () => goTo(index - 1);

    const handleTransitionEnd = () => {
        if (index === 0) {
            // ke clone belakang → reset ke slide terakhir
            setTransitioning(false);
            setTimeout(() => setIndex(totalSlides), 10); // delay 10ms
        } else if (index === fullSlides.length - 1) {
            // ke clone depan → reset ke slide pertama
            setTransitioning(false);
            setTimeout(() => setIndex(1), 10);
        }
    };

    // Autoplay hanya jika transitioning aktif
    useEffect(() => {
        if (!transitioning) return;

        timeoutRef.current = setTimeout(goToNext, 20000);
        return () => timeoutRef.current && clearTimeout(timeoutRef.current);
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
                                {items.map((item, i) => (
                                    <a
                                        key={i}
                                        href={item.link}
                                        target="_blank"
                                        className="inline-block bg-white hover:bg-gray-100 transition text-green-800 rounded-full px-5 py-3 font-semibold shadow"
                                    >
                                        {item.label}
                                    </a>
                                ))}
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
        </div>
    );
}
