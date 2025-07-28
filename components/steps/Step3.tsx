
import React, { useState } from 'react';
import { StepInputProps } from '../../types';
import InputField from '../InputField';
import SelectField from '../SelectField';
import TextAreaField from '../TextAreaField';
import InfoBox from '../InfoBox';
import { Icons } from '../icons';
import { generateActivityDescription } from '../../services/geminiService';

const Step3: React.FC<StepInputProps> = ({ formData, handleChange, setFormData, t }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const handleGenerateWithAI = async () => {
        setIsGenerating(true);
        setError(null);
        try {
            const description = await generateActivityDescription(formData, t);
            setFormData(prev => ({ ...prev, descripcionActividad: description }));
        } catch (err: any) {
            setError(err.message || t.errorDesconocido);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="animate-fade-in">
             <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">{t.step3Title}</h2>
             
             <InputField id="iban" label={t.iban} value={formData.iban} onChange={handleChange} />
             
             <SelectField id="cuentaAbiertaCon" label={t.cuentaAbiertaCon} value={formData.cuentaAbiertaCon} onChange={handleChange}>
                 <option value="dni">{t.dniNie}</option>
                 <option value="pasaporte">{t.pasaporte}</option>
             </SelectField>

             {formData.cuentaAbiertaCon === 'pasaporte' && <InfoBox title={t.alertaPasaporteTitle} variant="warning" defaultOpen={true}>{t.alertaPasaporteContent}</InfoBox>}
             
             <SelectField id="actividadDefinida" label={t.actividadDefinida} value={formData.actividadDefinida} onChange={handleChange}>
                 <option value="si">{t.si}</option>
                 <option value="no">{t.no}</option>
             </SelectField>

             {formData.actividadDefinida === 'si' ? (
                <TextAreaField 
                    id="descripcionActividad"
                    label={t.descripcionActividad}
                    value={formData.descripcionActividad}
                    onChange={handleChange}
                    required={true}
                    placeholder={t.descripcionActividadHint}
                    rows={4}
                >
                    <button 
                        type="button" 
                        onClick={handleGenerateWithAI} 
                        disabled={isGenerating}
                        className="flex items-center gap-2 px-3 py-1 text-sm font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-wait transition-colors"
                    >
                        {isGenerating ? <Icons.Spinner /> : <Icons.Sparkles />}
                        {isGenerating ? t.generando : t.generarConIA}
                    </button>
                </TextAreaField>
             ) : (
                <div className="p-3 mb-4 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600">
                    {t.actividadGenericaInfo}
                </div>
             )}

            {error && <p className="text-red-500 text-sm mt-[-10px] mb-4">{t.errorIA}: {error}</p>}
            
             <SelectField id="situacionLaboral" label={t.situacionLaboral} value={formData.situacionLaboral} onChange={handleChange}>
                 <option value="no">{t.no}</option>
                 <option value="si">{t.si}</option>
             </SelectField>
        </div>
    );
};

export default Step3;
