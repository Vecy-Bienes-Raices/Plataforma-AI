
import { getProperty } from "@/lib/firebase-admin";
import PropertyDetailClient from "@/components/properties/PropertyDetailClient";
import Link from "next/link";

export default async function PropertyDetailPage({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { id } = await params;
    const resolvedSearchParams = await searchParams;

    // Fetch data on the server
    const property = await getProperty(id);

    // Get URL params for initial state
    const mode = resolvedSearchParams.mode as string | undefined;
    const brokerPhone = resolvedSearchParams.broker as string | undefined;

    if (!property) {
        return (
            <div className="min-h-screen bg-stone-950 flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-400 mb-2">Propiedad no encontrada</h1>
                    <p className="text-white/50">ID: {id}</p>
                    <Link href="/propiedades" className="mt-6 inline-block btn-gold p-3 rounded-lg text-stone-900 font-bold">
                        Volver al Listado
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <PropertyDetailClient
            property={property}
            mode={mode}
            brokerPhone={brokerPhone}
        />
    );
}
