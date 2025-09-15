import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Conditions from './components/Conditions';
import Testimonials from './components/Testimonials';
import ImageGallery from './components/ImageGallery';
import Faq from './components/Faq';
import AiAssistant from './components/AiAssistant';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
// import metadata from './metadata.json';
import { conditionsData } from './data/conditionsData';

const App: React.FC = () => {
    useEffect(() => {
        // Update document title
        // document.title = metadata.name;

        // Update meta description
        // const descriptionTag = document.querySelector('meta[name="description"]');
        // if (descriptionTag) {
        //     descriptionTag.setAttribute('content', metadata.description);
        // }

        // Update meta keywords
        const keywordsTag = document.querySelector('meta[name="keywords"]');
        if (keywordsTag) {
            const baseKeywords = "Orthopedic Surgeon Lahore, Dr. Naveed Ali Shair, knee replacement, hip replacement, ACL surgery, trauma surgeon, joint replacement, Farooq Hospital DHA";
            const dynamicKeywords = conditionsData.map(c => c.title).join(', ');
            keywordsTag.setAttribute('content', `${`${baseKeywords}, ${dynamicKeywords}`}`);
        }
    }, []);

    return (
        <div className="bg-white text-gray-800 font-sans">
            <Header />
            <main>
                <Hero />
                <About />
                <Conditions />
                <Testimonials />
                <ErrorBoundary
                    sectionId="gallery"
                    fallbackMessage="The image gallery could not be loaded at this moment. Please try again."
                >
                    <ImageGallery />
                </ErrorBoundary>
                <Faq />
                <ErrorBoundary
                    sectionId="ai-assistant"
                    fallbackMessage="The AI assistant is currently unavailable due to a technical issue."
                >
                    <AiAssistant />
                </ErrorBoundary>
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default App;