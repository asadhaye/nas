import React, { useState } from 'react';
import { MenuIcon, XIcon, PhoneIcon, MailIcon } from './icons';
import { motion, AnimatePresence } from 'framer-motion';
import SafeImage from './SafeImage';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '#about', label: 'About Dr. Shair' },
        { href: '#conditions', label: 'Treatments' },
        { href: '#testimonials', label: 'Testimonials' },
        { href: '#gallery', label: 'Gallery' },
        { href: '#faq', label: 'Patient FAQs' },
        { href: '#ai-assistant', label: 'AI Assistant' },
        { href: '#contact', label: 'Contact' },
    ];

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            const headerOffset = 80; // height of the sticky header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Defer focus shift until after the smooth scroll animation
            setTimeout(() => {
                (targetElement as HTMLElement).focus({ preventScroll: true });
            }, 500);
        }
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 shadow-md">
            {/* Top bar with contact info */}
            <div className="bg-gray-100 border-b border-gray-200">
                <div className="container mx-auto px-6 py-2 flex flex-wrap justify-center md:justify-end items-center gap-x-4 sm:gap-x-6 text-sm">
                    <a href="tel:+923219728977" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap">
                        <PhoneIcon className="h-4 w-4" />
                        <span>+92-321-97 28 977</span>
                    </a>
                     <a href="mailto:dr.naveed@nasorthopedics.com" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap">
                        <MailIcon className="h-4 w-4" />
                        <span>dr.naveed@nasorthopedics.com</span>
                    </a>
                </div>
            </div>

            {/* Main navigation bar */}
            <div className="container mx-auto px-6 flex justify-between items-center h-16">
                <a href="#" className="flex-shrink-0 font-heading" onClick={(e) => handleScroll(e, '#hero')}>
                    <SafeImage 
                        src="https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/AI%20Images/nas-logo-1.png" 
                        alt="Dr. Naveed Ali Shair Logo" 
                        className="h-16 w-auto" 
                    />
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center">
                    <ul className="flex items-center gap-x-3 lg:gap-x-5 xl:gap-x-6">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a href={link.href} onClick={(e) => handleScroll(e, link.href)} className="text-gray-600 hover:text-blue-600 transition-colors font-medium whitespace-nowrap py-2 text-sm">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="text-gray-600 hover:text-blue-600 p-2 z-50 relative"
                        aria-controls="mobile-menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/40 z-30 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                        />
                         <motion.div 
                            className="md:hidden bg-white border-t border-gray-200 absolute top-full left-0 right-0 z-40 shadow-lg" 
                            id="mobile-menu"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <nav>
                                <ul className="flex flex-col">
                                    {navLinks.map((link) => (
                                        <li key={link.href}>
                                            <a href={link.href} onClick={(e) => handleScroll(e, link.href)} className="block w-full text-center py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium border-b border-gray-100">
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;