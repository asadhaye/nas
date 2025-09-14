import React from 'react';
import { CameraIcon } from './icons';

const galleryData = [
    {
        src: "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/AI%20Images/X-ray%20of%20a%20knee%20joint.png",
        alt: "High-resolution X-ray of a knee joint",
        title: "Advanced Knee Diagnostics",
        description: "Detailed imaging for precise diagnosis of knee conditions."
    },
    {
        src: "https://images.unsplash.com/photo-1517865288-975210e956a4?q=80&auto=format&fit=crop",
        alt: "Patient undergoing physical therapy for their leg",
        title: "Guided Rehabilitation",
        description: "Personalized physical therapy programs to ensure a swift recovery."
    },
    {
        src: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&auto=format&fit=crop",
        alt: "Surgeon reviewing a hip X-ray",
        title: "Surgical Precision",
        description: "Meticulous pre-operative planning for hip replacement surgery."
    },
    {
        src: "https://images.unsplash.com/photo-1581594549591-ff245842cda0?q=80&auto=format&fit=crop",
        alt: "Surgical team working in a modern operating room",
        title: "State-of-the-Art Procedures",
        description: "Utilizing the latest technology in a sterile surgical environment."
    },
    {
        src: "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/AI%20Images/Generated%20Image%20September%2011%2C%202025%20-%206_42AM.png",
        alt: "Doctor discussing results with a patient",
        title: "Empathetic Patient Care",
        description: "Ensuring patients are informed and comfortable with their treatment plan."
    },
    {
        src: "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/AI%20Images/%20X-ray%20of%20a%20human%20spine.png",
        alt: "X-ray of a human spine",
        title: "Complex Spine & Trauma",
        description: "Expert care for complex trauma and spinal conditions."
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