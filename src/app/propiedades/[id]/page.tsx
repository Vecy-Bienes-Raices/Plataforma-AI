"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types/property";
import { ChevronLeft, TrendingUp, User, MapPin, Share2, Calendar, DollarSign, Camera, Search, Home, Star, Video, Phone, Wallet } from "lucide-react";
import EdificioMobileView from "@/components/properties/EdificioMobileView";
import { EdificioProps } from "@/data/edificio-teusaquillo";
import DesktopGallery from "@/components/properties/DesktopGallery";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";



export default function PropertyDetailPage({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { id } = use(params);
    const resolvedSearchParams = use(searchParams);

    // --- STATE MANAGEMENT ---
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showShareModal, setShowShareModal] = useState(false);
    const [showAliadoInput, setShowAliadoInput] = useState(false);
    const [aliadoPhone, setAliadoPhone] = useState("");

    // --- URL PARAMS LOGIC ---
    const mode = resolvedSearchParams.mode;
    const brokerPhone = resolvedSearchParams.broker as string | undefined;

    // Core Logic:
    const isAliadoMode = mode === 'aliado';

    // --- FETCH DATA FROM FIRESTORE ---
    useEffect(() => {
        async function fetchProperty() {
            try {
                setLoading(true);
                const docRef = doc(db, "properties", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProperty(docSnap.data() as Property);
                } else {
                    setError("Propiedad no encontrada en la base de datos.");
                    console.log("No such document!");
                }
            } catch (err: unknown) {
                console.error("Error fetching property:", err);
                setError("Error cargando la propiedad. Por favor intenta de nuevo.");
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchProperty();
        }
    }, [id]);


    // --- LOADING STATE ---
    if (loading) {
        return (
            <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-brand-gold">
                <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="animate-pulse">Cargando Propiedad...</p>
            </div>
        );
    }

    // --- NOT FOUND STATE ---
    if (!property || error) {
        return (
            <div className="min-h-screen bg-stone-950 flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-400 mb-2">Propiedad no encontrada</h1>
                    <p className="text-white/50">{error || `ID: ${id}`}</p>
                    <Link href="/propiedades" className="mt-6 inline-block btn-gold p-3 rounded-lg text-stone-900 font-bold">
                        Volver al Listado
                    </Link>
                </div>
            </div>
        );
    }

    const isEdificio = property.tipoInmueble === 'Edificio';
    const edificio = property as unknown as EdificioProps;

    // --- HANDLERS ---

    // 1. Owner Workflow
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
        // Direct link has NO params (or standard params)
        copyToClipboard(url.toString());
    };

    const generateAliadoLink = () => {
        if (!property) return;

        // Use short code URL for aliados
        const shortUrl = `${window.location.origin}/p/teu001`;  // TODO: Get code dynamically

        // Format price
        const formatPrice = (price: number) => {
            return `$${price.toLocaleString('es-CO')} COP`;
        };

        // Generate WhatsApp formatted text
        const shareText = `🏢 *${property.titulo.toUpperCase()}*

💰 *Precio:* ${formatPrice(property.precio)}
📍 *Ubicación:* ${property.ubicacion.barrio || property.ubicacion.ciudad}
📏 *Área:* ${property.caracteristicas.area} m²
🏠 *Detalles:* ${property.caracteristicas.habitaciones} hab, ${property.caracteristicas.banos} baños, ${property.caracteristicas.garajes} garajes

${property.descripcion}

🔗 *Ver Fotos y Ficha Técnica:*
${shortUrl}`;

        // Copy to clipboard and open WhatsApp
        copyToClipboard(shareText);

        // Optional: Open WhatsApp directly
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank');
    };

    // 2. Aliado Workflow
    const handleAliadoCustomize = () => {
        if (!aliadoPhone) {
            alert("Por favor ingresa un número válido.");
            return;
        }
        const url = new URL(window.location.href);
        url.searchParams.set('broker', aliadoPhone.replace(/\D/g, ''));
        // Reload to apply changes
        window.location.href = url.toString();
    };


    if (isEdificio) {
        return (
            <>
                {/* --- MODALS --- */}

                {/* 1. Share Modal (Owner Only) */}
                {showShareModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <div className="glass-panel p-8 max-w-md w-full relative">
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="absolute top-4 right-4 text-white/50 hover:text-white"
                            >
                                ✕
                            </button>
                            <h3 className="text-2xl font-bold text-white mb-6 text-center">Compartir Ficha Técnica</h3>

                            <div className="space-y-4">
                                <button
                                    onClick={generateDirectLink}
                                    className="w-full p-4 rounded-xl bg-brand-gold hover:bg-white transition-colors text-brand-coffee-dark font-bold flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-black/10 rounded-full">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-sm opacity-60 uppercase tracking-wider">Opción A</div>
                                            <div className="text-lg">Cliente Directo</div>
                                        </div>
                                    </div>
                                    <ChevronLeft className="w-5 h-5 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>


                                <button
                                    onClick={generateAliadoLink}
                                    className="w-full p-4 rounded-xl glass-inner text-white font-bold flex items-center justify-between group border-2 border-[#D4AF37]/50 relative overflow-hidden transition-all duration-300 hover:border-[#FFD700] hover:bg-[#D4AF37]/10 hover:scale-[1.02]"
                                    style={{
                                        boxShadow: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = '0 0 15px #FFD700, 0 0 30px #CCAC4E, 0 0 45px rgba(212,175,55,0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className="p-2 bg-white/10 rounded-full group-hover:bg-[#FFD700]/30 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(255,215,0,0.9)]">
                                            <Share2 className="w-5 h-5 group-hover:text-[#FFD700] group-hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.8)] transition-all duration-300" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-sm opacity-60 uppercase tracking-wider">Opción B</div>
                                            <div className="text-lg group-hover:text-[#FFD700] group-hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.9)] transition-all duration-300 font-extrabold">Para Aliados (Sin Datos)</div>
                                        </div>
                                    </div>
                                    <ChevronLeft className="w-5 h-5 rotate-180 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-[#FFD700] group-hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.8)] relative z-10" />

                                    {/* Intense electric border animation */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <div className="absolute inset-0 rounded-xl animate-pulse bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent"></div>
                                    </div>
                                </button>
                            </div>
                            <p className="mt-6 text-xs text-center text-white/40">
                                La opción &quot;Aliados&quot; genera un enlace limpio para que tus colegas puedan personalizarlo.
                            </p>
                        </div>
                    </div>
                )}


                {/* 2. Aliado Input Modal (White Label View) */}
                {
                    showAliadoInput && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                            <div className="glass-panel p-8 max-w-sm w-full relative">
                                <button
                                    onClick={() => setShowAliadoInput(false)}
                                    className="absolute top-4 right-4 text-white/50 hover:text-white"
                                >
                                    ✕
                                </button>
                                <h3 className="text-xl font-bold text-white mb-4 text-center">Personalizar Ficha</h3>
                                <p className="text-white/70 text-sm mb-6 text-center">
                                    Ingresa tu número de WhatsApp para generar un enlace que redirija a tus clientes directamente a ti.
                                </p>
                                <input
                                    type="tel"
                                    placeholder="Ej: 3001234567"
                                    value={aliadoPhone}
                                    onChange={(e) => setAliadoPhone(e.target.value)}
                                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-brand-gold mb-4"
                                />
                                <button
                                    onClick={handleAliadoCustomize}
                                    className="w-full btn-gold text-brand-coffee-dark font-bold py-3"
                                >
                                    Generar Mi Enlace
                                </button>
                            </div>
                        </div>
                    )
                }

                {/* Vista Móvil Especial */}
                <div className="md:hidden">
                    <EdificioMobileView
                        property={edificio}
                        isSharedMode={isAliadoMode}
                        agentPhone={brokerPhone}
                    />
                </div>

                {/* Vista Escritorio Estándar */}
                <div className="hidden md:block min-h-screen pb-20 relative">

                    {/* Header Image */}
                    <div className="relative h-[85vh] w-full mt-[-80px]">
                        <Image
                            src={edificio.imagenes[0]}
                            alt={edificio.titulo}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-transparent to-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

                        {/* Back Button - Hidden in Aliado Mode (unless customized maybe? No, standard Whitelabel usually has no back) */}
                        {!isAliadoMode && (
                            <div className="absolute top-28 left-6 md:top-32 md:left-10 z-20">
                                <Link href="/propiedades" className="glass-inner px-4 py-2 flex items-center gap-2 text-white hover:bg-white/10 transition-colors cursor-pointer text-sm font-bold backdrop-blur-md rounded-full">
                                    <ChevronLeft className="w-4 h-4" /> Volver
                                </Link>
                            </div>
                        )}

                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 bg-gradient-to-t from-[#1c1917] to-transparent pt-32">
                            <div className="max-w-7xl mx-auto">
                                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4 ${property.tipo === 'Venta'
                                    ? 'bg-brand-emerald text-white'
                                    : 'bg-brand-gold text-brand-coffee-dark'
                                    }`}>
                                    {property.tipo}
                                </span>
                                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                                    {edificio.titulo}
                                </h1>
                                <div className="flex items-center text-white/90 text-xl font-medium">
                                    <MapPin className="w-6 h-6 mr-2 text-brand-gold" />
                                    {edificio.ubicacion.direccion}, {edificio.ubicacion.barrio}, {edificio.ubicacion.ciudad}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                            {/* LEFT COLUMN: Gallery & Main Content (Span 8) */}
                            <div className="lg:col-span-8 space-y-10">

                                {/* 1. Green Financial Banner */}
                                {(edificio.rentaMensual) && (
                                    <div className="bg-brand-emerald rounded-3xl p-6 shadow-lg transform hover:scale-[1.01] transition-transform mb-8">
                                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white/20 rounded-full text-white">
                                                    <DollarSign className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <p className="text-white/80 text-sm font-bold uppercase tracking-wide">Precio de Venta</p>
                                                    <p className="text-3xl font-extrabold text-white text-shadow-sm">${property.precio.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div className="h-px w-full md:w-px md:h-16 bg-white/20"></div>
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white/20 rounded-full text-white">
                                                    <TrendingUp className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <p className="text-white/80 text-sm font-bold uppercase tracking-wide">Renta Mensual Actual</p>
                                                    <p className="text-3xl font-extrabold text-white text-shadow-sm">{edificio.rentaMensual}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 2. Gallery Section */}
                                <div className="space-y-4">
                                    <div className="bg-brand-orange py-2 px-6 rounded-t-2xl inline-block">
                                        <h3 className="text-white font-bold flex items-center gap-2">
                                            <Camera className="w-5 h-5" /> Galería de Fotos
                                        </h3>
                                    </div>
                                    <DesktopGallery images={edificio.imagenes} title={edificio.titulo} />
                                </div>

                                {/* 3. Details Grid (9 Items) */}
                                <div className="space-y-4 pt-6">
                                    <div className="bg-brand-orange py-2 px-6 rounded-t-2xl inline-block">
                                        <h3 className="text-white font-bold flex items-center gap-2">
                                            <Search className="w-5 h-5" /> Detalles del Edificio
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                                        {edificio.detalles && edificio.detalles.map((item, idx) => (
                                            <div key={idx} className="glass-panel p-4 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/10 transition-colors border border-white/5">
                                                <span className="text-3xl">{item.icon}</span>
                                                <span className="text-white/50 text-xs font-bold uppercase tracking-wider">{item.label}</span>
                                                <span className="text-white font-bold text-lg leading-tight">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 4. Description */}
                                <div className="space-y-4 pt-6">
                                    <h2 className="text-2xl font-bold text-white border-l-4 border-brand-gold pl-4">
                                        Descripción
                                    </h2>
                                    <div className="glass-panel p-8">
                                        <p className="text-lg leading-relaxed text-stone-300 font-light">
                                            {property.descripcion}
                                        </p>
                                    </div>
                                </div>

                                {/* 5. Distribution Section */}
                                {edificio.caracteristicasInternas && (
                                    <div className="space-y-4 pt-6">
                                        <div className="bg-brand-orange py-2 px-6 rounded-t-2xl inline-block">
                                            <h3 className="text-white font-bold flex items-center gap-2">
                                                <Home className="w-5 h-5" /> Distribución del Edificio
                                            </h3>
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

                                {/* 6. ROI Analysis */}
                                {(edificio.roiDetails) && (
                                    <div className="space-y-4 pt-6">
                                        <div className="bg-[#C5A572] py-2 px-6 rounded-t-2xl inline-block text-stone-900">
                                            <h3 className="font-bold flex items-center gap-2">
                                                <TrendingUp className="w-5 h-5" /> Análisis de Rentabilidad y Potencial
                                            </h3>
                                        </div>
                                        <div className="glass-panel p-8 bg-[#C5A572]/10 border-brand-gold/20">
                                            <div className="space-y-4">
                                                <h4 className="text-brand-gold font-bold flex items-center gap-2">
                                                    <DollarSign className="w-5 h-5" /> Ingresos Mensuales Detallados:
                                                </h4>
                                                <ul className="space-y-2 pl-4">
                                                    {edificio.roiDetails.list.map((item, idx) => (
                                                        <li key={idx} className="text-white text-lg flex items-start gap-2">
                                                            <span className="text-brand-gold mt-1.5">•</span> {item}
                                                        </li>
                                                    ))}
                                                </ul>

                                                <div className="py-4 border-t border-dashed border-white/10 mt-4">
                                                    <div className="flex items-center gap-2 text-2xl font-bold text-green-400">
                                                        <Wallet className="w-6 h-6" /> TOTAL RENTA ACTUAL: {edificio.roiDetails.total}
                                                    </div>
                                                </div>

                                                <div className="bg-brand-gold/20 p-4 rounded-xl border-l-4 border-brand-gold">
                                                    <h5 className="text-brand-gold font-bold text-sm mb-1">⚠️ Nota del Propietario:</h5>
                                                    <p className="text-white/80 text-sm">
                                                        {edificio.roiDetails.note} <br />
                                                        <strong>Habitaciones:</strong> Son 20 unidades. Actualmente 10 amobladas y rentando. Las otras 10 listas para duplicar ingresos.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-6 bg-brand-emerald/20 p-4 rounded-xl border border-brand-emerald/30 text-center">
                                                <span className="text-brand-emerald font-bold text-xl uppercase tracking-widest">ROI ACTUAL: {edificio.roiAnual}</span>
                                                <span className="block text-white/50 text-xs mt-1">(Calculado sobre inversión de ${property.precio.toLocaleString()})</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 7. Video Section */}
                                {edificio.videoUrl && (
                                    <div className="space-y-4 pt-6">
                                        <div className="bg-brand-orange py-2 px-6 rounded-t-2xl inline-block">
                                            <h3 className="text-white font-bold flex items-center gap-2">
                                                <Video className="w-5 h-5" /> Recorrido Virtual
                                            </h3>
                                        </div>
                                        <div className="relative aspect-video rounded-3xl overflow-hidden glass-inner border border-white/5 shadow-2xl">
                                            <video
                                                src={edificio.videoUrl}
                                                className="w-full h-full object-cover"
                                                controls
                                                playsInline
                                                poster={edificio.imagenes[0]}
                                            >
                                                Tu navegador no soporta videos HTML5.
                                            </video>
                                        </div>
                                    </div>
                                )}

                                {/* 8. Map Display */}
                                <div className="space-y-4 pt-6">
                                    <div className="bg-brand-orange py-2 px-6 rounded-t-2xl inline-block">
                                        <h3 className="text-white font-bold flex items-center gap-2">
                                            <MapPin className="w-5 h-5" /> Ubicación
                                        </h3>
                                    </div>
                                    <div className="glass-inner rounded-3xl overflow-hidden h-96 relative grayscale hover:grayscale-0 transition-all duration-500 border border-white/5 shadow-xl">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.696007963653!2d-74.07297592415175!3d4.648218142109405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bdc3da62547%3A0x103d085958763560!2sBarrio%20San%20Luis%2C%20Teusaquillo%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1706123456789!5m2!1ses!2sco"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </div>

                                {/* 9. Footer CTA */}
                                <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-stone-800 to-stone-900 border border-white/10 text-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-brand-gold/5 group-hover:bg-brand-gold/10 transition-colors duration-500"></div>
                                    <h3 className="text-2xl font-bold text-white mb-2 relative z-10">¿Buscas conexión con la naturaleza y excelentes amenidades?</h3>
                                    <p className="text-brand-gold font-bold flex items-center justify-center gap-2 text-lg relative z-10">
                                        <Phone className="w-5 h-5 animate-bounce" /> Agenda tu cita y prepárate para enamorarte
                                    </p>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Sidebar (Span 4) */}
                            <div className="lg:col-span-4 space-y-6">
                                <div className="glass-panel p-6 sticky top-24">
                                    <span className="text-white/50 text-sm font-medium uppercase tracking-wider block mb-2">Valor de Inversión</span>
                                    <div className="text-4xl font-bold text-white mb-6 text-shadow-black">
                                        ${property.precio.toLocaleString()}
                                    </div>

                                    {/* --- AGENDAR BUTTON --- */}
                                    <button
                                        onClick={() => {
                                            if (!isAliadoMode) {
                                                // Standard Owner Flow -> Vecy Agenda
                                                const params = new URLSearchParams({
                                                    source: 'vecy_plataforma',
                                                    propiedad_id: property.id,
                                                    titulo: property.titulo,
                                                    precio: property.precio.toString(),
                                                    barrio: property.ubicacion.barrio || ''
                                                });
                                                window.open(`https://vecy-agenda-pro.vercel.app/?${params.toString()}`, '_blank');
                                            } else {
                                                // Aliado Mode
                                                if (brokerPhone) {
                                                    // Has broker -> WhatsApp
                                                    window.open(`https://wa.me/${brokerPhone}?text=Hola, estoy interesado en el inmueble: ${property.titulo}`, '_blank');
                                                } else {
                                                    // No broker -> Customize
                                                    setShowAliadoInput(true);
                                                }
                                            }
                                        }}
                                        className="w-full btn-gold text-stone-900 font-extrabold mb-4 group"
                                    >
                                        <Calendar className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                                        {(isAliadoMode && !brokerPhone) ? "Personalizar Ficha" : "Agendar Visita"}
                                    </button>

                                    {/* --- SHARE BUTTON --- */}
                                    {(!isAliadoMode || (isAliadoMode && brokerPhone)) && (
                                        <button
                                            onClick={() => {
                                                if (isAliadoMode && brokerPhone) {
                                                    // Aliado sharing their own link
                                                    copyToClipboard(window.location.href);
                                                } else {
                                                    // Owner sharing options
                                                    handleShareClick();
                                                }
                                            }}
                                            className="w-full bg-stone-950 border border-brand-gold text-brand-gold hover:shadow-[0_0_20px_rgba(197,165,114,0.4)] py-3 rounded-full font-bold transition-all flex items-center justify-center active:scale-95 duration-200 mt-2"
                                        >
                                            <Share2 className="w-5 h-5 mr-2" />
                                            {isAliadoMode ? "Compartir Mi Ficha" : "Compartir Ficha Técnica"}
                                        </button>
                                    )}

                                    {isAliadoMode && !brokerPhone && (
                                        <div className="mt-4 p-3 bg-brand-gold/10 rounded-lg border border-brand-gold/20">
                                            <p className="text-brand-gold text-xs text-center font-bold animate-pulse">
                                                👈 ¡Haz clic en &quot;Personalizar Ficha&quot; para agregar tu WhatsApp!
                                            </p>
                                        </div>
                                    )}

                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <p className="text-white/40 text-xs text-center">
                                            Referencia: {property.id} <br />
                                            {!isAliadoMode && "Gestionado por VECY Platform"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* WhatsApp Widget - Only in Owner Mode */}
                {
                    !isAliadoMode && (
                        <div className="fixed bottom-6 right-6 z-50">
                            <a
                                href="https://wa.me/573166569719"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-xl hover:scale-110 transition-transform duration-300 relative group"
                            >
                                <svg className="w-8 h-8 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l121.7-31.9c32.4 17.8 68.9 27.2 106.4 27.2h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                                <span className="absolute right-16 px-3 py-1 bg-white text-[#25D366] font-bold rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm">
                                    ¡Escríbenos!
                                </span>
                            </a>
                        </div>
                    )
                }
            </>
        );
    }

    // Default View (Standard Property) - Simplified for this context to strict minimum to avoid complex merge issues in this specific update
    // In a real scenario we would replicate the shared logic here too.
    return (
        <div className="min-h-screen pb-20 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-white text-3xl font-bold">Vista Estándar (En desarrollo)</h1>
                <p className="text-white/60">Esta vista se activará cuando uses propiedades que no sean el Edificio Teusaquillo.</p>
            </div>
        </div>
    );
}
