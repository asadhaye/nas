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
import { conditionsData } from './data/conditionsData';
import AnimatedSection from './components/AnimatedSection';
import SectionDivider from './components/SectionDivider';

const App: React.FC = () => {
    useEffect(() => {
        const keywordsTag = document.querySelector('meta[name="keywords"]');
        if (keywordsTag) {
            const baseKeywords = "Orthopedic Surgeon Lahore, Dr. Naveed Ali Sher, knee replacement, hip replacement, ACL surgery, trauma surgeon, joint replacement, Farooq Hospital DHA";
            const dynamicKeywords = conditionsData.map(c => c.title).join(', ');
            keywordsTag.setAttribute('content', `${`${baseKeywords}, ${dynamicKeywords}`}`);
        }
    }, []);

    return (
        <div className="text-gray-800 font-sans">
            <Header />
            <main>
                <Hero />
                <AnimatedSection>
                    <About />
                </AnimatedSection>
                <SectionDivider className="text-white" />
                <AnimatedSection>
                    <Conditions />
                </AnimatedSection>
                <SectionDivider className="text-white" />
                <AnimatedSection>
                    <Testimonials />
                </AnimatedSection>
                <SectionDivider className="text-sky-50" />
                <AnimatedSection>
                     <ErrorBoundary
                        sectionId="gallery"
                        fallbackMessage="The image gallery could not be loaded at this moment. Please try again."
                    >
                        <ImageGallery />
                    </ErrorBoundary>
                </AnimatedSection>
                <SectionDivider className="text-white" />
                 <AnimatedSection>
                    <Faq />
                </AnimatedSection>
                <SectionDivider className="text-sky-50" />
                <AnimatedSection>
                    <ErrorBoundary
                        sectionId="ai-assistant"
                        fallbackMessage="The AI assistant is currently unavailable due to a technical issue."
                    >
                        <AiAssistant />
                    </ErrorBoundary>
                </AnimatedSection>
                <SectionDivider className="text-white" />
                <AnimatedSection>
                    <Contact />
                </AnimatedSection>
            </main>
            <Footer />
        </div>
    );
};

export default App;