"use client";

import { useTitanStore } from "../useTitanStore";
import { MapPin, Navigation } from "lucide-react";

export default function Step2Location() {
    const { formData, updateData, nextStep, prevStep } = useTitanStore();

    const handleNext = () => {
        // Basic validation
        if (formData.direccion && formData.ciudad) {
            nextStep();
        }
    };

    const cities = ["Bogotá D.C.", "Chía", "Cajicá", "Zipaquirá", "Sopó", "La Calera", "Medellín", "Cali", "Barranquilla"];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">¿Dónde está ubicado?</h2>
                <p className="text-white/50">La ubicación es clave para la valoración y el contrato.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ciudad */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-brand-gold">Ciudad / Municipio</label>
                    <div className="relative">
                        <select
                            value={formData.ciudad}
                            onChange={(e) => updateData({ ciudad: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none appearance-none"
                        >
                            <option value="" disabled className="bg-brand-coffee-dark text-white/50">Seleccione...</option>
                            {cities.map(city => (
                                <option key={city} value={city} className="bg-brand-coffee-dark">{city}</option>
                            ))}
                        </select>
                        <MapPin className="absolute right-4 top-3.5 w-5 h-5 text-white/30 pointer-events-none" />
                    </div>
                </div>

                {/* Localidad (Solo si es Bogotá, lógica simple por ahora) */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-brand-gold">Localidad (Opcional)</label>
                    <input
                        type="text"
                        placeholder="Ej: Usaquén"
                        value={formData.localidad || ""}
                        onChange={(e) => updateData({ localidad: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none placeholder:text-white/20"
                    />
                </div>

                {/* Barrio */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-brand-gold">Barrio / Vereda</label>
                    <input
                        type="text"
                        placeholder="Ej: Santa Bárbara Central"
                        value={formData.barrio}
                        onChange={(e) => updateData({ barrio: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none placeholder:text-white/20"
                    />
                </div>

                {/* Dirección Principal */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-brand-gold">Dirección Exacta</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ej: Carrera 15 # 118 - 45"
                            value={formData.direccion}
                            onChange={(e) => updateData({ direccion: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none placeholder:text-white/20"
                        />
                        <Navigation className="absolute left-4 top-3.5 w-5 h-5 text-brand-gold" />
                    </div>
                    <p className="text-xs text-white/40 ml-1">Esta dirección se usará para generar el contrato automáticamente.</p>
                </div>

                {/* Dirección Secundaria */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-brand-gold">Complemento (Torre, Apto, Interior)</label>
                    <input
                        type="text"
                        placeholder="Ej: Torre 2, Apto 504"
                        value={formData.direccionSecundaria || ""}
                        onChange={(e) => updateData({ direccionSecundaria: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none placeholder:text-white/20"
                    />
                </div>

                {/* Estrato */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-brand-gold">Estrato</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5, 6].map((estrato) => (
                            <button
                                key={estrato}
                                onClick={() => updateData({ estrato: estrato.toString() })}
                                className={`flex-1 py-2 rounded-lg border text-sm font-bold transition-all ${formData.estrato === estrato.toString()
                                        ? "bg-brand-gold text-brand-coffee-dark border-brand-gold"
                                        : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                                    }`}
                            >
                                {estrato}
                            </button>
                        ))}
                    </div>
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
                    disabled={!formData.direccion || !formData.ciudad || !formData.barrio}
                    className="btn-gold px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Siguiente: Detalles
                </button>
            </div>
        </div>
    );
}
