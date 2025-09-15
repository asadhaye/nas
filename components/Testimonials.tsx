import React from 'react';
import { QuoteIcon } from './icons';

const testimonials = [
    {
        quote: "Dr. Naveed is a brilliant and competent surgeon. He is not only an expert in his field but also a very humble person. He performed my mother's knee surgery and it went quite well.",
        name: "Waleed Ilyas",
        imageUrl: "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/Testimonials/male-1.png",
    },
    {
        quote: "Dr. Naveed Ali Sher is one of the best orthopedic surgeon in Lahore. He is very competent, professional and a cooperative doctor. He did my ACL Reconstruction surgery and it went very well. Highly recommended.",
        name: "Amna Aslam",
        imageUrl: "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/Testimonials/female-1.png",
    },
    {
        quote: "Dr. Naveed is a fantastic orthopedic surgeon. My brother had a road traffic accident and his leg was badly fractured, Dr. Naveed operated him and now he is absolutely fine. Very skillful and competent surgeon.",
        name: "Saad Kazmi",
        imageUrl: "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/Testimonials/male-2.png",
    },
    {
        quote: "Very competent and highly professional Orthopedic surgeon. I had a wonderful experience and will recommend to all my friends and family.",
        name: "Zainab Khan",
        imageUrl: "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/Testimonials/female-2.png",
    },
    {
        quote: "One of the best Doctor in Lahore. I must say He's very humble and down to earth. His way of treating the patient is remarkable.",
        name: "Farooq Ahmed",
        imageUrl: "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/Testimonials/male-3.png",
    },
    {
        quote: "Best Orthopedic Surgeon in Lahore. Highly recommended.",
        name: "Ali Raza",
        imageUrl: "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/Testimonials/male-4.png",
    },
];

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" tabIndex={-1} className="py-20 bg-sky-50 focus:outline-none" aria-labelledby="testimonials-heading">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Patient Success Stories</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Hear from patients who have experienced our dedicated care firsthand.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-lg flex flex-col text-center transform hover:-translate-y-2 transition-transform duration-300">
                            <QuoteIcon className="h-10 w-10 text-blue-300 mb-4 mx-auto" />
                            <blockquote className="text-gray-600 italic flex-grow mb-6">
                                "{testimonial.quote}"
                            </blockquote>
                            <footer className="mt-auto">
                                <img 
                                    loading="lazy"
                                    src={testimonial.imageUrl} 
                                    alt={`Photo of ${testimonial.name}`}
                                    className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-blue-100 shadow-md"
                                />
                                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                            </footer>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;