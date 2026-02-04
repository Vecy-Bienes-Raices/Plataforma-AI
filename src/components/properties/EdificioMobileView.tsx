"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types/property";
import { ChevronLeft, TrendingUp, User, MapPin, Ruler, ShieldCheck, Share2 } from "lucide-react";

export interface EdificioMobileViewProps {
    property: Property & {
        // Datos extendidos específicos para este tipo de inmueble (mapeados de property-config.js)
        valorAdmin?: string;
        rentaMensual?: string;
        roiAnual?: string;
        detalles?: { label: string; value: string; icon: string }[];
        amenities?: { name: string; emoji: string }[];
        videoUrl?: string;
        distribucion?: { title: string; desc: string; amount?: string }[];
        caracteristicasInternas?: { name: string; emoji: string }[];
        caracteristicasExternas?: { name: string; emoji: string }[];
        sitiosCercanos?: { name: string; emoji: string; distancia?: string }[];
    };
    isSharedMode?: boolean;
    agentPhone?: string; // New Prop for Dynamic Agent Contact
}

export default function EdificioMobileView({ property, isSharedMode = false, agentPhone }: EdificioMobileViewProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showAliadoInput, setShowAliadoInput] = useState(false);
    const [aliadoPhone, setAliadoPhone] = useState("");

    // Dynamic Contact Handler
    const handleContact = () => {
        if (isSharedMode) {
            if (agentPhone) {
                // Has Agent -> WhatsApp
                window.open(`https://wa.me/${agentPhone}?text=Hola, estoy interesado en el inmueble: ${property.titulo}`, '_blank');
            } else {
                // No Agent -> Customize
                setShowAliadoInput(true);
            }
        } else {
            // Default VECY Agenda (Owner Mode)
            const params = new URLSearchParams({
                source: 'vecy_mobile_edificio',
                propiedad_id: property.id,
                titulo: property.titulo,
                precio: property.precio.toString(),
            });
            window.open(`https://vecy-agenda-pro.vercel.app/?${params.toString()}`, '_blank');
        }
    };

    const handleAliadoCustomize = () => {
        if (!aliadoPhone) {
            alert("Por favor ingresa un número válido.");
            return;
        }
        const url = new URL(window.location.href);
        url.searchParams.set('broker', aliadoPhone.replace(/\D/g, '')); // Clean number
        window.location.href = url.toString(); // Reload with new param
    };


    return (
        <div className="min-h-screen pb-24 font-['Outfit'] text-stone-200 relative">

            {/* --- CUSTOMIZATION MODAL (Mobile) --- */}
            {showAliadoInput && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
                    <div className="glass-panel p-6 w-full max-w-sm relative animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={() => setShowAliadoInput(false)}
                            className="absolute top-3 right-3 text-white/50 hover:text-white p-2"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-bold text-white mb-4 text-center">Personalizar Ficha</h3>
                        <p className="text-white/70 text-sm mb-6 text-center leading-relaxed">
                            Ingresa tu WhatsApp para que los clientes te contacten a ti directamente.
                        </p>
                        <input
                            type="tel"
                            placeholder="Ej: 3001234567"
                            value={aliadoPhone}
                            onChange={(e) => setAliadoPhone(e.target.value)}
                            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-brand-gold mb-4 text-lg text-center"
                        />
                        <button
                            onClick={handleAliadoCustomize}
                            className="w-full btn-gold text-brand-coffee-dark font-bold py-3 shadow-lg active:scale-95 transition-transform"
                        >
                            Generar Mi Enlace
                        </button>
                    </div>
                </div>
            )}


            {/* Header / Badge - Only show BRANDING if NOT shared mode */}
            {!isSharedMode && (
                <div className="p-4 pt-6">
                    <div className="glass-panel p-5 relative overflow-hidden mb-2 text-center">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-gold to-brand-orange opacity-50"></div>
                        <div className="text-brand-gold text-sm font-bold mb-2 uppercase tracking-widest animate-pulse">
                            🚀 Activo de Inversión
                        </div>
                        <h1 className="text-2xl font-bold text-white leading-tight">
                            {property.titulo}
                        </h1>
                    </div>
                </div>
            )}

            {/* If shared mode, simple spacing or title without branding */}
            {isSharedMode && (
                <div className="p-4 pt-6">
                    <h1 className="text-2xl font-bold text-white leading-tight mb-4 text-center">
                        {property.titulo}
                    </h1>
                </div>
            )}

            <div className="px-4">

                {/* Price Section */}
                <div className="glass-inner p-5 flex flex-col gap-4 mb-6 relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-emerald/20 rounded-full blur-2xl"></div>

                    <div className="relative z-10 flex justify-between items-end">
                        <div className="text-left">
                            <h2 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Precio de Venta</h2>
                            <div className="text-2xl font-bold text-white text-shadow-black tracking-tight">${property.precio.toLocaleString()}</div>
                        </div>
                        {property.rentaMensual && (
                            <div className="text-right">
                                <h2 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Renta Mensual</h2>
                                <div className="text-xl font-bold text-brand-emerald text-shadow-black">{property.rentaMensual}</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Image Gallery Slider */}
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mb-6 bg-black/40 border border-white/5">
                    <Image
                        src={property.imagenes[currentImageIndex]}
                        alt={`Vista ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Navigation Arrows */}
                    <button
                        onClick={() => setCurrentImageIndex(prev => prev === 0 ? property.imagenes.length - 1 : prev - 1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 glass-inner p-2 hover:bg-white/20 z-10"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={() => setCurrentImageIndex(prev => prev === property.imagenes.length - 1 ? 0 : prev + 1)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 glass-inner p-2 hover:bg-white/20 z-10 rotate-180"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>

                    <div className="absolute bottom-3 right-3 glass-inner px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                        {currentImageIndex + 1} / {property.imagenes.length}
                    </div>
                </div>

                {/* Thumbnails Strip */}
                <div className="flex gap-3 overflow-x-auto pb-6 mb-2 no-scrollbar px-1">
                    {property.imagenes.map((img, idx) => (
                        <div
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${currentImageIndex === idx ? 'border-brand-gold scale-105 shadow-lg shadow-brand-gold/20' : 'border-white/10 opacity-60'}`}
                        >
                            <Image src={img} alt="" fill className="object-cover" />
                        </div>
                    ))}
                </div>


                {/* Detalles Grid (Specs) */}
                <div className="flex items-center gap-2 mb-4 px-2">
                    <ShieldCheck className="w-5 h-5 text-brand-gold" />
                    <h3 className="text-lg font-bold text-white">Detalles Clave</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    {property.detalles?.map((detalle, idx) => (
                        <div key={idx} className="glass-inner p-4 flex flex-col items-center justify-center text-center gap-2">
                            <div className="text-2xl mb-1">{detalle.icon}</div>
                            <div className="text-brand-gold text-[10px] font-black uppercase tracking-widest">{detalle.label}</div>
                            <div className="text-white text-sm font-bold">{detalle.value}</div>
                        </div>
                    ))}
                    {!property.detalles && (
                        // Fallback logic
                        <>
                            <div className="glass-inner p-4 flex flex-col items-center justify-center text-center gap-2">
                                <Ruler className="w-6 h-6 text-brand-gold mb-1" />
                                <div className="text-white/50 text-xs font-bold uppercase">Área</div>
                                <div className="text-white text-sm font-bold">{property.caracteristicas.area} m²</div>
                            </div>
                            {/* Add more fallbacks if needed */}
                        </>
                    )}
                </div>

                {/* ROI Highlight Box - Always Show Financials */}
                {property.roiAnual && (
                    <div className="glass-panel p-6 mb-8 border-l-4 border-l-brand-emerald relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-emerald/10 rounded-full blur-xl"></div>
                        <h3 className="text-white font-bold mb-2 flex items-center gap-2 relative z-10">
                            <TrendingUp className="w-5 h-5 text-brand-emerald" />
                            Rentabilidad Proyectada
                        </h3>
                        <p className="text-3xl font-bold text-white relative z-10">
                            <span className="text-brand-emerald">{property.roiAnual}</span>
                        </p>
                        <p className="text-xs text-white/50 mt-2 uppercase tracking-wider relative z-10">Calculado sobre inversión total</p>
                    </div>
                )}

                {/* Video Section */}
                {property.videoUrl && (
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4 px-2">
                            <span className="text-2xl">🎥</span>
                            <h3 className="text-lg font-bold text-white">Video Recorrido</h3>
                        </div>
                        <div className="glass-inner rounded-2xl overflow-hidden aspect-video relative">
                            <iframe
                                src={property.videoUrl}
                                title="YouTube video player"
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}

                {/* Internal Characteristics */}
                {property.caracteristicasInternas && (
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4 px-2">
                            <span className="text-2xl">🛋️</span>
                            <h3 className="text-lg font-bold text-white">Distribución Interna</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {property.caracteristicasInternas.map((item, idx) => (
                                <div key={idx} className="glass-inner p-3 flex items-center gap-4">
                                    <span className="text-2xl">{item.emoji}</span>
                                    <span className="text-white font-medium">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* External Characteristics */}
                {property.caracteristicasExternas && (
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4 px-2">
                            <span className="text-2xl">🌳</span>
                            <h3 className="text-lg font-bold text-white">Entorno y Exterior</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {property.caracteristicasExternas.map((item, idx) => (
                                <div key={idx} className="glass-inner p-3 flex items-center gap-3">
                                    <span className="text-xl">{item.emoji}</span>
                                    <span className="text-white text-sm font-bold">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Points of Interest */}
                {property.sitiosCercanos && (
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4 px-2">
                            <span className="text-2xl">📍</span>
                            <h3 className="text-lg font-bold text-white">Sitios de Interés</h3>
                        </div>
                        <div className="space-y-2">
                            {property.sitiosCercanos.map((item, idx) => (
                                <div key={idx} className="glass-inner p-3 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{item.emoji}</span>
                                        <span className="text-white font-bold text-sm">{item.name}</span>
                                    </div>
                                    <span className="text-brand-gold text-xs font-bold bg-brand-gold/10 px-2 py-1 rounded-full">
                                        {item.distancia}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Location Map */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4 px-2">
                        <span className="text-2xl">🗺️</span>
                        <h3 className="text-lg font-bold text-white">Ubicación</h3>
                    </div>
                    <div className="glass-inner rounded-2xl overflow-hidden h-64 relative grayscale hover:grayscale-0 transition-all duration-500">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.696007963653!2d-74.07297592415175!3d4.648218142109405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a3a9a7c8d9b%3A0x6bd6c7b9b1b9e0a0!2sTeusaquillo%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1706123456789!5m2!1ses!2sco"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white/80 pointer-events-none">
                            Teusaquillo, Bogotá
                        </div>
                    </div>
                </div>

                {/* Description Text */}
                <div className="flex items-center gap-2 mb-4 px-2">
                    <MapPin className="w-5 h-5 text-brand-gold" />
                    <h3 className="text-lg font-bold text-white">Sobre el Inmueble</h3>
                </div>
                <div className="glass-panel p-6 mb-8 text-white/80 font-medium leading-relaxed text-sm">
                    {property.descripcion}
                </div>

                {/* CTA Flotante - Dynamic for Both Modes now */}
                <div className="fixed bottom-6 left-4 right-4 z-50 flex flex-col gap-3">
                    <button
                        onClick={handleContact}
                        className={`w-full ${isSharedMode ? 'bg-white text-stone-900 border-white' : 'btn-gold text-brand-coffee-dark border-white/20'} font-black text-lg py-3.5 shadow-xl shadow-black/50 flex items-center justify-center gap-3 uppercase tracking-wide border-2 rounded-xl`}
                    >
                        <User className="w-6 h-6" />
                        {isSharedMode && agentPhone ? "Contactar Agente" : "Agendar Visita"}
                    </button>

                    {/* Share Button - Premium Black & Gold Style */}
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert("¡Enlace copiado! Compártelo con quien quieras.");
                        }}
                        className="w-full bg-stone-950/90 backdrop-blur-md border border-brand-gold text-brand-gold font-bold py-3 shadow-[0_0_15px_rgba(197,165,114,0.3)] hover:shadow-[0_0_25px_rgba(197,165,114,0.6)] flex items-center justify-center gap-2 uppercase tracking-wide rounded-xl transition-all active:scale-95"
                    >
                        <Share2 className="w-5 h-5" />
                        Compartir
                    </button>
                </div>

                {/* Footer Links - ONLY if NOT shared mode */}
                {!isSharedMode && (
                    <div className="text-center mt-8 mb-20">
                        <Link href="/propiedades" className="glass-inner inline-flex px-4 py-2 items-center gap-2 text-white/60 text-xs font-bold hover:text-white hover:bg-white/10 transition-colors">
                            <ChevronLeft className="w-3 h-3" /> Volver al Listado
                        </Link>
                    </div>
                )}

                {/* Shared Mode Footer watermark */}
                {isSharedMode && (
                    <div className="text-center mt-12 mb-8 opacity-30">
                        <p className="text-[10px] text-white uppercase tracking-widest">Información Confidencial</p>
                    </div>
                )}

            </div>
        </div>
    );
}
