import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CameraIcon, XIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import SafeImage from './SafeImage';

const galleryData = [
    {
        src: "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/AI%20Images/X-ray%20of%20a%20knee%20joint.png",
        alt: "Detailed X-ray of a human knee, used for advanced diagnostics to identify arthritis or injury.",
        title: "Advanced Knee Diagnostics",
        description: "Detailed imaging for precise diagnosis of knee conditions."
    },
    {
        src: "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/AI%20Images/Patient%20undergoing%20physical%20therapy.png",
        alt: "Physical therapist guiding a male patient through leg rehabilitation exercises to restore mobility post-surgery.",
        title: "Guided Rehabilitation",
        description: "Personalized physical therapy programs to ensure a swift recovery."
    },
    {
        src: "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/AI%20Images/Dr%20Sher%20reviewing%20a%20hip%20X-ray.png",
        alt: "Dr. Sher meticulously reviewing a hip X-ray, demonstrating the pre-operative planning process for surgical precision.",
        title: "Surgical Precision",
        description: "Meticulous pre-operative planning for hip replacement surgery."
    },
    {
        src: "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/AI%20Images/Dr%20Sher%20working%20in%20a%20modern%20operating%20room.png",
        alt: "Dr. Sher and his surgical team performing a procedure in a state-of-the-art operating room, highlighting their focus on modern techniques.",
        title: "State-of-the-Art Procedures",
        description: "Utilizing the latest technology in a sterile surgical environment."
    },
    {
        src: "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/AI%20Images/Generated%20Image%20September%2011%2C%202025%20-%206_42AM.png",
        alt: "Dr. Sher in a consultation, empathetically explaining a treatment plan to a patient and their partner using a tablet.",
        title: "Empathetic Patient Care",
        description: "Ensuring patients are informed and comfortable with their treatment plan."
    },
    {
        src: "https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/AI%20Images/%20X-ray%20of%20a%20human%20spine.png",
        alt: "Clear X-ray of the lumbar spine, used for diagnosing complex spinal conditions and trauma.",
        title: "Complex Spine & Trauma",
        description: "Expert care for complex trauma and spinal conditions."
    }
];


