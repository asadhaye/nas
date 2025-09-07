import React from 'react';

const Hero: React.FC = () => {
    const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative bg-gray-100 text-gray-800 py-20 md:py-24" aria-labelledby="hero-heading">
            <div className="container mx-auto px-6 text-center z-10">
                <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=870&auto=format&fit=crop" 
                    alt="Dr. Naveed Ali Sher" 
                    className="w-40 h-40 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-xl" 
                />
                <h1 id="hero-heading" className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4">Dr. Naveed Ali Sher</h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
                    Consultant Orthopedic, Trauma & Joint Replacement Surgeon
                </p>
                <div className="mt-8">
                    <button onClick={handleScrollToContact} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
                        Book an Appointment
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;