import React from 'react';
import { CameraIcon } from './icons';

const galleryData = [
    {
        src: "https://images.unsplash.com/photo-1618939307313-037130c0c1a8?q=80&auto=format&fit=crop",
        alt: "X-ray of a total knee replacement",
        title: "Total Knee Replacement",
        description: "Post-operative X-ray showing successful implant placement."
    },
    {
        src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&auto=format&fit=crop",
        alt: "Patient running after ACL reconstruction",
        title: "ACL Reconstruction Success",
        description: "Patient returned to running and sports 6 months after surgery."
    },
    {
        src: "https://images.unsplash.com/photo-1627993093958-3791f132646d?q=80&auto=format&fit=crop",
        alt: "Hip replacement x-ray",
        title: "Hip Arthroplasty",
        description: "Precision hip replacement for a pain-free life."
    },
    {
        src: "https://images.unsplash.com/photo-1588776814546-da6316ac6404?q=80&auto=format&fit=crop",
        alt: "Dr. Sher performing arthroscopic surgery",
        title: "Arthroscopic Surgery in Action",
        description: "Dr. Sher performing a minimally invasive knee procedure."
    },
    {
        src: "https://images.unsplash.com/photo-1551566943-0571329c69e2?q=80&auto=format&fit=crop",
        alt: "Dr. Sher at his desk during a consultation",
        title: "Personalized Consultation",
        description: "Discussing treatment plans and patient goals."
    },
    {
        src: "https://images.unsplash.com/photo-1543351611-58f69d7c1762?q=80&auto=format&fit=crop",
        alt: "X-ray of a healed fracture",
        title: "Trauma & Fracture Care",
        description: "Expert fixation leading to complete bone healing."
    }
];


const ImageGallery: React.FC = () => {
    return (
        <section id="gallery" className="py-20 bg-white" aria-labelledby="gallery-heading">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 id="gallery-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Surgical Outcomes Gallery</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Visualizing the path to recovery and renewed mobility through successful patient outcomes.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleryData.map((item, index) => {
                        const baseUrl = item.src.split('?')[0];
                        const queryParams = "?q=80&auto=format&fit=crop";
                        return (
                            <div key={index} className="group bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                                <div className="relative">
                                    <img 
                                        loading="lazy"
                                        src={`${baseUrl}${queryParams}&w=400`}
                                        srcSet={`${baseUrl}${queryParams}&w=400 400w, ${baseUrl}${queryParams}&w=800 800w`}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        alt={item.alt} 
                                        className="w-full h-56 object-cover" />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                                        <CameraIcon className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300" />
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                    <p className="mt-1 text-gray-600 text-sm">{item.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default ImageGallery;