import React from 'react';
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

const App: React.FC = () => {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans">
            <Header />
            <main>
                <Hero />
                <About />
                <Conditions />
                <Testimonials />
                <ImageGallery />
                <Faq />
                <AiAssistant />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default App;
