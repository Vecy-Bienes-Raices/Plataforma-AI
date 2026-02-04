"use client";

import { useState, useMemo } from "react";
import { useTitanStore } from "../useTitanStore";
import { generateContractHTML } from "../ContractTemplates";
import SignaturePad from "../SignaturePad";
import { Copy, CheckCircle, FileCheck, Eye } from "lucide-react";


export default function Step6Contract() {
    const { formData, updateData, prevStep } = useTitanStore(); // Removed nextStep
    const [showSignaturePad, setShowSignaturePad] = useState(false);

    // Generate HTML based on current data
    const contractHtml = useMemo(() => generateContractHTML(formData), [formData]);

    const handleSignatureSave = (signatureData: string) => {
        updateData({ firmaDigital: signatureData });
        setShowSignaturePad(false);
    };

    const handleFinish = () => {
        alert("¡Contrato generado y listo para guardar en Firebase!");
        // Here we would save to Firestore and redirect
    };

    const exclusivityOptions: ('Si' | 'No')[] = ['Si', 'No'];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Legalización</h2>
                <p className="text-white/50">Revisa el contrato inteligente generado automáticamente.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Lado Izquierdo: Configuración Legal */}
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h3 className="text-brand-gold font-bold mb-4 flex items-center gap-2">
                            <FileCheck className="w-5 h-5" /> Condiciones
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm text-white/70">¿Matrícula Inmobiliaria?</label>
                                <input
                                    type="text"
                                    placeholder="Ej: 50C-123456"
                                    value={formData.matriculaInmobiliaria || ""}
                                    onChange={(e) => updateData({ matriculaInmobiliaria: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-white/70">¿Exclusividad?</label>
                                <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
                                    {exclusivityOptions.map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => updateData({ exclusividad: opt })}
                                            className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${formData.exclusividad === opt
                                                ? "bg-brand-gold text-brand-coffee-dark"
                                                : "text-white/50 hover:text-white"
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h3 className="text-brand-gold font-bold mb-4">Firma Digital</h3>

                        {formData.firmaDigital ? (
                            <div className="text-center space-y-4">
                                <div className="bg-white p-4 rounded-xl border-dashed border-2 border-brand-gold/50">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={formData.firmaDigital} alt="Firma" className="max-h-16 mx-auto" />
                                </div>
                                <button
                                    onClick={() => setShowSignaturePad(true)}
                                    className="text-white/50 text-xs underline hover:text-white"
                                >
                                    Cambiar firma
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowSignaturePad(true)}
                                className="w-full py-4 border-2 border-dashed border-white/20 rounded-xl text-white/50 hover:border-brand-gold hover:text-brand-gold transition-all"
                            >
                                + Agregar Firma
                            </button>
                        )}
                    </div>

                    {showSignaturePad && (
                        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                            <div className="w-full max-w-md">
                                <SignaturePad onSave={handleSignatureSave} />
                                <button
                                    onClick={() => setShowSignaturePad(false)}
                                    className="mt-4 text-white/50 text-sm hover:text-white w-full text-center"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Lado Derecho: Preview del Contrato */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
                    <div className="bg-gray-100 p-3 border-b flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                            <Eye className="w-4 h-4" /> Vista Previa
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => { navigator.clipboard.writeText(contractHtml); alert("HTML Copiado"); }}
                                className="p-2 hover:bg-gray-200 rounded text-gray-600" title="Copiar HTML"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 bg-white text-black">
                        {/* Render HTML safely */}
                        <div dangerouslySetInnerHTML={{ __html: contractHtml }} />
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
                    onClick={handleFinish}
                    disabled={!formData.firmaDigital}
                    className="btn-gold px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <CheckCircle className="w-5 h-5" />
                    Finalizar y Guardar
                </button>
            </div>
        </div>
    );
}
