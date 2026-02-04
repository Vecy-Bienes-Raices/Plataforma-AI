export interface TitanFormData {
    // Configuración Inicial
    rolUsuario: 'Propietario' | 'Agente';

    // Step 1: Clasificación Inteligente (Taxonomía VECY)
    categoria: 'Propiedad Horizontal' | 'Propiedad Vertical' | 'Campestre' | 'Comercial' | '';
    tipoInmueble: string; // Subcategoría específica (ej: Pent House, Loft, Casa de conjunto)

    // Atributos IA (Extracción Automática)
    atributosIA?: {
        estadoAcabados?: "Remodelado" | "Original" | "Obra Gris";
        iluminacionNatural?: number; // 1-10
        estiloVida?: string[]; // Pet-friendly, Home-office ready, etc.
        confianza?: number;
    };

    tipoNegocio: 'Venta' | 'Arriendo' | 'Permuta' | '';
    tiempoArrendamiento?: number; // Meses
    condicion: 'Usado' | 'Nuevo' | 'Remodelado' | 'Sobre Planos' | '';

    // Step 2: Ubicación
    direccion: string;
    direccionSecundaria?: string; // Torre, Apto, etc.
    ciudad: string;
    barrio: string;
    localidad?: string;
    estrato?: string;

    // Step 3: Detalles Básicos
    areaPrivada: number;
    areaConstruida: number;
    habitaciones: number;
    banos: number;
    garajes: number;
    piso?: number; // Solo aptos
    valorAdministracion?: number;
    precioVenta: number;

    // Step 4: Propietario (Para Contrato)
    propietarioNombre: string;
    propietarioTipo: 'Natural' | 'Juridica' | '';
    propietarioDocumentoTipo: 'CC' | 'CE' | 'NIT' | 'Pasaporte' | '';
    propietarioDocumentoNumero: string;
    propietarioEmail: string;
    propietarioTelefono: string;

    // Step 5: Legal & Fotos
    matriculaInmobiliaria?: string;
    hipoteca: 'Si' | 'No' | '';
    hipotecaBanco?: string;
    hipotecaValor?: number;
    exclusividad: 'Si' | 'No' | '';

    // Archivos (URLs)
    fotos: string[];
    certificadoTradicion?: string;
    reciboPredial?: string;
    firmaDigital?: string;
}

export const initialTitanData: TitanFormData = {
    rolUsuario: 'Propietario',
    categoria: '',
    tipoInmueble: '',
    tipoNegocio: 'Venta',
    condicion: 'Usado',
    direccion: '',
    ciudad: 'Bogotá D.C.',
    barrio: '',
    areaPrivada: 0,
    areaConstruida: 0,
    habitaciones: 0,
    banos: 0,
    garajes: 0,
    precioVenta: 0,
    propietarioNombre: '',
    propietarioTipo: 'Natural',
    propietarioDocumentoTipo: 'CC',
    propietarioDocumentoNumero: '',
    propietarioEmail: '',
    propietarioTelefono: '',
    hipoteca: 'No',
    exclusividad: 'No',
    fotos: []
};
