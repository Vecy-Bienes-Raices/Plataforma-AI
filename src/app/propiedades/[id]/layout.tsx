import { Metadata } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Property } from "@/types/property";

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { id } = await params;
    const resolvedSearchParams = await searchParams;
    const mode = resolvedSearchParams.mode as string | undefined;
    const isAliadoMode = mode === 'aliado';

    try {
        // Fetch property data from Firestore
        const docRef = doc(db, "properties", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return {
                title: "Propiedad no encontrada | VECY AI",
                description: "La propiedad que buscas no está disponible.",
            };
        }

        const property = docSnap.data() as Property;
        const firstImage = property.imagenes?.[0] || "/vecyai.png";
        const propertyTitle = property.titulo || "Propiedad Exclusiva";
        const propertyDescription = property.descripcion?.substring(0, 155) || "Descubre esta increíble propiedad";

        // MODO ALIADO: Sin SEO, solo preview visual básico
        if (isAliadoMode) {
            return {
                title: "Propiedad Exclusiva",
                description: "Conoce esta increíble oportunidad inmobiliaria.",
                robots: {
                    index: false,
                    follow: false,
                    nocache: true,
                },
                // NO Open Graph ni Twitter para evitar rastreo social
            };
        }

        // MODO NORMAL: SEO Completo
        return {
            title: `${propertyTitle} | VECY AI`,
            description: propertyDescription,
            keywords: [
                property.tipoInmueble,
                property.tipo,
                property.ubicacion?.ciudad,
                property.ubicacion?.barrio,
                "VECY",
                "bienes raíces"
            ].filter(Boolean) as string[],

            openGraph: {
                title: propertyTitle,
                description: propertyDescription,
                url: `https://vecy-plataforma-ai.vercel.app/propiedades/${id}`,
                siteName: "VECY AI",
                images: [
                    {
                        url: firstImage.startsWith('http') ? firstImage : `https://vecy-plataforma-ai.vercel.app${firstImage}`,
                        width: 1200,
                        height: 630,
                        alt: propertyTitle,
                    },
                ],
                locale: "es_CO",
                type: "website",
            },

            twitter: {
                card: "summary_large_image",
                title: propertyTitle,
                description: propertyDescription,
                images: [firstImage.startsWith('http') ? firstImage : `https://vecy-plataforma-ai.vercel.app${firstImage}`],
            },

            robots: {
                index: true,
                follow: true,
            },
        };

    } catch (error) {
        console.error("Error generating metadata:", error);
        return {
            title: "Error | VECY AI",
            description: "Hubo un error al cargar la propiedad.",
        };
    }
}

export default function PropertyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
