import React from 'react';
import { AwardIcon, BookOpenIcon, UserIcon } from './icons';
import SafeImage from './SafeImage';

const CredentialCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
        <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-blue-100 text-blue-600 p-3 rounded-full">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 font-heading">{title}</h3>
                <p className="text-gray-700 mt-1 text-sm">{children}</p>
            </div>
        </div>
    </div>
);


const About: React.FC = () => {
    const imageUrlBase = "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/AI%20Images/Dr%20Shair%20Portrait.png";
    
    // Create responsive image sources using an image proxy service
    const imageProxyPrefix = 'https://images.weserv.nl/?url=';
    const strippedUrl = imageUrlBase.replace(/^https?:\/\//, '');
    const portraitSrcSet = [400, 600, 800, 1000]
        .map(w => `${imageProxyPrefix}${strippedUrl}&w=${w}&q=85&output=webp ${w}w`)
        .join(', ');
    const portraitSizes = "(min-width: 1024px) 341px, (min-width: 768px) 33vw, 100vw";

    return (
        <section id="about" tabIndex={-1} className="py-24 bg-white focus:outline-none" aria-labelledby="about-heading">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Main Profile Card */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex">
                        <div className="md:w-1/3">
                            <SafeImage 
                                loading="lazy"
                                src={imageUrlBase}
                                srcSet={portraitSrcSet}
                                sizes={portraitSizes}
                                alt="Dr. Sher professional portrait" 
                                className="h-64 w-full object-cover md:h-full"
                            />
                        </div>
                        <div className="p-8 md:p-12 md:w-2/3">
                            <p className="text-sm font-semibold text-blue-600 tracking-wider uppercase">Meet Your Surgeon</p>
                            <h2 id="about-heading" className="text-4xl font-bold text-gray-900 mt-2 font-heading">Dr. Naveed Ali Sher</h2>
                            <p className="mt-4 text-gray-700 leading-relaxed">
                                Dr. Sher is a distinguished Consultant Orthopedic, Trauma, and Joint Replacement Surgeon with a profound commitment to patient-centered care. Combining advanced surgical techniques with a compassionate approach, his mission is to restore mobility, alleviate pain, and significantly improve the quality of life for every patient he treats.
                            </p>
                        </div>
                    </div>

                    {/* Credentials Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mt-10">
                         <CredentialCard icon={<AwardIcon className="h-6 w-6" />} title="Expert Qualifications">
                            Holding an MBBS and FCPS in Orthopedic Surgery, Dr. Sher has enriched his expertise with prestigious international fellowships in Germany (SICOT) and Switzerland (AO).
                        </CredentialCard>
                        <CredentialCard icon={<BookOpenIcon className="h-6 w-6" />} title="Areas of Special Interest">
                            Specializing in Primary & Revision Hip & Knee Arthroplasty, Arthroscopic Knee Surgery (ACL/PCL/Meniscus), and Complex Periarticular Trauma.
                        </CredentialCard>
                         <CredentialCard icon={<UserIcon className="h-6 w-6" />} title="Patient-Centered Philosophy">
                            Dedicated to personalized care and patient education, ensuring you are empowered and informed throughout your treatment journey for the best possible outcomes.
                        </CredentialCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;