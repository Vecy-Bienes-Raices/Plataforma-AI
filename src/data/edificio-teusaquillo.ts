
import { Property } from '@/types/property';

export interface EdificioProps extends Property {
    valorAdmin: string;
    rentaMensual: string;
    labelExtra: string;
    roiAnual: string;
    detalles: {
        label: string;
        value: string;
        icon: string;
    }[];
    caracteristicasInternas: {
        name: string;
        emoji: string;
    }[];
    caracteristicasExternas?: {
        name: string;
        emoji: string;
    }[];
    sitiosCercanos?: {
        name: string;
        emoji: string;
        distancia?: string;
    }[];
    roiDetails: {
        list: string[];
        total: string;
        note: string;
    };
    videoUrl?: string;
}

export const EDIFICIO_TEUSAQUILLO: EdificioProps = {
    id: "teusaquillo-001",
    titulo: "Edificio Teusaquillo Bogotá",
    descripcion: "Propiedad de Inversión Híbrida: Combina la estabilidad de contratos a largo plazo (Local, Clínica, Oficinas) con el alto flujo de caja del modelo Airbnb/Coliving en los pisos superiores. Edificio de 4 pisos remodelado, con local comercial, clínica odontológica, oficinas y apartamentos.",
    precio: 3000000000,
    ubicacion: {
        direccion: "Barrio San Luis",
        ciudad: "Bogotá",
        barrio: "Teusaquillo"
    },
    caracteristicas: {
        area: 1068,
        habitaciones: 20,
        banos: 15,
        garajes: 0
    },
    tipo: "Venta",
    tipoInmueble: "Edificio",
    imagenes: [
        "/propiedades/edificio-teusaquillo/1.png",
        "/propiedades/edificio-teusaquillo/2.jpg",
        "/propiedades/edificio-teusaquillo/3.jpg",
        "/propiedades/edificio-teusaquillo/4.jpg",
        "/propiedades/edificio-teusaquillo/5.jpg",
        "/propiedades/edificio-teusaquillo/6.jpg",
        "/propiedades/edificio-teusaquillo/7.jpg",
        "/propiedades/edificio-teusaquillo/8.jpg"
    ],
    destacado: true,

    // Campos extendidos Específicos
    valorAdmin: "N/A",
    rentaMensual: "$18.960.000 /mes",
    labelExtra: "💰 Renta Mensual Actual",
    roiAnual: "7.58% Anual",
    detalles: [
        { label: "Área Const.", value: "1.068 m²", icon: "📐" },
        { label: "Lote", value: "12 x 30 m", icon: "📏" },
        { label: "Remodelado", value: "Hace 2 años", icon: "🛠️" },
        { label: "Antigüedad", value: "Estructura Antisísmica", icon: "🏗️" },
        { label: "Estrato", value: "4 (Comercial/Mixto)", icon: "✨" },
        { label: "Estado", value: "Remodelado - Triple AAA", icon: "⭐" },
        { label: "ROI Est.", value: "7.58% Anual", icon: "📈" },
        { label: "Pisos", value: "4 Niveles", icon: "🏢" },
        { label: "Unidades", value: "20 Hab + Ofis + Local", icon: "🔑" }
    ],
    caracteristicasInternas: [
        { name: "Local 40m² (1º Piso)", emoji: "🏪" },
        { name: "Clínica 9 Consultorios", emoji: "⚕️" },
        { name: "9 Oficinas (2º Piso)", emoji: "💼" },
        { name: "20 Habitaciones (3º/4º)", emoji: "🛏️" }
    ],
    caracteristicasExternas: [
        { name: "Zona Comercial", emoji: "🛍️" },
        { name: "Vías Principales", emoji: "🛣️" },
        { name: "Parques Cercanos", emoji: "🌳" },
        { name: "Transporte Público", emoji: "🚌" }
    ],
    sitiosCercanos: [
        { name: "Park Way", emoji: "🌳", distancia: "5 min" },
        { name: "Transmilenio Cll 45", emoji: "🚌", distancia: "2 min" },
        { name: "Zona Bancaria", emoji: "🏦", distancia: "3 min" },
        { name: "Univ. Javeriana", emoji: "🎓", distancia: "10 min" }
    ],
    roiDetails: {
        list: [
            "Local Comercial: $2.400.000",
            "Clínica Odontológica: $2.900.000",
            "Piso 2 (Oficinas): $4.660.000",
            "Pisos 3 y 4 (Airbnb): $9.000.000"
        ],
        total: "$18.960.000 /mes",
        note: "La clínica tiene un potencial de $5.8M (actual $2.9M ocupado por propietario)."
    },
    videoUrl: "/propiedades/edificio-teusaquillo/video.mp4"
};
