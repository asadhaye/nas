import React, { useState } from 'react';
import type { FaqItem } from '../types';
import { PlusIcon, MinusIcon } from './icons';

const faqData: FaqItem[] = [
    {
        question: "What should I expect during my first orthopedic consultation?",
        answer: "Your first visit will include a comprehensive review of your medical history, a physical examination of the affected area, and a discussion of your symptoms. Dr. Sher may also order diagnostic imaging like X-rays or an MRI to get a clearer picture of your condition."
    },
    {
        question: "How long is the recovery period for a total knee replacement?",
        answer: "Recovery varies for each patient, but most can expect to be walking with an assistive device within a day or two of surgery. A full recovery, including returning to most normal activities, typically takes 3 to 6 months and involves a dedicated physical therapy program."
    },
    {
        question: "Is arthroscopic surgery less painful than open surgery?",
        answer: "Yes, because arthroscopic surgery uses smaller incisions, it generally results in less pain, less joint stiffness, and a quicker recovery time compared to traditional open surgery."
    },
    {
        question: "When should I see an orthopedic surgeon for joint pain?",
        answer: "You should consider seeing an orthopedic specialist if your joint pain is persistent, severe, interferes with your daily activities, or if you've experienced a significant injury. Early diagnosis and treatment can often prevent more serious problems."
    }
];

const FaqItemComponent: React.FC<{ item: FaqItem; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 py-6">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left focus:outline-none"
                aria-expanded={isOpen}
            >
                <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
                {isOpen ? <MinusIcon className="h-6 w-6 text-blue-600" /> : <PlusIcon className="h-6 w-6 text-gray-500" />}
            </button>
            {isOpen && (
                <div className="mt-4 text-gray-600 prose">
                    <p>{item.answer}</p>
                </div>
            )}
        </div>
    );
};


const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 bg-white" aria-labelledby="faq-heading">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Answers to common questions from patients, inspired by communities like r/ACL.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    {faqData.map((item, index) => (
                        <FaqItemComponent 
                            key={index} 
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;