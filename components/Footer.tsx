import React from 'react';
import { PhoneIcon, MailIcon, LocationMarkerIcon, TwitterIcon, FacebookIcon, LinkedInIcon, InstagramIcon } from './icons';

const Footer: React.FC = () => {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            const headerOffset = 80; // height of the sticky header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

            // Defer focus shift until after the smooth scroll animation
            setTimeout(() => {
                (targetElement as HTMLElement).focus({ preventScroll: true });
            }, 500);
        }
    };

    return (
        <footer className="bg-slate-900 text-gray-300">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: Brand Info */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <a href="#" onClick={(e) => handleScroll(e, '#hero')} className="block mb-4">
                            <img 
                                src="https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/AI%20Images/nas-logo-1.png" 
                                alt="Dr. Naveed Ali Shair Logo" 
                                className="h-10 w-auto" 
                            />
                        </a>
                        <p className="text-sm text-gray-400">
                            Dedicated to restoring mobility and enhancing quality of life through expert orthopedic care.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 tracking-wider">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#about" onClick={(e) => handleScroll(e, '#about')} className="hover:text-white transition-colors">About Dr. Shair</a></li>
                            <li><a href="#conditions" onClick={(e) => handleScroll(e, '#conditions')} className="hover:text-white transition-colors">Treatments</a></li>
                            <li><a href="#gallery" onClick={(e) => handleScroll(e, '#gallery')} className="hover:text-white transition-colors">Gallery</a></li>
                            <li><a href="#faq" onClick={(e) => handleScroll(e, '#faq')} className="hover:text-white transition-colors">Patient FAQs</a></li>
                            <li><a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 tracking-wider">Contact Info</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3"><LocationMarkerIcon className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" /><span>Avenue Mall, Main Ghazi Rd, DHA, Lahore</span></li>
                            <li className="flex items-start gap-3"><PhoneIcon className="h-5 w-5 text-blue-400 flex-shrink-0" /><span>+92-321-9728977</span></li>
                            <li className="flex items-start gap-3"><MailIcon className="h-5 w-5 text-blue-400 flex-shrink-0" /><span>dr.naveed@nasorthopedics.com</span></li>
                        </ul>
                    </div>

                    {/* Column 4: Social Media */}
                    <div>
                        <h4 className="font-semibold text-white mb-4 tracking-wider">Follow Us</h4>
                        <div className="flex items-center gap-5">
                            <a href="#" aria-label="Follow on Twitter" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon className="h-6 w-6" /></a>
                            <a href="#" aria-label="Follow on Facebook" className="text-gray-400 hover:text-white transition-colors"><FacebookIcon className="h-6 w-6" /></a>
                            <a href="#" aria-label="Follow on LinkedIn" className="text-gray-400 hover:text-white transition-colors"><LinkedInIcon className="h-6 w-6" /></a>
                             <a href="#" aria-label="Follow on Instagram" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon className="h-6 w-6" /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-slate-800 py-4">
                <div className="container mx-auto px-6 text-center text-sm text-gray-400">
                    {/* FIX: Corrected undefined function call to get the current year. */}
                    <p>&copy; {new Date().getFullYear()} Dr. Naveed Ali Shair. All Rights Reserved. This website is for informational purposes only.</p>
                    <p className="mt-2">
                        Made with <span className="text-red-500">&hearts;</span> by <a href="https://www.asadhaye.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-300 hover:text-white transition-colors">Muhammad Asad Haye</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;