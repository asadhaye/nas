import React, { useState, useEffect } from 'react';
import { conditionsData } from '../data/conditionsData';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from './icons';

interface ConditionData {
    icon: React.FC<{ className?: string }>;
    title: string;
    summary: string;
    details: string;
}

interface ConditionCardProps {
    icon: React.FC<{ className?: string }>;
    title: string;
    summary: string;
    onClick: () => void;
}

const ConditionCard: React.FC<ConditionCardProps> = ({ icon: IconComponent, title, summary, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-teal-400 w-full h-full flex flex-col focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label={`Learn more about ${title}`}
        >
            <div className="inline-block bg-teal-100 rounded-full p-3 mb-4 mx-auto">
                <IconComponent className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-700 text-sm flex-grow">{summary}</p>
        </button>
    );
};


const ResourceCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div className="p-5">
            <h3 className="text-xl font-semibold text-gray-800 text-center">{title}</h3>
        </div>
        {children}
    </div>
);

const Conditions: React.FC = () => {
    const [selectedCondition, setSelectedCondition] = useState<ConditionData | null>(null);

    const closeModal = () => setSelectedCondition(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (selectedCondition) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [selectedCondition]);

    return (
        <>
            <section id="conditions" tabIndex={-1} className="py-20 bg-white focus:outline-none" aria-labelledby="conditions-heading">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 id="conditions-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Orthopedic Services & Specialties</h2>
                        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
                            Specializing in a range of advanced procedures to help you regain mobility and live pain-free.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {conditionsData.map((condition, index) => (
                            <ConditionCard
                                key={index}
                                icon={condition.icon}
                                title={condition.title}
                                summary={condition.summary}
                                onClick={() => setSelectedCondition(condition)}
                            />
                        ))}
                    </div>

                    <div className="mt-24 text-center">
                        <h2 id="education-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Patient Education Resources</h2>
                        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
                            Explore these interactive resources to better understand your condition and treatment options.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
                        <ResourceCard title="Interactive Knee Anatomy">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex-grow">
                            <iframe
                                    title="Interactive Knee Anatomy"
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allowFullScreen
                                    src="https://human.biodigital.com/widget/?be=2Vey&background.colors=0,0,0,1,0,0,0,1&initial.hand-hint=true&ui-info=true&ui-fullscreen=true&ui-center=false&ui-dissect=true&ui-zoom=true&ui-help=true&ui-tools-display=primary&uaid=3abtb">
                            </iframe>
                            </div>
                        </ResourceCard>
                        <ResourceCard title="Rotator Cuff Injury">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex-grow">
                            <iframe
                                    title="Rotator Cuff Injury"
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allowFullScreen
                                    src="https://human.biodigital.com/widget/?be=2Pf7&background.colors=0,0,0,1,0,0,0,1&initial.hand-hint=true&ui-fullscreen=true&ui-center=false&ui-dissect=true&ui-zoom=true&ui-help=true&ui-tools-display=primary&ui-info=true&uaid=31nks">
                            </iframe>
                            </div>
                        </ResourceCard>
                    </div>
                </div>
            </section>
            
            <AnimatePresence>
                {selectedCondition && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                        onClick={closeModal}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="condition-modal-title"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 flex justify-between items-center border-b border-gray-200">
                                <h3 id="condition-modal-title" className="text-xl font-bold text-gray-900">{selectedCondition.title}</h3>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1"
                                    aria-label="Close details"
                                >
                                    <XIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto text-left flex-grow">
                                <div className="flex justify-center mb-6">
                                    <div className="bg-teal-100 rounded-full p-4">
                                        {React.createElement(selectedCondition.icon, { className: "h-12 w-12 text-blue-600" })}
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {selectedCondition.details}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Conditions;
