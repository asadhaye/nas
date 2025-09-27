import React, { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import SafeImage from './SafeImage';

const AnimatedBlob: React.FC<{ className: string }> = ({ className }) => (
    <motion.div
        className={`absolute rounded-full mix-blend-soft-light filter blur-2xl opacity-30 ${className}`}
        animate={{
            x: [0, 20, -20, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, 10, -10, 0],
        }}
        transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
        }}
    />
);

const Hero: React.FC = () => {
    const appointmentButtonRef = useRef<HTMLButtonElement>(null);

    const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const targetElement = document.querySelector('#contact');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
    
    // Create responsive image sources using an image proxy service
    const imageProxyPrefix = 'https://images.weserv.nl/?url=';
    const strippedUrl = imageUrlBase.replace(/^https?:\/\//, '');
    const headshotSrcSet = [400, 600, 800, 1000]
        .map(w => `${imageProxyPrefix}${strippedUrl}&w=${w}&h=${w}&fit=cover&q=85&output=webp ${w}w`)
        .join(', ');
    const headshotSizes = "(min-width: 768px) 448px, (min-width: 480px) 384px, 80vw";


    const focusButtonAfterAnimation = () => {
        appointmentButtonRef.current?.focus({ preventScroll: true });
    };

    return (
        <section id="hero" tabIndex={-1} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 to-teal-500 text-white focus:outline-none" aria-labelledby="hero-heading">
            <AnimatedBlob className="w-96 h-96 bg-teal-300 top-1/4 left-1/4" />
            <AnimatedBlob className="w-80 h-80 bg-blue-300 bottom-1/4 right-1/4" />
            
            <div className="container mx-auto px-6 z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    
                    {/* Text Content */}
                    <motion.div 
                        className="text-center md:text-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        onAnimationComplete={focusButtonAfterAnimation}
                    >
                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/90 font-medium tracking-wider" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.3)' }}>
                            Consultant Orthopedic, Trauma & Joint Replacement Surgeon
                        </motion.p>
                        <motion.h1 
                            id="hero-heading" 
                            variants={itemVariants} 
                            className="text-5xl md:text-7xl font-extrabold tracking-tight my-4 font-heading"
                            style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)' }}
                        >
                            Dr. Naveed Ali Sher
                        </motion.h1>
                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-white max-w-xl mx-auto md:mx-0" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.3)' }}>
                            Expert care in knee replacement, hip replacement, and ACL reconstruction to restore your mobility and enhance your quality of life.
                        </motion.p>
                        <motion.div variants={itemVariants} className="mt-10">
                            <button 
                                ref={appointmentButtonRef}
                                onClick={handleScrollToContact} 
                                className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-4 px-10 rounded-full text-lg hover:from-blue-600 hover:to-teal-500 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-400/40 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
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
                        <SafeImage 
                            fetchPriority="high"
                            src={imageUrlBase} 
                            srcSet={headshotSrcSet}
                            sizes={headshotSizes}
                            alt="Professional headshot of Dr. Naveed Ali Sher" 
                            className="w-4/5 max-w-sm md:w-full md:max-w-md aspect-square rounded-full object-cover object-top shadow-2xl border-8 border-white/20"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;