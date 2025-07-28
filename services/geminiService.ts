
import { GoogleGenAI } from "@google/genai";
import { FormData, Translations } from '../types';

// La inicialización del cliente de la API asume que `process.env.API_KEY` está disponible en el entorno de ejecución.
// No se debe solicitar al usuario que introduzca la clave.
let ai: GoogleGenAI;
try {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
} catch(e) {
    console.error("Error initializing GoogleGenAI. Is API_KEY set?", e);
    // You might want to handle this case in the UI, e.g., disable AI features.
}


export const generateActivityDescription = async (
    formData: Pick<FormData, 'nombre' | 'apellido1' | 'nacionalidad' | 'descripcionActividad'>,
    t: Translations
): Promise<string> => {
    if (!ai) {
        throw new Error(t.errorAiCliente);
    }
    
    const prompt = `
        Eres un asesor experto en la creación de empresas en España.
        Tu tarea es generar una descripción de actividad económica profesional, concisa y adecuada para el alta de un trabajador autónomo (autónomo).

        Datos del cliente:
        - Nombre: ${formData.nombre} ${formData.apellido1}
        - Nacionalidad: ${formData.nacionalidad}
        - Ideas/palabras clave proporcionadas por el cliente: "${formData.descripcionActividad}"

        Instrucciones:
        1.  Basándote en las palabras clave, redacta una descripción de entre 20 y 50 palabras.
        2.  La descripción debe ser profesional y creíble para los organismos oficiales españoles (Hacienda, Seguridad Social).
        3.  Debe sonar natural y específica. Evita jerga demasiado técnica a menos que sea imprescindible.
        4.  Si las palabras clave son ambiguas o muy cortas (p.ej. "informática", "diseño"), crea una descripción más completa y plausible. Por ejemplo, para "informática", podrías sugerir "Desarrollo de soluciones de software a medida, consultoría de sistemas y mantenimiento de infraestructuras IT para pymes.".
        5.  Devuelve únicamente el texto de la descripción, sin introducciones, saludos, ni formato markdown.

        Ejemplo de salida para "consultor marketing digital":
        "Prestación de servicios de consultoría en marketing digital, incluyendo gestión de redes sociales, optimización de motores de búsqueda (SEO), y creación y seguimiento de campañas de publicidad online para empresas y profesionales."

        Ahora, genera la descripción para el cliente actual.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.7,
            }
        });
        
        const text = response.text;

        if (!text) {
             throw new Error(t.errorAiRespuestaVacia);
        }
        
        return text.trim();

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error(t.errorAiGenerar);
    }
};
