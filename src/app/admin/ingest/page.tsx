"use client";

import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { EDIFICIO_TEUSAQUILLO } from "@/data/edificio-teusaquillo";
import { Check, Upload, AlertTriangle } from "lucide-react";

export default function IngestPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleIngest = async () => {
        try {
            setStatus("loading");
            setMessage("Iniciando carga de datos...");

            // 1. Prepare Data
            // Ensure ID is set
            const propertyId = "teusaquillo-001";
            const dataToUpload = {
                ...EDIFICIO_TEUSAQUILLO,
                id: propertyId,
                lastUpdated: new Date().toISOString()
            };

            // 2. Write to Firestore
            await setDoc(doc(db, "properties", propertyId), dataToUpload);

            setStatus("success");
            setMessage(`¡Éxito! Propiedad '${propertyId}' subida correctamente a Firestore.`);

        } catch (error: any) {
            console.error("Error uploading data:", error);
            setStatus("error");
            setMessage(`Error: ${error.message || "Unknown error"}`);
        }
    };

    return (
        <div className="min-h-screen bg-stone-900 text-white p-8 font-['Outfit'] flex flex-col items-center justify-center">
            <div className="max-w-md w-full glass-panel p-8 text-center border border-white/10 rounded-2xl">
                <h1 className="text-3xl font-bold mb-6 text-brand-gold">Ingestión de Datos</h1>
                <p className="text-gray-400 mb-8">
                    Sube los datos locales de <strong>Edificio Teusaquillo</strong> a la base de datos de producción (Firestore).
                </p>

                {status === "idle" && (
                    <button
                        onClick={handleIngest}
                        className="btn-gold w-full flex items-center justify-center gap-2 py-4 font-bold text-lg"
                    >
                        <Upload className="w-5 h-5" />
                        Subir Datos Ahora
                    </button>
                )}

                {status === "loading" && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-brand-gold animate-pulse">Subiendo a Firestore...</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="bg-green-500/20 border border-green-500/50 p-6 rounded-xl animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-center mb-4">
                            <div className="bg-green-500 rounded-full p-2">
                                <Check className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-green-400 mb-2">¡Carga Exitosa!</h3>
                        <p className="text-green-200/80 text-sm">{message}</p>
                    </div>
                )}

                {status === "error" && (
                    <div className="bg-red-500/20 border border-red-500/50 p-6 rounded-xl animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-center mb-4">
                            <div className="bg-red-500 rounded-full p-2">
                                <AlertTriangle className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-red-400 mb-2">Error de Carga</h3>
                        <p className="text-red-200/80 text-sm">{message}</p>
                        <button
                            onClick={() => setStatus("idle")}
                            className="mt-4 text-sm underline hover:text-white"
                        >
                            Intentar de nuevo
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
