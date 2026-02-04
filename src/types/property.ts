export interface Property {
    id: string;
    titulo: string;
    descripcion: string;
    precio: number;
    ubicacion: {
        direccion: string;
        ciudad: string;
        barrio?: string; // Optional
    };
    caracteristicas: {
        area: number;
        habitaciones: number;
        banos: number;
        garajes: number;
    };
    tipo: 'Venta' | 'Arriendo';
    tipoInmueble: string; // Apartamento, Casa, Lote, etc.
    imagenes: string[];
    destacado?: boolean;
}
