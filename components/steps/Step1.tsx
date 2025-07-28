
import React, { useEffect, useCallback } from 'react';
import { StepInputProps } from '../../types';
import InputField from '../InputField';
import { lookupPostalCode } from '../../services/locationService';

const Step1: React.FC<StepInputProps> = ({ formData, handleChange, setFormData, t }) => {

    const handlePostalCodeChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const cp = e.target.value;
        setFormData(prev => ({ ...prev, codigoPostal: cp }));

        if (cp.length === 5) {
            const location = await lookupPostalCode(cp);
            if (location) {
                setFormData(prev => ({
                    ...prev,
                    poblacion: location.poblacion,
                    provincia: location.provincia
                }));
            }
        }
    }, [setFormData]);

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">{t.step1Title}</h2>
            <div className="grid md:grid-cols-2 gap-x-6">
                <InputField id="dniNie" label={t.dniNie} value={formData.dniNie} onChange={handleChange} />
                <InputField id="nacionalidad" label={t.nacionalidad} value={formData.nacionalidad} onChange={handleChange} />
            </div>
            <div className="grid md:grid-cols-3 gap-x-6">
                <InputField id="nombre" label={t.nombre} value={formData.nombre} onChange={handleChange} />
                <InputField id="apellido1" label={t.apellido1} value={formData.apellido1} onChange={handleChange} />
                <InputField id="apellido2" label={t.apellido2} value={formData.apellido2} onChange={handleChange} />
            </div>
            <InputField id="fechaNacimiento" label={t.fechaNacimiento} type="date" value={formData.fechaNacimiento} onChange={handleChange} required={true} />
            
            <fieldset className="border p-4 rounded-lg mb-4 dark:border-gray-600">
                <legend className="px-2 font-semibold text-gray-800 dark:text-gray-200">{t.direccion}</legend>
                <div className="grid grid-cols-6 gap-x-4">
                    <div className="col-span-6 sm:col-span-2"><InputField id="tipoVia" label={t.tipoVia} value={formData.tipoVia} onChange={handleChange} /></div>
                    <div className="col-span-6 sm:col-span-4"><InputField id="nombreVia" label={t.nombreVia} value={formData.nombreVia} onChange={handleChange} /></div>
                    <div className="col-span-2 sm:col-span-1"><InputField id="numero" label={t.numero} value={formData.numero} onChange={handleChange} /></div>
                    <div className="col-span-2 sm:col-span-1"><InputField id="piso" label={t.piso} value={formData.piso} onChange={handleChange} required={false}/></div>
                    <div className="col-span-2 sm:col-span-1"><InputField id="puerta" label={t.puerta} value={formData.puerta} onChange={handleChange} required={false}/></div>
                    <div className="col-span-6 sm:col-span-3"><InputField id="codigoPostal" label={t.codigoPostal} value={formData.codigoPostal} onChange={handlePostalCodeChange} maxLength={5} /></div>
                    <div className="col-span-6 sm:col-span-3"><InputField id="poblacion" label={t.poblacion} value={formData.poblacion} onChange={handleChange} /></div>
                    <div className="col-span-6 sm:col-span-3"><InputField id="provincia" label={t.provincia} value={formData.provincia} onChange={handleChange} /></div>
                </div>
            </fieldset>

            <div className="grid md:grid-cols-2 gap-x-6">
                <InputField id="nombrePadre" label={t.nombrePadre} value={formData.nombrePadre} onChange={handleChange} />
                <InputField id="nombreMadre" label={t.nombreMadre} value={formData.nombreMadre} onChange={handleChange} />
            </div>
            <div className="grid md:grid-cols-2 gap-x-6">
                <InputField id="telefono" label={t.telefono} type="tel" value={formData.telefono} onChange={handleChange} hint={t.contactoOficialHint} />
                <InputField id="email" label={t.email} type="email" value={formData.email} onChange={handleChange} hint={t.contactoOficialHint} />
            </div>
        </div>
    );
};

export default Step1;
