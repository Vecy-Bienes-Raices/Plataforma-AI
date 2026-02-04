import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VECY AI | Plataforma Inmobiliaria Inteligente",
  description: "Gestión inmobiliaria avanzada con Inteligencia Artificial y diseño Premium. Encuentra tu propiedad ideal con tecnología de vanguardia.",
  keywords: ["inmobiliaria", "propiedades", "bienes raíces", "VECY", "inteligencia artificial", "Colombia"],
  authors: [{ name: "VECY Bienes Raíces" }],
  creator: "VECY Bienes Raíces",
  publisher: "VECY Bienes Raíces",
  metadataBase: new URL('https://vecy-plataforma-ai.vercel.app'),

  // Open Graph
  openGraph: {
    title: "VECY AI | Plataforma Inmobiliaria Inteligente",
    description: "Gestión inmobiliaria avanzada con Inteligencia Artificial y diseño Premium.",
    url: "https://vecy-plataforma-ai.vercel.app",
    siteName: "VECY AI",
    images: [
      {
        url: "/vecyai.png",
        width: 1200,
        height: 630,
        alt: "VECY AI - Plataforma Inmobiliaria",
      },
    ],
    locale: "es_CO",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "VECY AI | Plataforma Inmobiliaria Inteligente",
    description: "Gestión inmobiliaria avanzada con Inteligencia Artificial y diseño Premium.",
    images: ["/vecyai.png"],
  },

  // Icons/Favicon
  icons: {
    icon: "/vecyai.png",
    shortcut: "/vecyai.png",
    apple: "/vecyai.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}

