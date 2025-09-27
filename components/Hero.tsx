import React from 'react';

const Hero: React.FC = () => {
    const portraitUrl = "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/AI%20Images/Dr%20Shair%20Portrait.png";
    
    return (
        <section id="hero" tabIndex={-1} className="relative bg-sky-50 pt-16 focus:outline-none">
            <div className="relative h-64 md:h-80 w-full">
                {/* Background layers */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img 
                        src={portraitUrl}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 20%' }}
                    />
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-teal-400 to-blue-500 mix-blend-multiply"></div>

                {/* The Wave SVG to create the curved bottom */}
                <div className="absolute bottom-0 w-full z-20 pointer-events-none">
                    <svg className="w-full h-20 md:h-28 lg:h-32 text-sky-50 fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default Hero;