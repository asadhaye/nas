import React, { useState } from 'react';
import type { FaqItem } from '../types';
import { PlusIcon, MinusIcon } from './icons';
import { motion, AnimatePresence } from 'framer-motion';

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

const FaqItemComponent: React.FC<{ item: FaqItem; isOpen: boolean; onClick: () => void; index: number }> = ({ item, isOpen, onClick, index }) => {
    const panelId = `faq-panel-${index}`;
    const headingId = `faq-heading-${index}`;

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-6 px-4 rounded-lg group hover:bg-gray-50 transition-colors focus:outline-none"
                aria-expanded={isOpen}
                aria-controls={panelId}
            >
                <h3 id={headingId} className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{item.question}</h3>
                <div className="transform transition-transform duration-300">
                    {isOpen ? <MinusIcon className="h-6 w-6 text-blue-600" /> : <PlusIcon className="h-6 w-6 text-gray-500" />}
                </div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={headingId}
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto', marginTop: '0px' },
                            collapsed: { opacity: 0, height: 0, marginTop: '0px' }
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 px-4 text-gray-600 prose-sm">
                            <p>{item.answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" tabIndex={-1} className="py-20 bg-sky-50 focus:outline-none" aria-labelledby="faq-heading">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Answers to common questions from patients, inspired by communities like r/ACL.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md border border-gray-100">
                    {faqData.map((item, index) => (
                        <FaqItemComponent 
                            key={index} 
                            item={item}
                            index={index}
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