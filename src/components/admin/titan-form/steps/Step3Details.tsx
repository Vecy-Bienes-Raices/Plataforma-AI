"use client";

import { useTitanStore } from "../useTitanStore";
import { BedDouble, Bath, Car, Ruler, Layers, DollarSign, CalendarClock } from "lucide-react";

export default function Step3Details() {
    const { formData, updateData, nextStep, prevStep } = useTitanStore();

    const handleNext = () => {
        if (formData.areaPrivada > 0 && formData.precioVenta > 0) {
            nextStep();
        }
    };

    // Conditional Logic helpers
    const isApartment = formData.categoria === "Propiedad Horizontal" || ["Apartamento", "Apartaestudio", "Loft", "Pent House", "Dúplex"].includes(formData.tipoInmueble);
    const isLot = formData.tipoInmueble.includes("Lote") || formData.tipoInmueble.includes("Terreno");
    const isRent = formData.tipoNegocio === "Arriendo";

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Detalles del Inmueble</h2>
                <p className="text-white/50">Características clave para {formData.tipoInmueble} en {formData.ciudad}.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Precio (Always needed) */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-brand-gold flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Precio de {formData.tipoNegocio}
                    </label>
                    <input
                        type="number"
                        placeholder="Ej: 350000000"
                        value={formData.precioVenta || ""}
                        onChange={(e) => updateData({ precioVenta: Number(e.target.value) })}
                        className="w-full text-2xl font-bold bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-brand-gold focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none placeholder:text-white/10"
                    />
                    <p className="text-xs text-white/40 text-right">
                        {formData.precioVenta ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(formData.precioVenta) : "$0"}
                    </p>
                </div>

                {/* Arriendo: Duración estimada (Solo si es Arriendo) */}
                {isRent && (
                    <div className="space-y-2 md:col-span-2 bg-brand-gold/10 p-4 rounded-xl border border-brand-gold/30">
                        <label className="text-sm font-bold text-brand-gold flex items-center gap-2 mb-2">
                            <CalendarClock className="w-4 h-4" /> Duración del Contrato
                        </label>
                        <p className="text-xs text-white/60 mb-3">Esto define la comisión según la costumbre mercantil.</p>

                        <div className="grid grid-cols-3 gap-3">
                            {[12, 24, 36, 60, 72].map((meses) => (
                                <button
                                    key={meses}
                                    onClick={() => updateData({ tiempoArrendamiento: meses })}
                                    className={`py-2 px-2 rounded-lg text-sm border transition-all ${formData.tiempoArrendamiento === meses
                                        ? "bg-brand-gold text-brand-coffee-dark border-brand-gold font-bold"
                                        : "bg-black/20 text-white/70 border-white/10 hover:bg-white/10"
                                        }`}
                                >
                                    {meses < 12 ? `${meses} Meses` : `${meses / 12} Años`}
                                </button>
                            ))}
                        </div>
                    </div>
                )}


                {/* Areas */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-brand-gold flex items-center gap-2">
                        <Ruler className="w-4 h-4" /> Área Privada (m²)
                    </label>
                    <input
                        type="number"
                        placeholder="0"
                        value={formData.areaPrivada || ""}
                        onChange={(e) => updateData({ areaPrivada: Number(e.target.value) })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold outline-none"
                    />
                </div>

                {!isLot && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                            <Ruler className="w-4 h-4" /> Área Construida (m²)
                        </label>
                        <input
                            type="number"
                            placeholder="0"
                            value={formData.areaConstruida || ""}
                            onChange={(e) => updateData({ areaConstruida: Number(e.target.value) })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold outline-none"
                        />
                    </div>
                )}

                {/* Residential Specifics */}
                {!isLot && (
                    <>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                                <BedDouble className="w-4 h-4" /> Habitaciones
                            </label>
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                                <button
                                    onClick={() => updateData({ habitaciones: Math.max(0, formData.habitaciones - 1) })}
                                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                                >-</button>
                                <span className="flex-1 text-center font-bold text-xl text-white">{formData.habitaciones}</span>
                                <button
                                    onClick={() => updateData({ habitaciones: formData.habitaciones + 1 })}
                                    className="w-8 h-8 rounded-full bg-brand-gold/20 text-brand-gold hover:bg-brand-gold hover:text-brand-coffee-dark flex items-center justify-center transition-colors"
                                >+</button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                                <Bath className="w-4 h-4" /> Baños
                            </label>
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                                <button
                                    onClick={() => updateData({ banos: Math.max(0, formData.banos - 1) })}
                                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                                >-</button>
                                <span className="flex-1 text-center font-bold text-xl text-white">{formData.banos}</span>
                                <button
                                    onClick={() => updateData({ banos: formData.banos + 1 })}
                                    className="w-8 h-8 rounded-full bg-brand-gold/20 text-brand-gold hover:bg-brand-gold hover:text-brand-coffee-dark flex items-center justify-center transition-colors"
                                >+</button>
                            </div>
                        </div>
                    </>
                )}

                {/* Garages */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                        <Car className="w-4 h-4" /> Parqueaderos
                    </label>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                        <button
                            onClick={() => updateData({ garajes: Math.max(0, formData.garajes - 1) })}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                        >-</button>
                        <span className="flex-1 text-center font-bold text-xl text-white">{formData.garajes}</span>
                        <button
                            onClick={() => updateData({ garajes: formData.garajes + 1 })}
                            className="w-8 h-8 rounded-full bg-brand-gold/20 text-brand-gold hover:bg-brand-gold hover:text-brand-coffee-dark flex items-center justify-center transition-colors"
                        >+</button>
                    </div>
                </div>

                {/* Specific: Apartment Floor */}
                {isApartment && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                            <Layers className="w-4 h-4" /> Piso N°
                        </label>
                        <input
                            type="number"
                            placeholder="Ej: 5"
                            value={formData.piso || ""}
                            onChange={(e) => updateData({ piso: Number(e.target.value) })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold outline-none"
                        />
                    </div>
                )}

                {/* Administration Cost */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-white/70">Valor Administración (Mensual)</label>
                    <input
                        type="number"
                        placeholder="0 si no aplica"
                        value={formData.valorAdministracion || ""}
                        onChange={(e) => updateData({ valorAdministracion: Number(e.target.value) })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold outline-none"
                    />
                </div>

            </div>

            <div className="flex justify-between pt-8 border-t border-white/10 mt-8">
                <button
                    onClick={prevStep}
                    className="text-white/50 hover:text-white px-6 py-2 transition-colors"
                >
                    Atrás
                </button>
                <button
                    onClick={handleNext}
                    disabled={!formData.precioVenta || !formData.areaPrivada}
                    className="btn-gold px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Siguiente: Propietario
                </button>
            </div>
        </div>
    );
}
