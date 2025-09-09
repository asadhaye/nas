import React, { useState } from 'react';
import type { Condition } from '../types';
import { ChevronDownIcon } from './icons';

const conditionsData: Condition[] = [
    {
        title: "Sports Injury Management",
        summary: "Specialized care for injuries caused by overuse, direct impact, or excessive force.",
        details: "We treat a range of common sports injuries including bruises, sprains, strains, and joint injuries, helping athletes of all levels return to their activities safely and quickly."
    },
    {
        title: "Arthroscopy",
        summary: "A minimally invasive procedure for diagnosing and treating joint problems.",
        details: "A surgeon inserts a narrow tube attached to a fiber-optic video camera through a small incision. The view inside your joint is transmitted to a high-definition video monitor, allowing for precise treatment with less pain and faster recovery."
    },
    {
        title: "Joint Replacement (Arthroplasty)",
        summary: "Surgical procedures to replace damaged joints, most commonly hip and knee.",
        details: "Hip and knee replacements are the most frequently performed procedures, but surgery can also be performed on the ankle, wrist, shoulder, and elbow to relieve pain and restore function."
    },
    {
        title: "Ligament Reconstruction",
        summary: "Surgical repair or replacement of damaged ligaments to restore joint stability.",
        details: "Ligaments are tough, elastic tissues that support joints. An injury or tear can cause pain and instability. Reconstruction is a key procedure for injuries to ligaments like the ACL."
    },
    {
        title: "Shoulder Surgery",
        summary: "Comprehensive surgical care for various shoulder conditions.",
        details: "Conditions that may require shoulder surgery include severe shoulder arthritis, rotator cuff tears, and frozen shoulder. Some fractures of the bones making up the shoulder joint may also benefit from surgery."
    },
    {
        title: "Paediatric Orthopedic Care",
        summary: "Specialist service for musculoskeletal conditions affecting children and teens.",
        details: "This branch of medicine provides both surgical and non-surgical treatment for injuries and musculoskeletal conditions in growing patients, from infancy through adolescence."
    }
];

const ConditionItem: React.FC<{ item: Condition; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
            <button
                onClick={onClick}
                className="w-full p-6 text-left flex justify-between items-center focus:outline-none focus:bg-gray-50"
                aria-expanded={isOpen}
            >
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 mt-1">{item.summary}</p>
                </div>
                <ChevronDownIcon className={`h-6 w-6 text-blue-600 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-700">{item.details}</p>
                </div>
            )}
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
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="conditions" className="py-20 bg-gray-100" aria-labelledby="conditions-heading">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 id="conditions-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Orthopedic Services & Specialties</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Specializing in a range of advanced procedures to help you regain mobility and live pain-free.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto space-y-4">
                    {conditionsData.map((condition, index) => (
                        <ConditionItem
                            key={index}
                            item={condition}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>

                <div className="mt-20 text-center">
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
                    <ResourceCard title="Knee Ligament Sprains (ACL/PCL)">
                         <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex-grow">
                           <iframe
                                title="Knee Ligament Sprains (ACL/PCL)"
                                className="w-full h-full"
                                frameBorder="0"
                                allowFullScreen
                                src="https://human.biodigital.com/widget/?be=2Vf7&ui-tools-display=primary&uaid=9aNAd">
                           </iframe>
                        </div>
                    </ResourceCard>
                </div>
            </div>
        </section>
    );
};

export default Conditions;