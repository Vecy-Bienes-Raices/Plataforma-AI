import { Metadata } from "next";
import { adminDb } from "@/lib/firebase-admin";
import { Property } from "@/types/property";

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { id } = await params;
    const resolvedSearchParams = await searchParams;
    const mode = resolvedSearchParams?.mode as string | undefined;
    const isAliadoMode = mode === 'aliado';

    try {
        // Fetch property data from Firestore using Admin SDK
        const docRef = adminDb.collection("properties").doc(id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return {
                title: "Propiedad no encontrada | VECY AI",
                description: "La propiedad que buscas no está disponible.",
            };
        }

        const property = docSnap.data() as Property;
        const firstImage = property.imagenes?.[0] || "/vecyai.png";
        const propertyTitle = property.titulo || "Propiedad Exclusiva";
        const propertyDescription = property.descripcion?.substring(0, 155) || "Descubre esta increíble propiedad";

        // MODO ALIADO: Preview atractivo SIN marca VECY
        if (isAliadoMode) {
            const imageUrl = firstImage.startsWith('http')
                ? firstImage
                : `https://inmuebles-col.vercel.app${firstImage}`;

            // Descripción atractiva para WhatsApp
            const attractiveDesc = `💰 ${formatPrice(property.precio)} | 📍 ${property.ubicacion.barrio || property.ubicacion.ciudad} | 📏 ${property.caracteristicas.area}m²`;

            return {
                title: propertyTitle,
                description: attractiveDesc,
                robots: {
                    index: false,
                    follow: false,
                    nocache: true,
                },
                openGraph: {
                    title: propertyTitle,
                    description: attractiveDesc,
                    url: `https://inmuebles-col.vercel.app/p/teu001`,
                    siteName: "Inmuebles Colombia",
                    images: [
                        {
                            url: imageUrl,
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
                    description: attractiveDesc,
                    images: [imageUrl],
                },
            };
        }

        function formatPrice(price: number): string {
            return `$${price.toLocaleString('es-CO')} COP`;
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
