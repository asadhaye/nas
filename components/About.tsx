import React from 'react';
import { AwardIcon, BookOpenIcon, UserIcon } from './icons';

const CredentialCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100">
        <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-blue-100 text-blue-600 p-3 rounded-full">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600 mt-1 text-sm">{children}</p>
            </div>
        </div>
    </div>
);


const About: React.FC = () => {
    const imageUrlBase = "https://images.unsplash.com/photo-1624720114704-358c421713e7?q=80&auto=format&fit=crop";
    
    return (
        <section id="about" className="py-20 bg-gray-50" aria-labelledby="about-heading">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Main Profile Card */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex">
                        <div className="md:w-1/3">
                            <img 
                                loading="lazy"
                                src={`${imageUrlBase}&w=400`}
                                srcSet={`${imageUrlBase}&w=400 400w, ${imageUrlBase}&w=800 800w`}
                                sizes="(max-width: 768px) 100vw, 33vw"
                                alt="Dr. Sher professional headshot" 
                                className="h-64 w-full object-cover md:h-full"
                            />
                        </div>
                        <div className="p-8 md:p-12 md:w-2/3">
                            <p className="text-sm font-semibold text-blue-600 tracking-wider uppercase">Meet Your Surgeon</p>
                            <h2 id="about-heading" className="text-3xl font-bold text-gray-900 mt-2">Dr. Naveed Ali Sher</h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
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