"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types/property";
import { ChevronLeft, TrendingUp, User, MapPin, Share2, Calendar, DollarSign, Camera, Search, Home, Star, Video, Phone, Wallet } from "lucide-react";
import EdificioMobileView from "@/components/properties/EdificioMobileView";
import { EdificioProps } from "@/data/edificio-teusaquillo";
import DesktopGallery from "@/components/properties/DesktopGallery";

type Props = {
    property: Property;
    mode?: string;
    brokerPhone?: string;
};

export default function PropertyDetailClient({
    property,
    mode,
    brokerPhone
}: Props) {
    const [showShareModal, setShowShareModal] = useState(false);
    const [showAliadoInput, setShowAliadoInput] = useState(false);
    const [aliadoPhone, setAliadoPhone] = useState("");

    const isAliadoMode = mode === 'aliado';
    const isEdificio = property.tipoInmueble === 'Edificio';
    const edificio = property as unknown as EdificioProps;

    // --- HANDLERS ---
    const handleShareClick = () => {
        setShowShareModal(true);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("¡Enlace copiado al portapapeles!");
        setShowShareModal(false);
    };

    const generateDirectLink = () => {
        const url = new URL(window.location.origin + window.location.pathname);
        copyToClipboard(url.toString());
    };

    const generateAliadoLink = () => {
        const baseUrl = window.location.origin + window.location.pathname;
        const aliadoUrl = `${baseUrl}?mode=aliado`;

        const formatPrice = (price: number) => {
            return `$${price.toLocaleString('es-CO')} COP`;
        };

        const shareText = `🏢 *${property.titulo.toUpperCase()}*

💰 *Precio:* ${formatPrice(property.precio)}
📍 *Ubicación:* ${property.ubicacion.barrio || property.ubicacion.ciudad}
📏 *Área:* ${property.caracteristicas.area} m²
🏠 *Detalles:* ${property.caracteristicas.habitaciones} hab, ${property.caracteristicas.banos} baños, ${property.caracteristicas.garajes} garajes

${property.descripcion}

🔗 *Ver Fotos y Ficha Técnica:*
${aliadoUrl}`;

        copyToClipboard(shareText);
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleAliadoCustomize = () => {
        if (!aliadoPhone) {
            alert("Por favor ingresa un número válido.");
            return;
        }
        const url = new URL(window.location.href);
        url.searchParams.set('broker', aliadoPhone.replace(/\D/g, ''));
        window.location.href = url.toString();
    };

    if (isEdificio) {
        return (
            <>
                {/* 1. Share Modal */}
                {showShareModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <div className="glass-panel p-8 max-w-md w-full relative">
                            <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">✕</button>
                            <h3 className="text-2xl font-bold text-white mb-6 text-center">Compartir Ficha Técnica</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button onClick={generateDirectLink} className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center overflow-hidden">
                                    <div className="absolute inset-0 bg-brand-gold/5 group-hover:bg-brand-gold/10 transition-colors" />
                                    <div className="p-4 bg-brand-gold/20 rounded-full text-brand-gold group-hover:scale-110 transition-transform duration-300"><User className="w-8 h-8" /></div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-1">Cliente Directo</h4>
                                        <p className="text-white/50 text-xs">Enlace estándar para clientes finales</p>
                                    </div>
                                </button>
                                <button onClick={generateAliadoLink} className="group relative p-6 rounded-2xl border border-brand-gold/30 bg-gradient-to-br from-black/40 to-brand-gold/10 hover:border-brand-gold/60 transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center overflow-hidden shadow-lg hover:shadow-brand-gold/20">
                                    <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="p-4 bg-brand-gold rounded-full text-brand-coffee-dark group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(212,175,55,0.4)]"><Share2 className="w-8 h-8" /></div>
                                    <div>
                                        <h4 className="text-brand-gold font-bold text-lg mb-1">Para Aliados</h4>
                                        <p className="text-white/50 text-xs">Sin datos de contacto (Marca Blanca)</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. Aliado Input Modal */}
                {showAliadoInput && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <div className="glass-panel p-8 max-w-sm w-full relative">
                            <button onClick={() => setShowAliadoInput(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">✕</button>
                            <h3 className="text-xl font-bold text-white mb-4 text-center">Personalizar Ficha</h3>
                            <p className="text-white/70 text-sm mb-6 text-center">Ingresa tu número de WhatsApp para generar un enlace que redirija a tus clientes directamente a ti.</p>
                            <input type="tel" placeholder="Ej: 3001234567" value={aliadoPhone} onChange={(e) => setAliadoPhone(e.target.value)} className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 mb-4" />
                            <button onClick={handleAliadoCustomize} className="w-full btn-gold text-brand-coffee-dark font-bold py-3">Generar Mi Enlace</button>
                        </div>
                    </div>
                )}

                {/* Mobile View */}
                <div className="md:hidden">
                    <EdificioMobileView property={edificio} isSharedMode={isAliadoMode} agentPhone={brokerPhone} />
                </div>

                {/* Desktop View */}
                <div className="hidden md:block min-h-screen pb-20 relative">
                    <div className="relative h-[85vh] w-full mt-[-80px]">
                        <Image src={edificio.imagenes[0]} alt={edificio.titulo} fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-transparent to-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
                        {!isAliadoMode && (
                            <div className="absolute top-28 left-6 md:top-32 md:left-10 z-20">
                                <Link href="/propiedades" className="glass-inner px-4 py-2 flex items-center gap-2 text-white hover:bg-white/10 backdrop-blur-md rounded-full text-sm font-bold">
                                    <ChevronLeft className="w-4 h-4" /> Volver
                                </Link>
                            </div>
                        )}
                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 bg-gradient-to-t from-[#1c1917] to-transparent pt-32">
                            <div className="max-w-7xl mx-auto">
                                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4 ${property.tipo === 'Venta' ? 'bg-brand-emerald text-white' : 'bg-brand-gold text-brand-coffee-dark'}`}>{property.tipo}</span>
                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">{edificio.titulo}</h1>
                                <div className="flex items-center text-white/90 text-xl font-medium"><MapPin className="w-6 h-6 mr-2 text-brand-gold" />{edificio.ubicacion.direccion}, {edificio.ubicacion.barrio}, {edificio.ubicacion.ciudad}</div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-8 space-y-10">
                                {edificio.rentaMensual && (
                                    <div className="bg-brand-emerald rounded-3xl p-6 shadow-lg transform hover:scale-[1.01] transition-transform">
                                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white/20 rounded-full text-white"><DollarSign className="w-8 h-8" /></div>
                                                <div><p className="text-white/80 text-sm font-bold uppercase tracking-wide">Precio de Venta</p><p className="text-3xl font-extrabold text-white">${property.precio.toLocaleString()}</p></div>
                                            </div>
                                            <div className="h-px w-full md:w-px md:h-16 bg-white/20"></div>
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white/20 rounded-full text-white"><TrendingUp className="w-8 h-8" /></div>
                                                <div><p className="text-white/80 text-sm font-bold uppercase tracking-wide">Renta Mensual Actual</p><p className="text-3xl font-extrabold text-white">{edificio.rentaMensual}</p></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="space-y-4">
                                    <div className="bg-brand-orange py-2 px-6 rounded-t-2xl inline-block">
                                        <h3 className="text-white font-bold flex items-center gap-2"><Camera className="w-5 h-5" /> Galería de Fotos</h3>
                                    </div>
                                    <DesktopGallery images={edificio.imagenes} title={edificio.titulo} />
                                </div>
                                <div className="space-y-4 pt-6">
                                    <div className="bg-brand-orange py-2 px-6 rounded-t-2xl inline-block">
                                        <h3 className="text-white font-bold flex items-center gap-2"><Search className="w-5 h-5" /> Detalles del Edificio</h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {edificio.detalles?.map((item, idx) => (
                                            <div key={idx} className="glass-panel p-4 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/10 transition-colors border border-white/5">
                                                <span className="text-3xl">{item.icon}</span>
                                                <span className="text-white/50 text-xs font-bold uppercase tracking-wider">{item.label}</span>
                                                <span className="text-white font-bold text-lg leading-tight">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4 pt-6">
                                    <h2 className="text-2xl font-bold text-white border-l-4 border-brand-gold pl-4">Descripción</h2>
                                    <div className="glass-panel p-8"><p className="text-lg leading-relaxed text-stone-300 font-light">{property.descripcion}</p></div>
                                </div>
                                {edificio.caracteristicasInternas && (
                                    <div className="space-y-4 pt-6">
                                        <div className="bg-brand-orange py-2 px-6 rounded-t-2xl inline-block">
                                            <h3 className="text-white font-bold flex items-center gap-2"><Home className="w-5 h-5" /> Distribución</h3>
                                        </div>
                                        <div className="glass-panel p-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                                {edificio.caracteristicasInternas.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                                        <span className="text-2xl">{item.emoji}</span>
                                                        <span className="text-white font-medium text-lg">{item.name}</span>
                                                    </div>
                                                ))}
                                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                                    <span className="text-2xl">⚡</span>
                                                    <span className="text-white font-medium text-lg">Cableado Estructurado</span>
                                                </div>
                                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                                    <span className="text-2xl">⭐</span>
                                                    <span className="text-white font-medium text-lg">Acabados Triple AAA</span>
                                                </div>
                                            </div>

                                            <div className="mt-6 p-4 bg-brand-gold/20 border border-brand-gold/30 rounded-xl">
                                                <h4 className="flex items-center gap-2 text-brand-gold font-bold mb-2">
                                                    <Star className="w-5 h-5" /> Destacado
                                                </h4>
                                                <p className="text-white/90 text-sm leading-relaxed">
                                                    Propiedad de <strong>Inversión Híbrida</strong>: Combina la estabilidad de contratos a largo plazo (Local, Clínica, Oficinas) con el <strong>alto flujo de caja</strong> del modelo Airbnb/Coliving en los pisos superiores. ¡Versatilidad única en el sector!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {edificio.roiDetails && (
                                    <div className="space-y-4 pt-6">
                                        <div className="bg-[#C5A572] py-2 px-6 rounded-t-2xl inline-block text-stone-900">
                                            <h3 className="font-bold flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Análisis de Rentabilidad</h3>
                                        </div>
                                        <div className="glass-panel p-8 bg-[#C5A572]/10 border-brand-gold/20">
                                            <div className="space-y-4">
                                                <h4 className="text-brand-gold font-bold flex items-center gap-2"><DollarSign className="w-5 h-5" /> Ingresos Mensuales:</h4>
                                                <ul className="space-y-2 pl-4">
                                                    {edificio.roiDetails.list.map((item, idx) => (
                                                        <li key={idx} className="text-white text-lg flex items-start gap-2"><span className="text-brand-gold mt-1.5">•</span> {item}</li>
                                                    ))}
                                                </ul>
                                                <div className="py-4 border-t border-dashed border-white/10 mt-4 text-2xl font-bold text-green-400 flex items-center gap-2"><Wallet className="w-6 h-6" /> TOTAL: {edificio.roiDetails.total}</div>
                                            </div>
                                            <div className="mt-6 bg-brand-emerald/20 p-4 rounded-xl border border-brand-emerald/30 text-center font-bold text-brand-emerald text-xl uppercase tracking-widest">ROI ACTUAL: {edificio.roiAnual}</div>
                                        </div>
                                    </div>
                                )}
                                {edificio.videoUrl && (
                                    <div className="space-y-4 pt-6">
                                        <div className="bg-brand-orange py-2 px-6 rounded-t-2xl inline-block"><h3 className="text-white font-bold flex items-center gap-2"><Video className="w-5 h-5" /> Recorrido Virtual</h3></div>
                                        <div className="relative aspect-video rounded-3xl overflow-hidden glass-inner border border-white/5 shadow-2xl"><video src={edificio.videoUrl} className="w-full h-full object-cover" controls playsInline poster={edificio.imagenes[0]} /></div>
                                    </div>
                                )}
                                <div className="space-y-4 pt-6">
                                    <div className="glass-inner rounded-3xl overflow-hidden h-96 relative grayscale hover:grayscale-0 transition-all duration-500 border border-white/5 shadow-xl">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.696007963653!2d-74.07297592415175!3d4.648218142109405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bdc3da62547%3A0x103d085958763560!2sBarrio%20San%20Luis%2C%20Teusaquillo%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1706123456789!5m2!1ses!2sco" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
                                    </div>
                                </div>

                                {/* FOOTER CTA */}
                                <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-stone-800 to-stone-900 border border-white/10 text-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-brand-gold/5 group-hover:bg-brand-gold/10 transition-colors duration-500"></div>
                                    <h3 className="text-2xl font-bold text-white mb-2 relative z-10">¿Buscas una inversión sólida con alta rentabilidad?</h3>
                                    <p className="text-brand-gold font-bold flex items-center justify-center gap-2 text-lg relative z-10">
                                        <Phone className="w-5 h-5 animate-bounce" /> Agenda tu visita hoy mismo
                                    </p>
                                </div>
                            </div>

                            <div className="lg:col-span-4 space-y-6">
                                <div className="glass-panel p-6 sticky top-24">
                                    <span className="text-white/50 text-sm font-medium uppercase block mb-2">Valor de Inversión</span>
                                    <div className="text-4xl font-bold text-white mb-6">${property.precio.toLocaleString()}</div>
                                    <button
                                        onClick={() => {
                                            if (!isAliadoMode) {
                                                const params = new URLSearchParams({ source: 'vecy_plataforma', propiedad_id: property.id, titulo: property.titulo });
                                                window.open(`https://vecy-agenda-pro.vercel.app/?${params.toString()}`, '_blank');
                                            } else {
                                                if (brokerPhone) {
                                                    window.open(`https://wa.me/${brokerPhone}?text=Hola, estoy interesado en ${property.titulo}`, '_blank');
                                                } else {
                                                    setShowAliadoInput(true);
                                                }
                                            }
                                        }}
                                        className="w-full btn-gold text-stone-900 font-extrabold mb-4 flex items-center justify-center gap-2"
                                    >
                                        <Calendar className="w-5 h-5" /> {(isAliadoMode && !brokerPhone) ? "Personalizar Ficha" : "Agendar Visita"}
                                    </button>
                                    {(!isAliadoMode || (isAliadoMode && brokerPhone)) && (
                                        <button
                                            onClick={() => isAliadoMode ? copyToClipboard(window.location.href) : handleShareClick()}
                                            className="w-full bg-stone-950 border border-brand-gold text-brand-gold py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center active:scale-95 mt-2 hover:bg-stone-900"
                                            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 15px #FFD700, 0 0 30px #CCAC4E'; e.currentTarget.style.borderColor = '#FFF'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#CCAC4E'; }}
                                        >
                                            <Share2 className="w-5 h-5 mr-2" /> {isAliadoMode ? "Compartir Mi Ficha" : "Compartir Ficha Técnica"}
                                        </button>
                                    )}
                                    <div className="mt-8 pt-6 border-t border-white/10 text-white/40 text-xs text-center">Referencia: {property.id} <br /> {!isAliadoMode && "Gestionado por VECY Platform"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {!isAliadoMode && (
                    <div className="fixed bottom-6 right-6 z-50">
                        <a href="https://wa.me/573166569719" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-xl hover:scale-110 transition-transform relative group">
                            <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l121.7-31.9c32.4 17.8 68.9 27.2 106.4 27.2h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                            <span className="absolute right-16 px-3 py-1 bg-white text-[#25D366] font-bold rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity text-sm">¡Escríbenos!</span>
                        </a>
                    </div>
                )}
            </>
        );
    }

    return (
        <div className="min-h-screen pb-20 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-white text-3xl font-bold">Inmueble: {property.titulo}</h1>
                <p className="text-white/60 mb-6">Esta vista se está cargando con datos reales.</p>
                <Link href="/propiedades" className="btn-gold">Volver al listado</Link>
            </div>
        </div>
    );
}
