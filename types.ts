
export interface FormData {
    // Step 1
    dniNie: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    fechaNacimiento: string;
    tipoVia: string;
    nombreVia: string;
    numero: string;
    piso: string;
    puerta: string;
    codigoPostal: string;
    poblacion: string;
    provincia: string;
    nacionalidad: string;
    nombrePadre: string;
    nombreMadre: string;
    telefono: string;
    email: string;
    // Step 2
    fechaLlegada: string;
    comentariosLlegada: string;
    resideMas183Dias: 'si' | 'no';
    paisResidenciaFiscal: string;
    // Step 3
    iban: string;
    cuentaAbiertaCon: 'dni' | 'pasaporte';
    actividadDefinida: 'si' | 'no';
    descripcionActividad: string;
    situacionLaboral: 'si' | 'no';
    // Step 4
    ejerceEnLocal: 'si' | 'no';
    mutua: string;
    rendimientoNetoPrevisto: string;
    operaIntracomunitario: 'si' | 'no';
    incluirBeneficiarios: 'si' | 'no';
    disfrutaTarifaReducida: 'si' | 'no';
    baseCotizacionElegida: string;
    // Step 5
    comentariosFinales: string;
}

export type Translations = {
    [key: string]: any;
};

// A base prop type for all step components
export interface StepProps {
    formData: FormData;
    t: Translations;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

// Prop type for steps that use the standard `handleChange` for simple inputs
export interface StepInputProps extends StepProps {
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}
