"use client";

import { useTitanStore } from "../useTitanStore";
import { Upload, Image as ImageIcon, FileText, Video } from "lucide-react";

export default function Step5MediaDocs() {
    const { nextStep, prevStep } = useTitanStore();

    const handleNext = () => {
        // Media and docs are technically optional but recommended.
        // For now we just proceed, but in a real app we might validate at least one photo.
        nextStep();
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Multimedia y Documentos</h2>
                <p className="text-white/50">Sube las fotos, videos y documentos legales requeridos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Fotos */}
                <div className="md:col-span-2 space-y-2">
                    <h3 className="text-brand-gold font-bold flex items-center gap-2">
                        <ImageIcon className="w-5 h-5" /> Fotos del Inmueble
                    </h3>
                    <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center mb-4 group-hover:bg-brand-gold/40 transition-colors">
                            <Upload className="w-6 h-6 text-brand-gold" />
                        </div>
                        <p className="font-medium text-white">Haz clic o arrastra fotos aquí</p>
                        <p className="text-xs text-white/40 mt-1">JPG, PNG, WEBP (Máx 5MB por foto)</p>
                    </div>
                    <p className="text-xs text-brand-gold italic">
                        * Las fotos se organizarán automáticamente usando IA para mostrar lo mejor primero.
                    </p>
                </div>

                {/* Video */}
                <div className="space-y-2">
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <Video className="w-5 h-5" /> Video (Recorrido)
                    </h3>
                    <div className="border border-white/10 rounded-xl p-6 bg-white/5 flex flex-col items-center text-center">
                        <button className="btn-gold text-xs px-4 py-2 flex items-center gap-2">
                            <Upload className="w-3 h-3" /> Subir Video
                        </button>
                        <p className="text-xs text-white/30 mt-2">MP4 o MOV (Máx 100MB)</p>
                    </div>
                </div>

                {/* Documentos Legales */}
                <div className="space-y-4">
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <FileText className="w-5 h-5" /> Documentos Legales
                    </h3>

                    {/* Certificado Tradición */}
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-sm text-white/70">
                            <p className="font-semibold text-white">Certificado de Libertad</p>
                            <p className="text-[10px]">No mayor a 30 días</p>
                        </div>
                        <button className="text-brand-gold hover:text-white transition-colors">
                            <Upload className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Recibo Predial */}
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-sm text-white/70">
                            <p className="font-semibold text-white">Recibo Predial</p>
                            <p className="text-[10px]">Año en curso</p>
                        </div>
                        <button className="text-brand-gold hover:text-white transition-colors">
                            <Upload className="w-4 h-4" />
                        </button>
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
                    className="btn-gold px-8 py-3"
                >
                    Siguiente: Contrato
                </button>
            </div>
        </div>
    );
}
