
interface LocationData {
    poblacion: string;
    provincia: string;
}

// En una aplicación real, esto sería una llamada a una API externa.
// Para este ejemplo, usamos un mapa estático más extenso para simular la funcionalidad.
const postalCodeData: Record<string, LocationData> = {
    "46001": { poblacion: "Valencia", provincia: "Valencia" },
    "46002": { poblacion: "Valencia", provincia: "Valencia" },
    "46020": { poblacion: "Valencia", provincia: "Valencia" },
    "28001": { poblacion: "Madrid", provincia: "Madrid" },
    "28004": { poblacion: "Madrid", provincia: "Madrid" },
    "28010": { poblacion: "Madrid", provincia: "Madrid" },
    "08001": { poblacion: "Barcelona", provincia: "Barcelona" },
    "08002": { poblacion: "Barcelona", provincia: "Barcelona" },
    "08010": { poblacion: "Barcelona", provincia: "Barcelona" },
    "41001": { poblacion: "Sevilla", provincia: "Sevilla" },
    "41004": { poblacion: "Sevilla", provincia: "Sevilla" },
    "48001": { poblacion: "Bilbao", provincia: "Bizkaia" },
    "48009": { poblacion: "Bilbao", provincia: "Bizkaia" },
    "33201": { poblacion: "Gijón", provincia: "Asturias" },
    "15001": { poblacion: "A Coruña", provincia: "A Coruña" },
    "29001": { poblacion: "Málaga", provincia: "Málaga" },
    "50001": { poblacion: "Zaragoza", provincia: "Zaragoza" },
};

export const lookupPostalCode = async (cp: string): Promise<LocationData | null> => {
    if (cp.length !== 5) {
        return null;
    }
    // Simula la latencia de red de una llamada a API real
    await new Promise(resolve => setTimeout(resolve, 300));
    return postalCodeData[cp] || null;
};
