
import React from 'react';
import { StepInputProps } from '../../types';
import InputField from '../InputField';
import SelectField from '../SelectField';
import TextAreaField from '../TextAreaField';

const Step2: React.FC<StepInputProps> = ({ formData, handleChange, t }) => {
    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">{t.step2Title}</h2>
            
            <InputField 
                id="fechaLlegada" 
                label={t.fechaLlegada} 
                type="date" 
                value={formData.fechaLlegada} 
                onChange={handleChange} 
                required={false} 
            />
            
            <TextAreaField 
                id="comentariosLlegada" 
                label={t.comentariosLlegada} 
                value={formData.comentariosLlegada} 
                onChange={handleChange} 
            />
            
            <SelectField 
                id="resideMas183Dias" 
                label={t.resideMas183Dias} 
                value={formData.resideMas183Dias} 
                onChange={handleChange}
            >
                <option value="si">{t.si}</option>
                <option value="no">{t.no}</option>
            </SelectField>
            
            {formData.resideMas183Dias === 'no' && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md animate-fade-in">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-300">{t.datoAdicional}</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mb-4">{t.paisResidenciaFiscalHint}</p>
                    <InputField 
                        id="paisResidenciaFiscal" 
                        label={t.paisResidenciaFiscal} 
                        value={formData.paisResidenciaFiscal} 
                        onChange={handleChange} 
                    />
                </div>
            )}
        </div>
    );
};

export default Step2;
