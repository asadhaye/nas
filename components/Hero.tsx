import React from 'react';
import { motion, Variants } from 'framer-motion';

const Hero: React.FC = () => {
    const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const targetElement = document.querySelector('#contact');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Updated for a more orchestrated sequence
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    // Updated to use a spring animation for a more dynamic feel
    const itemVariants: Variants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 120,
            },
        },
    };
    
    const imageUrlBase = "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/AI%20Images/Dr%20Shair%20Headshot.png";

    return (
        <section id="hero" tabIndex={-1} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 to-teal-500 text-white focus:outline-none" aria-labelledby="hero-heading">
            {/* Background shapes for decorative effect */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 30%, #ffffff 0%, transparent 40%), radial-gradient(circle at 75% 70%, #ffffff 0%, transparent 40%)' }}></div>
            
            <div className="container mx-auto px-6 z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    
                    {/* Text Content */}
                    <motion.div 
                        className="text-center md:text-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/90 font-medium tracking-wider" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.3)' }}>
                            Consultant Orthopedic, Trauma & Joint Replacement Surgeon
                        </motion.p>
                        <motion.h1 
                            id="hero-heading" 
                            variants={itemVariants} 
                            className="text-5xl md:text-7xl font-extrabold tracking-tight my-4"
                            style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)' }}
                        >
                            Dr. Naveed Ali Sher
                        </motion.h1>
                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-white max-w-xl mx-auto md:mx-0" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.3)' }}>
                            Expert care in knee replacement, hip replacement, and ACL reconstruction to restore your mobility and enhance your quality of life.
                        </motion.p>
                        <motion.div variants={itemVariants} className="mt-10">
                            <button 
                                onClick={handleScrollToContact} 
                                className="bg-white text-blue-600 font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-400/40 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                            >
                                Book Appointment
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Image Content */}
                    <motion.div 
                        className="flex justify-center items-center"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 80,
                            delay: 0.5,
                        }}
                    >
                        <img 
                            fetchPriority="high"
                            src={`${imageUrlBase}&w=800`} 
                            srcSet={`${imageUrlBase}&w=400 400w, ${imageUrlBase}&w=800 800w, ${imageUrlBase}&w=1200 1200w`}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            alt="Professional portrait of Dr. Naveed Ali Sher" 
                            className="w-full max-w-md h-auto rounded-full object-cover shadow-2xl border-8 border-white/20"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;