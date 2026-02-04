"use client";

import { useTitanStore } from "./useTitanStore";
import { MapPin, FileText, User, Stamp, Sparkles } from "lucide-react";

export default function TitanWizard() {
    const { currentStep } = useTitanStore();

    const steps = [
        { id: 1, label: "IA y Documentos", icon: Sparkles },
        { id: 2, label: "Ubicación", icon: MapPin },
        { id: 3, label: "Detalles", icon: FileText },
        { id: 4, label: "Propietario", icon: User },
        { id: 5, label: "Contrato", icon: Stamp },
    ];

    return (
        <div className="w-full mb-8">
            <div className="flex justify-between items-center relative gap-4">
                {/* Progress Line Background */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10" />

                {steps.map((step) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center flex-1">
                            <div
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive
                                    ? "bg-brand-gold text-brand-coffee-dark border-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-110"
                                    : isCompleted
                                        ? "bg-brand-gold/20 text-brand-gold border-brand-gold"
                                        : "bg-black/40 text-white/30 border-white/10"
                                    }`}
                            >
                                <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <span
                                className={`mt-2 text-[10px] md:text-xs font-medium transition-colors text-center ${isActive ? "text-brand-gold" : isCompleted ? "text-white/70" : "text-white/30"
                                    }`}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
