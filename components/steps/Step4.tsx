
import React from 'react';
import { StepInputProps } from '../../types';
import InputField from '../InputField';
import SelectField from '../SelectField';
import InfoBox from '../InfoBox';

const Step4: React.FC<StepInputProps> = ({ formData, handleChange, t }) => {
    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">{t.step4Title}</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
                <SelectField id="operaIntracomunitario" label={t.operaIntracomunitario} value={formData.operaIntracomunitario} onChange={handleChange}>
                    <option value="no">{t.no}</option>
                    <option value="si">{t.si}</option>
                </SelectField>
                <SelectField id="ejerceEnLocal" label={t.ejerceEnLocal} value={formData.ejerceEnLocal} onChange={handleChange}>
                    <option value="no">{t.no}</option>
                    <option value="si">{t.si}</option>
                </SelectField>
            </div>
            
            {formData.operaIntracomunitario === 'si' && <InfoBox title="Info ROI" variant="warning">{t.infoROI}</InfoBox>}
            {formData.ejerceEnLocal === 'si' && <InfoBox title="Info Local" variant="warning">{t.infoLocal}</InfoBox>}
            
            <div className="grid md:grid-cols-2 gap-6 mt-4">
                <InputField id="mutua" label={t.mutua} value={formData.mutua} onChange={handleChange} />
                <InputField 
                    id="rendimientoNetoPrevisto" 
                    label={t.rendimientoNetoPrevisto} 
                    value={formData.rendimientoNetoPrevisto} 
                    onChange={handleChange}
                    type="number"
                />
            </div>

            <InfoBox title={`Aviso sobre ${t.rendimientoNetoPrevisto}`}>{t.infoRendimientoPrevisto}</InfoBox>
            
            <div className="mt-6 space-y-4">
                <SelectField id="disfrutaTarifaReducida" label={t.disfrutaTarifaReducida} value={formData.disfrutaTarifaReducida} onChange={handleChange}>
                    <option value="si">{t.si}</option>
                    <option value="no">{t.no}</option>
                </SelectField>
                
                {formData.disfrutaTarifaReducida === 'no' && 
                    <>
                        <InfoBox title="Info Ingresos Reales" variant="warning">{t.infoIngresosReales}</InfoBox>
                        <InputField id="baseCotizacionElegida" label={t.baseCotizacionElegida} value={formData.baseCotizacionElegida} onChange={handleChange} type="number" hint={t.baseCotizacionHint} required={true}/>
                    </>
                }
                <InfoBox title={t.infoTarifaReducidaTitle}>{t.infoTarifaReducidaContent}</InfoBox>

                <SelectField id="incluirBeneficiarios" label={t.incluirBeneficiarios} value={formData.incluirBeneficiarios} onChange={handleChange}>
                    <option value="no">{t.no}</option>
                    <option value="si">{t.si}</option>
                </SelectField>
                
                {formData.incluirBeneficiarios === 'si' && <InfoBox title={t.infoBeneficiariosTitle}>{t.infoBeneficiariosContent}</InfoBox>}
            </div>
        </div>
    );
};

export default Step4;
