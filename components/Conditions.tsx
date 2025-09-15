import React from 'react';
import { conditionsData } from '../data/conditionsData';

// FIX: Update ConditionCardProps to accept a React Functional Component for the icon,
// rather than a React.ReactNode. This aligns with the change in `conditionsData.ts`
// where we now pass the component itself to avoid JSX in a .ts file.
interface ConditionCardProps {
    icon: React.FC<{ className?: string }>;
    title: string;
    summary: string;
}

// FIX: Destructure the icon prop and rename it to `IconComponent` for clarity.
// Render it as a component, passing the required className for styling.
const ConditionCard: React.FC<ConditionCardProps> = ({ icon: IconComponent, title, summary }) => {
    return (
        <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-teal-400">
            <div className="inline-block bg-teal-100 rounded-full p-3 mb-4">
                <IconComponent className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{summary}</p>
        </div>
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
    return (
        <section id="conditions" tabIndex={-1} className="py-20 bg-white focus:outline-none" aria-labelledby="conditions-heading">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 id="conditions-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Orthopedic Services & Specialties</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
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
                        />
                    ))}
                </div>

                <div className="mt-24 text-center">
                     <h2 id="education-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Patient Education Resources</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
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
    );
};

export default Conditions;