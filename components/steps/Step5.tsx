
import React from 'react';
import { StepProps } from '../../types';
import EditableField from '../EditableField';

const SummaryItem: React.FC<{ label: string; value: string; onSave: (newValue: string) => void; type?: 'text'|'date'|'textarea', t: any }> = ({ label, value, onSave, type, t }) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
            <EditableField value={value} onSave={onSave} label={label} type={type} t={t} />
        </dd>
    </div>
);

const SummarySection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4 border-b pb-2 dark:border-gray-600">{title}</h3>
        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
            {children}
        </dl>
    </div>
);


const Step5: React.FC<StepProps> = ({ formData, setFormData, t }) => {
    
    const handleSave = (field: keyof typeof formData) => (newValue: string) => {
        setFormData(prev => ({ ...prev, [field]: newValue }));
    };

    return (
        <div className="animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">{t.resumenTitle}</h2>
                <p className="text-gray-600 dark:text-gray-400">{t.resumenSubtitle}</p>
            </div>
            
            <div className="space-y-6">
                <SummarySection title={t.step1Title}>
                    <SummaryItem label={t.dniNie} value={formData.dniNie} onSave={handleSave('dniNie')} t={t} />
                    <SummaryItem label={t.nombre} value={formData.nombre} onSave={handleSave('nombre')} t={t} />
                    <SummaryItem label={t.apellido1} value={formData.apellido1} onSave={handleSave('apellido1')} t={t} />
                    <SummaryItem label={t.apellido2} value={formData.apellido2} onSave={handleSave('apellido2')} t={t} />
                    <SummaryItem label={t.fechaNacimiento} value={formData.fechaNacimiento} onSave={handleSave('fechaNacimiento')} type="date" t={t} />
                    <SummaryItem label={t.nacionalidad} value={formData.nacionalidad} onSave={handleSave('nacionalidad')} t={t} />
                    <SummaryItem label={t.telefono} value={formData.telefono} onSave={handleSave('telefono')} t={t} />
                    <SummaryItem label={t.email} value={formData.email} onSave={handleSave('email')} t={t} />
                </SummarySection>

                <SummarySection title={t.step3Title}>
                     <SummaryItem label={t.descripcionActividad} value={formData.descripcionActividad} onSave={handleSave('descripcionActividad')} type="textarea" t={t} />
                     <SummaryItem label={t.iban} value={formData.iban} onSave={handleSave('iban')} t={t} />
                </SummarySection>

                <SummarySection title={t.step4Title}>
                    <SummaryItem label={t.rendimientoNetoPrevisto} value={formData.rendimientoNetoPrevisto} onSave={handleSave('rendimientoNetoPrevisto')} t={t} />
                    {formData.disfrutaTarifaReducida === 'no' && <SummaryItem label={t.baseCotizacionElegida} value={formData.baseCotizacionElegida} onSave={handleSave('baseCotizacionElegida')} t={t} />}
                </SummarySection>
                
                <SummarySection title={t.comentariosFinales}>
                    <EditableField value={formData.comentariosFinales} onSave={handleSave('comentariosFinales')} label={t.comentariosFinales} type="textarea" t={t} />
                </SummarySection>
            </div>
        </div>
    );
};

export default Step5;
