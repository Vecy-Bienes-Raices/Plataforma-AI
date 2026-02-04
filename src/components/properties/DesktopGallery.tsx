"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DesktopGalleryProps {
    images: string[];
    title: string;
}

export default function DesktopGallery({ images, title }: DesktopGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div className="space-y-4">
            {/* Main Image Stage */}
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden glass-panel group border border-white/10 shadow-2xl">
                <Image
                    src={images[currentIndex]}
                    alt={`${title} - Vista ${currentIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                />

                {/* Navigation Arrows (Visible on Hover) */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="pointer-events-auto w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-coffee-dark transition-all transform hover:scale-110"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="pointer-events-auto w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-coffee-dark transition-all transform hover:scale-110"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Counter Badge */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white/90 text-xs font-bold tracking-wider border border-white/10">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails Strip */}
            <div className="relative">
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`relative min-w-[100px] h-[70px] rounded-xl overflow-hidden border-2 transition-all duration-300 snap-start flex-shrink-0 ${currentIndex === idx
                                ? 'border-brand-gold scale-105 shadow-lg shadow-brand-gold/20 opacity-100'
                                : 'border-transparent opacity-50 hover:opacity-100 hover:border-white/20'
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`Miniatura ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
