
import React from 'react';
import { Translations } from '../../types';
import { Icons } from '../icons';

interface Step6Props {
    t: Translations;
}

const Step6: React.FC<Step6Props> = ({ t }) => {
    return (
        <div className="animate-fade-in text-center p-4 sm:p-8">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.BigCheck />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">{t.procesoFinalizado}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
                {t.procesoFinalizadoSubtitle}
            </p>
             <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-400/10 border border-yellow-300 dark:border-yellow-400/30 rounded-md text-left max-w-2xl mx-auto">
                <h3 className="font-bold text-lg mb-3 flex items-center text-yellow-800 dark:text-yellow-300"><Icons.AlertTriangle />{t.recordatorios}</h3>
                <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-400 mt-2 space-y-2">
                    <li>{t.recordatorioCertificado}</li>
                    <li>{t.recordatorioLocal}</li>
                    <li>{t.recordatorioBeneficiarios}</li>
                </ul>
            </div>
             <button 
                onClick={() => window.location.reload()} 
                className="mt-10 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-all duration-300 flex items-center justify-center mx-auto"
            >
                {t.registrarOtro}
            </button>
        </div>
    );
};

export default Step6;
