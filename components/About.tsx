import React from 'react';
import { AwardIcon, BookOpenIcon, UserIcon } from './icons';

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 bg-blue-100 text-blue-600 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600 mt-1">{children}</p>
        </div>
    </div>
);

const About: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-white" aria-labelledby="about-heading">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 id="about-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Compassionate Care, Expert Solutions</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Combining advanced surgical techniques with a patient-first approach to restore mobility and improve quality of life.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img 
                            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=870&auto=format&fit=crop" 
                            alt="Doctor providing a consultation" 
                            className="rounded-lg shadow-xl w-full"
                        />
                    </div>
                    <div className="space-y-8">
                        <InfoCard icon={<AwardIcon className="h-6 w-6" />} title="Expert Qualifications">
                            Dr. Sher holds an MBBS and an FCPS in Orthopedic Surgery. He has completed prestigious international fellowships, including the SICOT Orthopedic Traumatology Fellowship in Germany and the AO Fellowship in Switzerland.
                        </InfoCard>
                        <InfoCard icon={<BookOpenIcon className="h-6 w-6" />} title="Areas of Special Interest">
                            With focused expertise in Primary & Revision Hip & Knee Arthroplasty, Arthroscopic Knee Surgery (ACL/PCL/Meniscus), and Complex Periarticular Trauma, Dr. Sher provides specialized care for a wide range of orthopedic conditions.
                        </InfoCard>
                        <InfoCard icon={<UserIcon className="h-6 w-6" />} title="Patient-Centered Philosophy">
                            Dedicated to providing personalized and compassionate care, Dr. Sher is committed to patient education, ensuring you fully understand your condition and treatment options to achieve the best possible outcomes.
                        </InfoCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;