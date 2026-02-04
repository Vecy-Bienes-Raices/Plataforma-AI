// Map short codes to property IDs
export const propertyCodeMap: Record<string, string> = {
    'teu001': 'teusaquillo-001',
    // Add more mappings as needed
};

export function getPropertyIdFromCode(code: string): string | null {
    return propertyCodeMap[code] || null;
}

export function getCodeFromPropertyId(propertyId: string): string | null {
    for (const [code, id] of Object.entries(propertyCodeMap)) {
        if (id === propertyId) return code;
    }
    return null;
}
