"use client";

import { useState } from "react";
import { Property } from "@/types/property";
import PropertyCard from "@/components/PropertyCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { EDIFICIO_TEUSAQUILLO } from "@/data/edificio-teusaquillo";

// Mock Data (Temporary until Firebase integration)
const MOCK_PROPERTIES: Property[] = [
    {
        id: "1",
        titulo: "Apartamento de Lujo en Rosales",
        descripcion: "Espectacular apartamento con vista a la ciudad.",
        precio: 1500000000,
        ubicacion: {
            direccion: "Cra 1 # 70",
            ciudad: "Bogotá",
            barrio: "Rosales"
        },
        caracteristicas: {
            area: 120,
            habitaciones: 3,
            banos: 3,
            garajes: 2
        },
        tipo: "Venta",
        tipoInmueble: "Apartamento",
        imagenes: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"],
        destacado: true
    },
    {
        id: "2",
        titulo: "Casa Campestre en La Calera",
        descripcion: "Hermosa casa rodeada de naturaleza.",
        precio: 2800000000,
        ubicacion: {
            direccion: "Vía La Calera km 5",
            ciudad: "La Calera"
        },
        caracteristicas: {
            area: 350,
            habitaciones: 4,
            banos: 5,
            garajes: 4
        },
        tipo: "Venta",
        tipoInmueble: "Casa",
        imagenes: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"]
    },
    {
        id: "3",
        titulo: "Apartaestudio Moderno Chapinero",
        descripcion: "Ideal para inversión o estudiantes.",
        precio: 450000000,
        ubicacion: {
            direccion: "Calle 60 # 7",
            ciudad: "Bogotá",
            barrio: "Chapinero Alto"
        },
        caracteristicas: {
            area: 45,
            habitaciones: 1,
            banos: 1,
            garajes: 0
        },
        tipo: "Venta",
        tipoInmueble: "Apartamento",
        imagenes: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"]
    },
    // Ingestión: Edificio Teusaquillo
    EDIFICIO_TEUSAQUILLO as unknown as Property
];

export default function PropertiesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [properties] = useState<Property[]>(MOCK_PROPERTIES);

    const filteredProperties = properties.filter(p =>
        p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.ubicacion.ciudad.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen p-4 md:p-8 pt-24 space-y-8 max-w-7xl mx-auto">

            {/* Header & Search */}
            <div className="glass-panel p-6 md:p-8 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-center">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-white mb-2">
                            Portafolio Exclusivo
                        </h1>
                        <p className="text-white/60">Encuentra la propiedad de tus sueños con la mejor asesoría.</p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <input
                                type="text"
                                placeholder="Buscar por ubicación, nombre..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-3 text-white focus:border-brand-gold outline-none placeholder:text-white/20 transition-all focus:bg-white/10"
                            />
                            <Search className="absolute left-4 top-3.5 w-5 h-5 text-white/30" />
                        </div>
                        <button
                            onClick={() => alert("Filtros avanzados estarán disponibles pronto.")}
                            className="btn-gold !px-4 !aspect-square md:!aspect-auto flex items-center justify-center"
                        >
                            <SlidersHorizontal className="w-5 h-5 md:mr-2" />
                            <span className="hidden md:inline">Filtros</span>
                        </button>
                    </div>
                </div>

                {/* Background decorative blob */}
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -z-0 pointer-events-none" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>

            {filteredProperties.length === 0 && (
                <div className="text-center py-20 text-white/40">
                    <p className="text-lg">No se encontraron propiedades que coincidan con tu búsqueda.</p>
                </div>
            )}

        </div>
    );
}
