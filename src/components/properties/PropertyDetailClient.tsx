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
                        <div className="relative group">
                            {/* Pulse Effect */}
                            <div className="absolute inset-0 bg-brand-emerald rounded-full animate-ping opacity-20 duration-1000"></div>
                            <div className="absolute inset-0 bg-brand-emerald rounded-full animate-pulse opacity-40"></div>

                            <a
                                href="https://wa.me/573166569719?text=Hola,%20estoy%20interesado%20en%20una%20propiedad%20de%20VECY"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative flex items-center justify-center w-16 h-16 bg-brand-emerald rounded-full shadow-[0_4px_20px_rgba(13,187,131,0.4)] hover:shadow-[0_6px_25px_rgba(13,187,131,0.6)] hover:scale-105 transition-all duration-300 border-2 border-white/20"
                            >
                                <svg className="w-9 h-9 text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>

                                {/* Tooltip */}
                                <div className="absolute right-full mr-4 px-4 py-2 bg-white text-brand-emerald font-bold rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm pointer-events-none transform translate-x-2 group-hover:translate-x-0 transition-transform">
                                    ¡Escríbenos al WhatsApp!
                                    <div className="absolute top-1/2 -right-2 w-4 h-4 bg-white transform -translate-y-1/2 rotate-45"></div>
                                </div>
                            </a>
                        </div>
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
