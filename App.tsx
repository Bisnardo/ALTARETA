
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { translations, stepsConfig } from './constants';
import { FormData, Translations } from './types';
import { Icons } from './components/icons';
import StepIndicator from './components/StepIndicator';
import IconButton from './components/IconButton';
import Step1 from './components/steps/Step1';
import Step2 from './components/steps/Step2';
import Step3 from './components/steps/Step3';
import Step4 from './components/steps/Step4';
import Step5 from './components/steps/Step5';
import Step6 from './components/steps/Step6';
import { generatePdf, generateXlsx, generateTxt, generateBenetZip } from './services/exportService';

const availableLanguages: { [key: string]: string } = {
    es: 'Español',
    en: 'English',
};

interface LanguageSwitcherProps {
    language: string;
    setLanguage: (lang: string) => void;
    t: Translations;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage, t }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-all flex items-center"
                title={t.cambiarIdioma}
            >
                <Icons.Globe />
                <span className="ml-2 font-semibold uppercase text-xs">{language}</span>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
                    {Object.entries(availableLanguages).map(([code, name]) => (
                        <button
                            key={code}
                            onClick={() => { setLanguage(code); setIsOpen(false); }}
                            className={`text-left w-full px-4 py-2 text-sm ${language === code ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'} hover:bg-gray-100 dark:hover:bg-gray-600`}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}


const App: React.FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        dniNie: '', nombre: '', apellido1: '', apellido2: '', fechaNacimiento: '',
        tipoVia: 'Calle', nombreVia: '', numero: '', piso: '', puerta: '', codigoPostal: '', poblacion: '', provincia: '',
        nacionalidad: 'Española', nombrePadre: '', nombreMadre: '', telefono: '', email: '',
        fechaLlegada: '', comentariosLlegada: '', resideMas183Dias: 'si', paisResidenciaFiscal: '',
        iban: '', cuentaAbiertaCon: 'dni', actividadDefinida: 'si', descripcionActividad: '', situacionLaboral: 'no',
        ejerceEnLocal: 'no', mutua: 'Activa Mutua', rendimientoNetoPrevisto: '1000', operaIntracomunitario: 'no', incluirBeneficiarios: 'no',
        disfrutaTarifaReducida: 'si', baseCotizacionElegida: '',
        comentariosFinales: '',
    });

    const [language, setLanguage] = useState(localStorage.getItem('language') || 'es');
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : true;
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const t = translations[language] || translations.es;

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        document.documentElement.setAttribute('style', `color-scheme: ${isDarkMode ? 'dark' : 'light'}`);
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
    }, [language]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const nextStep = () => setStep(prev => Math.min(prev + 1, 6));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
    const goToStep = (stepNumber: number) => setStep(stepNumber);

    const handleSaveProgress = useCallback(() => {
        const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `alta_autonomo_${formData.apellido1 || 'progreso'}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [formData]);

    const handleLoadProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const loadedData = JSON.parse(event.target?.result as string);
                    const defaults = {
                        dniNie: '', nombre: '', apellido1: '', apellido2: '', fechaNacimiento: '',
                        tipoVia: 'Calle', nombreVia: '', numero: '', piso: '', puerta: '', codigoPostal: '', poblacion: '', provincia: '',
                        nacionalidad: 'Española', nombrePadre: '', nombreMadre: '', telefono: '', email: '',
                        fechaLlegada: '', comentariosLlegada: '', resideMas183Dias: 'si', paisResidenciaFiscal: '',
                        iban: '', cuentaAbiertaCon: 'dni', actividadDefinida: 'si', descripcionActividad: '', situacionLaboral: 'no',
                        ejerceEnLocal: 'no', mutua: 'Activa Mutua', rendimientoNetoPrevisto: '1000', operaIntracomunitario: 'no', incluirBeneficiarios: 'no',
                        disfrutaTarifaReducida: 'si', baseCotizacionElegida: '',
                        comentariosFinales: '',
                    };
                    setFormData({ ...defaults, ...loadedData });
                    alert(t.datosCargados);
                    setStep(1);
                } catch (error) {
                    alert(t.errorCargar);
                }
            };
            reader.readAsText(file);
        }
        if(e.target) e.target.value = '';
    };

    const triggerFileLoad = () => fileInputRef.current?.click();
    
    const handleFinalizeAndSave = useCallback(() => {
        handleSaveProgress();
        generatePdf(formData, t);
        nextStep();
    }, [formData, t, handleSaveProgress]);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                alert(`${t.pantallaCompletaError}: ${err.message} (${err.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };
    
    const steps = stepsConfig(t);

    const renderStep = () => {
        const stepProps = { formData, setFormData, t };
        const stepInputProps = { ...stepProps, handleChange };

        switch (step) {
            case 1: return <Step1 {...stepInputProps} />;
            case 2: return <Step2 {...stepInputProps} />;
            case 3: return <Step3 {...stepInputProps} />;
            case 4: return <Step4 {...stepInputProps} />;
            case 5: return <Step5 {...stepProps} />;
            case 6: return <Step6 t={t} />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 bg-gray-100 dark:bg-gray-900">
            <input type="file" ref={fileInputRef} onChange={handleLoadProgress} style={{ display: 'none' }} accept=".json" />
            <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-10 transition-colors duration-300">
                <header className="flex justify-between items-start mb-4 flex-wrap gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{t.mainTitle}</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">{t.mainSubtitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <LanguageSwitcher language={language} setLanguage={setLanguage} t={t} />
                        <IconButton onClick={handleSaveProgress} title={t.guardarProgreso} icon={<Icons.Save />} />
                        <IconButton onClick={triggerFileLoad} title={t.cargarProgreso} icon={<Icons.Upload />} />
                        <IconButton onClick={() => setIsDarkMode(!isDarkMode)} title={isDarkMode ? t.activarModoClaro : t.activarModoOscuro} icon={isDarkMode ? <Icons.Sun /> : <Icons.Moon />} />
                        <IconButton onClick={toggleFullScreen} title={t.pantallaCompleta} icon={<Icons.Maximize />} />
                    </div>
                </header>

                {step < 6 && <StepIndicator steps={steps} currentStep={step} goToStep={goToStep} />}
                
                <main className="mt-8">
                    {renderStep()}
                </main>

                {step < 5 && (
                    <footer className="mt-10 flex justify-between">
                        <button type="button" onClick={prevStep} disabled={step === 1} className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
                            <Icons.ArrowLeft /> <span className="ml-2">{t.anterior}</span>
                        </button>
                        <button type="button" onClick={nextStep} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center">
                            <span className="mr-2">{t.siguiente}</span> <Icons.ArrowRight />
                        </button>
                    </footer>
                )}

                {step === 5 && (
                     <footer className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <button type="button" onClick={prevStep} className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-300 flex items-center w-full md:w-auto justify-center">
                            <Icons.ArrowLeft /> <span className="ml-2">{t.volver}</span>
                        </button>
                        <div className="flex items-center gap-x-2 flex-wrap justify-center">
                            <button type="button" onClick={() => generatePdf(formData, t)} className="bg-red-600 text-white font-bold py-2 px-3 rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center"><span className="hidden sm:inline mr-2">{t.descargarPdf}</span><Icons.Download /></button>
                            <button type="button" onClick={() => generateXlsx(formData, t)} className="bg-green-600 text-white font-bold py-2 px-3 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center"><span className="hidden sm:inline mr-2">{t.descargarExcel}</span><Icons.Download /></button>
                            <button type="button" onClick={() => generateTxt(formData, t)} className="bg-gray-600 text-white font-bold py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center"><span className="hidden sm:inline mr-2">{t.descargarTxt}</span><Icons.Download /></button>
                            <button type="button" onClick={() => generateBenetZip(formData, t)} className="bg-purple-600 text-white font-bold py-2 px-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center"><span className="hidden sm:inline mr-2">{t.descargarParaBenet}</span><Icons.Download /></button>
                        </div>
                        <button type="button" onClick={handleFinalizeAndSave} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center w-full md:w-auto justify-center">
                            <span className="mr-2">{t.finalizar}</span> <Icons.Save />
                        </button>
                     </footer>
                )}
            </div>
        </div>
    );
};

export default App;
