"use client";

import { useState } from "react";
import { useTitanStore } from "../useTitanStore";
import { Upload, Wand2, CheckCircle2, FileText, Image as ImageIcon, Video, ShieldCheck } from "lucide-react";
import { TitanFormData } from "../types";

// Taxonomía VECY Disruptiva
const TAXONOMIES: Record<string, string[]> = {
    "Propiedad Horizontal": ["Apartaestudio", "Apartamento", "Dúplex", "Loft", "Pent House"],
    "Propiedad Vertical": ["Casa de barrio", "Casa de conjunto"],
    "Campestre": ["Cabaña", "Finca", "Villa", "Lote / Terreno"],
    "Comercial": ["Bodega", "Edificio", "Hostal", "Hotel", "Aparta Hotel", "Local", "Oficina"]
};

export default function Step1Classification() {
    const { formData, updateData, nextStep } = useTitanStore();
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<{ name: string; type: 'doc' | 'image' | 'video' }[]>([]);

    // Mock AI Analysis
    const handleMagicUpload = () => {
        setIsAnalyzing(true);
        // Simulate processing delay
        setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisComplete(true);
            setUploadedFiles([
                { name: "Certificado_Libertad.pdf", type: "doc" },
                { name: "Escritura_Publica.pdf", type: "doc" },
                { name: "Fachada_Principal.jpg", type: "image" },
                { name: "Sala_Comedor.jpg", type: "image" }
            ]);
            // Simulate AI findings based on documents
            updateData({
                categoria: "Propiedad Horizontal",
                tipoInmueble: "Pent House",
                atributosIA: {
                    estadoAcabados: "Remodelado",
                    iluminacionNatural: 9,
                    estiloVida: ["Pet-friendly", "Home-office ready"],
                    confianza: 0.98
                }
            });
        }, 2500);
    };

    const handleNext = () => {
        if (formData.categoria && formData.tipoInmueble && formData.tipoNegocio) {
            nextStep();
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header Inspirador */}
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                    <Wand2 className="w-6 h-6 text-brand-gold" />
                    Carga Inteligente & Análisis
                </h2>
                <p className="text-white/50">
                    Sube documentos legales, fotos y videos.<br />
                    <span className="text-brand-gold">Nuestra IA leerá las escrituras y analizará las fotos por ti.</span>
                </p>
            </div>

            {/* MAGIC UPLOAD ZONE */}
            <div
                onClick={!analysisComplete ? handleMagicUpload : undefined}
                className={`relative overflow-hidden border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-all duration-500 group ${isAnalyzing
                    ? "border-brand-gold bg-brand-gold/10"
                    : analysisComplete
                        ? "border-green-500/50 bg-green-500/10 cursor-default"
                        : "border-white/20 bg-white/5 hover:bg-white/10 hover:border-brand-gold/50"
                    }`}
            >
                {isAnalyzing ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-10 text-brand-gold">
                        <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="animate-pulse">Leyendo Certificado de Libertad...</p>
                        <p className="text-xs text-white/50 mt-2">Identificando matrícula inmobiliaria y linderos...</p>
                    </div>
                ) : analysisComplete ? (
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">¡Documentos Procesados!</h3>
                        <p className="text-white/50 text-center text-sm mb-4">
                            Hemos extraído la información legal y visual.
                        </p>
                        <div className="flex gap-2 flex-wrap justify-center">
                            {uploadedFiles.map((f, i) => (
                                <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white flex items-center gap-2">
                                    {f.type === 'doc' ? <FileText className="w-3 h-3 text-blue-400" /> : <ImageIcon className="w-3 h-3 text-purple-400" />}
                                    {f.name}
                                </span>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-white/5 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform relative">
                            <Upload className="w-8 h-8 text-white group-hover:text-brand-gold transition-colors" />
                            <div className="absolute -right-2 -bottom-2 bg-brand-gold text-brand-coffee-dark text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> AI Ready
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Magic Dropzone</h3>
                        <p className="text-white/50 text-center max-w-sm">
                            Arrastra aquí todo: <span className="text-brand-gold">Escrituras, Certificados, Fotos y Videos</span>.
                            <br />Nosotros ordenamos el caos.
                        </p>
                    </div>
                )}
            </div>

            {/* MANUAL UPLOAD ACTIONS (Only visible after analysis to add missing stuff) */}
            {analysisComplete && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-2">
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 flex flex-col items-center gap-2 transition-all">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <span className="text-xs text-white">Certificado</span>
                    </button>
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 flex flex-col items-center gap-2 transition-all">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <span className="text-xs text-white">Predial</span>
                    </button>
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 flex flex-col items-center gap-2 transition-all">
                        <ImageIcon className="w-5 h-5 text-purple-400" />
                        <span className="text-xs text-white">Más Fotos</span>
                    </button>
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 flex flex-col items-center gap-2 transition-all">
                        <Video className="w-5 h-5 text-red-400" />
                        <span className="text-xs text-white">Video</span>
                    </button>
                </div>
            )}

            {/* AI RESULT & CONFIRMATION */}
            {analysisComplete && (
                <div className="bg-brand-gold/5 border border-brand-gold/30 rounded-xl p-6 animate-in zoom-in slide-in-from-top-4 space-y-6">

                    {/* Findings */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center shrink-0">
                            <Wand2 className="w-5 h-5 text-brand-coffee-dark" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-brand-gold mb-1">Análisis de Inteligencia Artificial</h4>
                            <p className="text-sm text-white/80">
                                Según el <strong>Certificado de Libertad</strong>, esto es una <strong>Propiedad Horizontal</strong>.
                                <br />Las fotos sugieren acabados <strong>Remodelados</strong>.
                            </p>
                            {formData.atributosIA && (
                                <div className="flex gap-2 mt-2">
                                    <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full flex items-center gap-1 border border-green-500/20">
                                        <ShieldCheck className="w-3 h-3" /> Jurídicamente Viable
                                    </span>
                                    {formData.atributosIA.estiloVida?.map(tag => (
                                        <span key={tag} className="text-[10px] bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded-full border border-brand-gold/20">
                                            ✨ {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="h-px bg-white/10 w-full" />

                    {/* Taxonomy Verification */}
                    <div>
                        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                            1. Confirma la Clasificación
                            <span className="text-[10px] font-normal text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded">Autodetectado</span>
                        </h3>

                        {/* Category Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {Object.entries(TAXONOMIES).map(([catName, subTypes]) => (
                                <div
                                    key={catName}
                                    onClick={() => updateData({ categoria: catName as TitanFormData['categoria'], tipoInmueble: "" })}
                                    className={`p-4 rounded-xl border transition-all cursor-pointer ${formData.categoria === catName
                                        ? "bg-white/10 border-brand-gold ring-1 ring-brand-gold"
                                        : "bg-white/5 border-white/10 hover:bg-white/10 opacity-50 hover:opacity-100"
                                        }`}
                                >
                                    <h3 className={`font-bold text-sm mb-1 ${formData.categoria === catName ? "text-brand-gold" : "text-white"}`}>
                                        {catName}
                                    </h3>
                                    <div className="flex flex-wrap gap-1">
                                        {subTypes.slice(0, 3).map(sub => (
                                            <span key={sub} className="text-[10px] text-white/40 bg-black/20 px-1.5 py-0.5 rounded">
                                                {sub}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* SubCategory Selection */}
                        {formData.categoria && TAXONOMIES[formData.categoria] && (
                            <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                                <h3 className="text-xs font-medium text-white/50 mb-3 block">Tipo Exacto:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {TAXONOMIES[formData.categoria].map((sub: string) => (
                                        <button
                                            key={sub}
                                            onClick={() => updateData({ tipoInmueble: sub })}
                                            className={`px-4 py-2 rounded-lg text-sm transition-all ${formData.tipoInmueble === sub
                                                ? "bg-brand-gold text-brand-coffee-dark font-bold shadow-lg scale-105"
                                                : "bg-white/5 text-white hover:bg-white/15"
                                                }`}
                                        >
                                            {sub}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Role & Business Type */}
                    <div>
                        <h3 className="text-sm font-bold text-white mb-3">2. Confirma tu Rol y Objetivo</h3>
                        <div className="flex flex-wrap gap-4">
                            {/* Rol */}
                            <div className="bg-white/5 p-1 rounded-lg flex gap-1">
                                {(['Propietario', 'Agente'] as const).map((rol) => (
                                    <button
                                        key={rol}
                                        onClick={() => updateData({ rolUsuario: rol })}
                                        className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${formData.rolUsuario === rol
                                            ? "bg-brand-gold text-brand-coffee-dark shadow"
                                            : "text-white/50 hover:text-white"
                                            }`}
                                    >
                                        Soy {rol}
                                    </button>
                                ))}
                            </div>

                            {/* Negocio */}
                            <div className="inline-flex flex-wrap gap-2 bg-white/5 p-1 rounded-lg">
                                {(["Venta", "Arriendo", "Permuta"] as const).map((negocio) => (
                                    <button
                                        key={negocio}
                                        onClick={() => updateData({ tipoNegocio: negocio })}
                                        className={`px-4 py-1.5 rounded-md text-xs transition-all ${formData.tipoNegocio === negocio
                                            ? "bg-brand-gold text-brand-coffee-dark font-bold shadow"
                                            : "text-white/70 hover:bg-white/10"
                                            }`}
                                    >
                                        {negocio}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Actions */}
            <div className="flex justify-end pt-4">
                <button
                    onClick={handleNext}
                    disabled={!analysisComplete || !formData.categoria || !formData.tipoInmueble || !formData.tipoNegocio}
                    className="btn-gold px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-brand-gold/20"
                >
                    Validar y Continuar <CheckCircle2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
