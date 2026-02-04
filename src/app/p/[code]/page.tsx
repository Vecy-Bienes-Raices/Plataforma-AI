"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPropertyIdFromCode } from "@/lib/property-codes";

export default function ShortLinkPage({
    params
}: {
    params: Promise<{ code: string }>
}) {
    const router = useRouter();

    useEffect(() => {
        async function redirect() {
            const { code } = await params;
            const propertyId = getPropertyIdFromCode(code);

            if (propertyId) {
                // Redirect to property page with aliado mode
                router.replace(`/propiedades/${propertyId}?mode=aliado`);
            } else {
                // Invalid code, redirect to home
                router.replace("/");
            }
        }

        redirect();
    }, [params, router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2D1810] via-[#1a0f0a] to-black flex items-center justify-center">
            <div className="text-white text-xl">Cargando propiedad...</div>
        </div>
    );
}
