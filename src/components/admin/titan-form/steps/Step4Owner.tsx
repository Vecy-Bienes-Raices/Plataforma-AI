"use client";

import { useTitanStore } from "../useTitanStore";
import { User, Mail, Phone, CreditCard, Building } from "lucide-react";

export default function Step4Owner() {
    const { formData, updateData, nextStep, prevStep } = useTitanStore();

    const handleNext = () => {
        // Basic validation
        if (
            formData.propietarioNombre &&
            formData.propietarioDocumentoNumero &&
            formData.propietarioEmail &&
            formData.propietarioTelefono
        ) {
            nextStep();
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Datos del Propietario</h2>
                <p className="text-white/50">Información legal requerida para la generación del contrato.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Tipo de Persona */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-brand-gold">El propietario actúa como:</label>
                    <div className="flex gap-4">
                        {["Natural", "Juridica"].map((tipo) => (
                            <button
                                key={tipo}
                                onClick={() => updateData({ propietarioTipo: tipo as 'Natural' | 'Juridica' })}
                                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border transition-all ${formData.propietarioTipo === tipo
                                    ? "bg-brand-gold text-brand-coffee-dark border-brand-gold font-bold shadow-lg"
                                    : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                                    }`}
                            >
                                {tipo === "Natural" ? <User className="w-5 h-5" /> : <Building className="w-5 h-5" />}
                                Persona {tipo}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Nombre Completo */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-white/70">Nombre Completo / Razón Social</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={formData.propietarioTipo === "Juridica" ? "Ej: Inversiones SAS" : "Ej: Pepito Pérez"}
                            value={formData.propietarioNombre}
                            onChange={(e) => updateData({ propietarioNombre: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-brand-gold outline-none placeholder:text-white/20"
                        />
                        <User className="absolute left-4 top-3.5 w-5 h-5 text-white/30" />
                    </div>
                </div>

                {/* Tipo de Documento */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Tipo de Documento</label>
                    <select
                        value={formData.propietarioDocumentoTipo}
                        onChange={(e) => updateData({ propietarioDocumentoTipo: e.target.value as "CC" | "CE" | "NIT" | "Pasaporte" })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold outline-none appearance-none"
                    >
                        <option value="CC" className="bg-brand-coffee-dark">Cédula de Ciudadanía</option>
                        <option value="CE" className="bg-brand-coffee-dark">Cédula de Extranjería</option>
                        <option value="NIT" className="bg-brand-coffee-dark">NIT</option>
                        <option value="Pasaporte" className="bg-brand-coffee-dark">Pasaporte</option>
                    </select>
                </div>

                {/* Número de Documento */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Número</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ej: 1020304050"
                            value={formData.propietarioDocumentoNumero}
                            onChange={(e) => updateData({ propietarioDocumentoNumero: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-brand-gold outline-none placeholder:text-white/20"
                        />
                        <CreditCard className="absolute left-4 top-3.5 w-5 h-5 text-white/30" />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Correo Electrónico</label>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={formData.propietarioEmail}
                            onChange={(e) => updateData({ propietarioEmail: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-brand-gold outline-none placeholder:text-white/20"
                        />
                        <Mail className="absolute left-4 top-3.5 w-5 h-5 text-white/30" />
                    </div>
                </div>

                {/* Teléfono */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Celular / WhatsApp</label>
                    <div className="relative">
                        <input
                            type="tel"
                            placeholder="Ej: 300 123 4567"
                            value={formData.propietarioTelefono}
                            onChange={(e) => updateData({ propietarioTelefono: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-brand-gold outline-none placeholder:text-white/20"
                        />
                        <Phone className="absolute left-4 top-3.5 w-5 h-5 text-white/30" />
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
                    disabled={!formData.propietarioNombre || !formData.propietarioDocumentoNumero || !formData.propietarioEmail}
                    className="btn-gold px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Siguiente: Contrato
                </button>
            </div>
        </div>
    );
}
