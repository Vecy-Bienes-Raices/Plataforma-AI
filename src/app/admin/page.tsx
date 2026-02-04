"use client";

import TitanWizard from "@/components/admin/titan-form/TitanWizard";
import Step1Classification from "@/components/admin/titan-form/steps/Step1Classification";
import Step2Location from "@/components/admin/titan-form/steps/Step2Location";
import Step3Details from "@/components/admin/titan-form/steps/Step3Details";
import Step4Owner from "@/components/admin/titan-form/steps/Step4Owner";
import Step6Contract from "@/components/admin/titan-form/steps/Step6Contract";
import { useTitanStore } from "@/components/admin/titan-form/useTitanStore";

export default function AdminDashboard() {
    const { currentStep } = useTitanStore();

    return (
        <div className="max-w-4xl mx-auto">
            <TitanWizard />

            <div className="glass-inner p-8 mt-8 min-h-[500px]">
                {currentStep === 1 && <Step1Classification />}
                {currentStep === 2 && <Step2Location />}
                {currentStep === 3 && <Step3Details />}
                {currentStep === 4 && <Step4Owner />}
                {/* Repurpose Step 6 component for Step 5 logic. Ideally rename component later. */}
                {currentStep === 5 && <Step6Contract />}
            </div>
        </div>
    );
}
