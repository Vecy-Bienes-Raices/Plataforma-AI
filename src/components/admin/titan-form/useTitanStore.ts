import { create } from 'zustand';
import { TitanFormData, initialTitanData } from './types';

interface TitanState {
    currentStep: number;
    totalSteps: number;
    formData: TitanFormData;

    // Actions
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    updateData: (data: Partial<TitanFormData>) => void;
    resetForm: () => void;
}

export const useTitanStore = create<TitanState>((set) => ({
    currentStep: 1,
    totalSteps: 6, // 1.Clasificación, 2.Ubicación, 3.Detalles, 4.Propietario, 5.Multimedia, 6.Legal/Firmar
    formData: initialTitanData,

    setStep: (step) => set({ currentStep: step }),
    nextStep: () => set((state) => ({
        currentStep: Math.min(state.currentStep + 1, state.totalSteps)
    })),
    prevStep: () => set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 1)
    })),
    updateData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
    })),
    resetForm: () => set({
        currentStep: 1,
        formData: initialTitanData
    }),
}));
