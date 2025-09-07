import React, { useState } from 'react';
import { LocationMarkerIcon, PhoneIcon, ClockIcon, MailIcon, CheckCircleIcon } from './icons';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // This is a frontend-only simulation.
        // In a real application, you would send the data to a server here.
        console.log("Form Data Submitted:", formData);
        setIsSubmitted(true);
    };

    return (
        <section id="contact" className="py-20 bg-white" aria-labelledby="contact-heading">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Get In Touch</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        To schedule an appointment, please use the contact details or fill out the form below.
                    </p>
                </div>
                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Farooq Hospital DHA</h3>
                            <div className="space-y-5 text-gray-600">
                                <div className="flex items-start gap-4">
                                    <LocationMarkerIcon className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <strong className="text-gray-800">Address:</strong><br/>
                                        Avenue Mall, Main Ghazi Rd,<br/>
                                        DHA, Lahore
                                    </div>
                                </div>
                                 <div className="flex items-start gap-4">
                                    <PhoneIcon className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <strong className="text-gray-800">For Appointment Call Now:</strong><br/>
                                        <a href="tel:+923219728977" className="hover:text-blue-600 transition-colors">+92-321-97 28 977</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MailIcon className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <strong className="text-gray-800">Email:</strong><br/>
                                        <a href="mailto:dr.naveed@nasorthopedics.com" className="hover:text-blue-600 transition-colors">dr.naveed@nasorthopedics.com</a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-gray-200">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Request a Consultation</h3>
                                {isSubmitted ? (
                                    <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg flex items-start gap-4" role="alert">
                                        <CheckCircleIcon className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-lg">Thank you for your request!</h4>
                                            <p className="mt-1">Our team will get in touch with you shortly to confirm your appointment. We appreciate you choosing Dr. Sher for your care.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                            <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                            <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                            <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Reason for Consultation</label>
                                            <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                                        </div>
                                        <div>
                                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300">
                                                Submit Request
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                        <div className="w-full h-96 md:h-full">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.4862423187216!2d74.38139707560754!3d31.45576897424176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919069680327a51%3A0x86de0a2a4b4f5351!2sFarooq%20Hospital%20DHA!5e0!3m2!1sen!2s!4v1689264871239!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                title="Farooq Hospital DHA Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;