"use client";

import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types/property";
import { MapPin, Bed, Bath, Car, Ruler } from "lucide-react";

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    return (
        <Link href={`/propiedades/${property.id}`} className="group">
            <div className="glass-inner overflow-hidden hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
                {/* Image Container */}
                <div className="relative h-64 w-full overflow-hidden">
                    <Image
                        src={property.imagenes[0] || "/placeholder-property.jpg"}
                        alt={property.titulo}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${property.tipo === 'Venta'
                                ? 'bg-brand-emerald text-white'
                                : 'bg-brand-gold text-brand-coffee-dark'
                            }`}>
                            {property.tipo}
                        </span>
                        {property.destacado && (
                            <span className="bg-brand-orange text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                Destacado
                            </span>
                        )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-2xl font-bold text-white text-shadow-black">
                            ${property.precio.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-brand-gold transition-colors">
                            {property.titulo}
                        </h3>
                        <div className="flex items-center text-white/70 text-sm mb-4">
                            <MapPin className="w-4 h-4 mr-1 text-brand-gold" />
                            <span className="line-clamp-1">{property.ubicacion.barrio ? `${property.ubicacion.barrio}, ` : ''}{property.ubicacion.ciudad}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 text-sm text-white/60 border-t border-white/10 pt-4">
                        <div className="flex items-center gap-2">
                            <Ruler className="w-4 h-4 text-brand-gold" />
                            <span>{property.caracteristicas.area} m²</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Bed className="w-4 h-4 text-brand-gold" />
                            <span>{property.caracteristicas.habitaciones} Hab</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Bath className="w-4 h-4 text-brand-gold" />
                            <span>{property.caracteristicas.banos} Baños</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Car className="w-4 h-4 text-brand-gold" />
                            <span>{property.caracteristicas.garajes} Garaje</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
