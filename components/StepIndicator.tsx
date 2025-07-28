import React, { memo } from 'react';

interface Step {
    number: number;
    title: string;
    icon: React.ReactNode;
}

interface StepIndicatorProps {
    steps: Step[];
    currentStep: number;
    goToStep: (step: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, goToStep }) => {
    return (
        <div className="mb-8">
            <div className="flex items-center">
                {steps.map((step, index) => (
                    <React.Fragment key={step.number}>
                        <div className="flex flex-col sm:flex-row items-center">
                            <button
                                type="button"
                                onClick={() => goToStep(step.number)}
                                className={`flex items-center text-left focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-blue-500 rounded-lg p-1 transition-transform duration-300 ${currentStep === step.number ? 'transform scale-110' : 'hover:scale-105'}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${currentStep >= step.number ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                    <span className={`transition-colors duration-300 ${currentStep >= step.number ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                                        {step.icon}
                                    </span>
                                </div>
                                <div className="hidden sm:block ml-3">
                                    <p className={`text-sm font-semibold transition-colors duration-300 ${currentStep >= step.number ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>{step.title}</p>
                                </div>
                            </button>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-1 mx-2 transition-colors duration-500 ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default memo(StepIndicator);