const ImageGallery: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const triggerElementRef = useRef<HTMLElement | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const touchStartXRef = useRef<number | null>(null);

    const openModal = (index: number) => {
        triggerElementRef.current = document.activeElement as HTMLElement;
        setSelectedImage(index);
    };
    
    const closeModal = () => setSelectedImage(null);

    const nextImage = useCallback(() => {
        if (selectedImage !== null) {
            setSelectedImage((prev) => (prev! + 1) % galleryData.length);
        }
    }, [selectedImage]);

    const prevImage = useCallback(() => {
        if (selectedImage !== null) {
            setSelectedImage((prev) => (prev! - 1 + galleryData.length) % galleryData.length);
        }
    }, [selectedImage]);

    useEffect(() => {
        if (selectedImage === null) {
            triggerElementRef.current?.focus();
            return;
        }

        const modalNode = modalRef.current;
        if (!modalNode) return;

        // FIX: Explicitly type querySelectorAll result as HTMLElement to ensure access to .focus() and .getAttribute().
        const focusableElements = Array.from(modalNode.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ));
        
        if (focusableElements.length > 0) {
            const closeButton = focusableElements.find(el => el.getAttribute('aria-label') === 'Close gallery view');
            (closeButton || focusableElements[0])?.focus();
        } else {
            modalNode.focus();
        }
        
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();

            if (e.key === 'Tab') {
                if (focusableElements.length <= 1) {
                    e.preventDefault();
                    return;
                }
                
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);

                if (e.shiftKey) {
                    if (document.activeElement === firstElement || currentIndex === -1) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement || currentIndex === -1) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);

    }, [selectedImage, nextImage, prevImage]);
    
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartXRef.current === null) return;

        const currentX = e.touches[0].clientX;
        const deltaX = touchStartXRef.current - currentX;
        const swipeThreshold = 50;

        if (deltaX > swipeThreshold) {
            nextImage();
            touchStartXRef.current = null;
        } else if (deltaX < -swipeThreshold) {
            prevImage();
            touchStartXRef.current = null;
        }
    };
    
    const handleTouchEnd = () => {
        touchStartXRef.current = null;
    };

    return (
        <section id="gallery" tabIndex={-1} className="py-24 bg-white focus:outline-none" aria-labelledby="gallery-heading">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 id="gallery-heading" className="text-4xl md:text-5xl font-bold text-gray-900 font-heading">Surgical Outcomes Gallery</h2>
                    <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
                        Visualizing the path to recovery and renewed mobility through successful patient outcomes.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleryData.map((item, index) => {
                        const baseUrl = item.src.split('?')[0];
                        const queryParams = "?q=80&auto=format&fit=crop";
                        return (
                             <button
                                key={index}
                                onClick={() => openModal(index)}
                                className="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 text-left focus:outline-none focus:ring-4 focus:ring-blue-300"
                                aria-label={`View details for ${item.title}`}
                            >
                                <div className="relative aspect-w-3 aspect-h-4 overflow-hidden">
                                    <SafeImage 
                                        loading="lazy"
                                        src={`${baseUrl}${queryParams}&w=400`}
                                        srcSet={`${baseUrl}${queryParams}&w=400 400w, ${baseUrl}${queryParams}&w=800 800w`}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        alt={item.alt} 
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                                        <CameraIcon className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300" />
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold text-gray-800 font-heading">{item.title}</h3>
                                    <p className="mt-1 text-gray-700 text-sm">{item.description}</p>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>

            <AnimatePresence>
                {selectedImage !== null &&
                    (() => {
                        const currentImage = galleryData[selectedImage];
                        const baseUrl = currentImage.src.split('?')[0];
                        const queryParams = "?q=80&auto=format&fit=crop";

                        return (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                                onClick={closeModal}
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="gallery-modal-title"
                                aria-describedby="gallery-modal-description"
                            >
                                <motion.div
                                    ref={modalRef}
                                    tabIndex={-1}
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0.9, y: 20 }}
                                    transition={{ duration: 0.2 }}
                                    className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden focus:outline-none"
                                    onClick={(e) => e.stopPropagation()}
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    <div className="relative md:w-2/3 flex-shrink-0 bg-gray-900 flex items-center justify-center">
                                        <SafeImage
                                            src={`${baseUrl}${queryParams}&w=800`}
                                            srcSet={`${baseUrl}${queryParams}&w=400 400w, ${baseUrl}${queryParams}&w=800 800w, ${baseUrl}${queryParams}&w=1200 1200w`}
                                            sizes="(max-width: 767px) 90vw, 66vw"
                                            alt={currentImage.alt}
                                            className="w-full h-auto max-h-[50vh] md:max-h-[90vh] object-contain"
                                        />
                                        <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white" aria-label="Previous image">
                                            <ChevronLeftIcon className="h-6 w-6" />
                                        </button>
                                        <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white" aria-label="Next image">
                                            <ChevronRightIcon className="h-6 w-6" />
                                        </button>
                                    </div>

                                    <div className="p-6 md:w-1/3 flex flex-col justify-center">
                                        <h3 id="gallery-modal-title" className="text-2xl font-bold text-gray-900 font-heading">{currentImage.title}</h3>
                                        <p id="gallery-modal-description" className="mt-2 text-gray-700">{currentImage.description}</p>
                                    </div>

                                    <button onClick={closeModal} className="absolute top-2 right-2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white" aria-label="Close gallery view">
                                        <XIcon className="h-6 w-6" />
                                    </button>
                                </motion.div>
                            </motion.div>
                        );
                    })()
                }
            </AnimatePresence>
        </section>
    );
};

export default ImageGallery;