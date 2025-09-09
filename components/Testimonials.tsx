import React from 'react';
import { QuoteIcon } from './icons';

const testimonials = [
    {
        quote: "Dr. Naveed is a brilliant and competent surgeon. He is not only an expert in his field but also a very humble person. He performed my mother's knee surgery and it went quite well.",
        name: "Waleed Ilyas",
    },
    {
        quote: "Dr. Naveed Ali Sher is one of the best orthopedic surgeon in Lahore. He is very competent, professional and a cooperative doctor. He did my ACL Reconstruction surgery and it went very well. Highly recommended.",
        name: "Amna Aslam",
    },
    {
        quote: "Dr. Naveed is a fantastic orthopedic surgeon. My brother had a road traffic accident and his leg was badly fractured, Dr. Naveed operated him and now he is absolutely fine. Very skillful and competent surgeon.",
        name: "Saad Kazmi",
    },
    {
        quote: "Very competent and highly professional Orthopedic surgeon. I had a wonderful experience and will recommend to all my friends and family.",
        name: "Zainab Khan",
    },
    {
        quote: "One of the best Doctor in Lahore. I must say He's very humble and down to earth. His way of treating the patient is remarkable.",
        name: "Farooq Ahmed",
    },
    {
        quote: "Best Orthopedic Surgeon in Lahore. Highly recommended.",
        name: "Ali Raza",
    },
];

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="py-20 bg-gray-100" aria-labelledby="testimonials-heading">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Patient Success Stories</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Hear from patients who have experienced our dedicated care firsthand.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-lg flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                            <QuoteIcon className="h-10 w-10 text-blue-300 mb-4" />
                            <blockquote className="text-gray-600 italic flex-grow">
                                "{testimonial.quote}"
                            </blockquote>
                            <footer className="mt-6">
                                <p className="font-semibold text-gray-800">- {testimonial.name}</p>
                            </footer>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
