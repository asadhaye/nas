import React, { useState } from 'react';
import { StethoscopeIcon, MenuIcon, XIcon, PhoneIcon, MailIcon } from './icons';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '#about', label: 'About Dr. Sher' },
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
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-50">
            <div className="bg-gray-100 border-b border-gray-200">
                <div className="container mx-auto px-6 py-2 flex justify-center md:justify-end items-center gap-x-6 gap-y-1 flex-wrap text-sm">
                    <a href="tel:+923219728977" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <PhoneIcon className="h-4 w-4" />
                        <span>+92-321-97 28 977</span>
                    </a>
                     <a href="mailto:dr.naveed@nasorthopedics.com" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <MailIcon className="h-4 w-4" />
                        <span>dr.naveed@nasorthopedics.com</span>
                    </a>
                </div>
            </div>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center shadow-md">
                <a href="#" className="flex items-center gap-2" onClick={(e) => handleScroll(e, '#hero')}>
                    <StethoscopeIcon className="h-8 w-8 text-blue-600" />
                    <span className="text-xl font-bold text-gray-800">Dr. Naveed Ali Sher</span>
                </a>
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} onClick={(e) => handleScroll(e, link.href)} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                            {link.label}
                        </a>
                    ))}
                </nav>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-blue-600">
                        {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <nav className="flex flex-col items-center gap-4 py-4">
                         {navLinks.map((link) => (
                            <a key={link.href} href={link.href} onClick={(e) => handleScroll(e, link.href)} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;