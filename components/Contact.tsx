import React, { useState } from 'react';
import { LocationMarkerIcon, PhoneIcon, MailIcon, CheckCircleIcon, FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon } from './icons';

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};
        if (!formData.name) newErrors.name = 'Full name is required.';
        if (!formData.email) {
            newErrors.email = 'Email address is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid.';
        }
        if (!formData.message) newErrors.message = 'Please enter a reason for your consultation.';
        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log("Form Data Submitted:", formData);
        setIsSubmitted(true);
    };

    return (
        <section id="contact" tabIndex={-1} className="py-20 bg-sky-50 focus:outline-none" aria-labelledby="contact-heading">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Get In Touch</h2>
                    <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
                        To schedule an appointment, use the contact details or fill out the form below.
                    </p>
                </div>
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-lg">
                    {/* Left Side: Info & Form */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                        <div className="space-y-5 text-gray-700 mb-10">
                            <InfoItem icon={<LocationMarkerIcon className="h-6 w-6 text-blue-600" />} label="Address" value="Avenue Mall, Main Ghazi Rd, DHA, Lahore" />
                            <InfoItem icon={<PhoneIcon className="h-6 w-6 text-blue-600" />} label="Appointment" value="+92-321-97 28 977" href="tel:+923219728977" />
                            <InfoItem icon={<MailIcon className="h-6 w-6 text-blue-600" />} label="Email" value="dr.naveed@nasorthopedics.com" href="mailto:dr.naveed@nasorthopedics.com" />
                        </div>

                        {isSubmitted ? (
                            <div className="bg-green-50 border-l-4 border-green-400 text-green-800 p-6 rounded-lg flex items-start gap-4" role="alert">
                                <CheckCircleIcon className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-lg">Thank you for your request!</h4>
                                    <p className="mt-1">Our team will contact you shortly to confirm your appointment.</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                                <InputField id="name" name="name" label="Full Name" value={formData.name} onChange={handleChange} error={errors.name} />
                                <InputField id="email" name="email" type="email" label="Email Address" value={formData.email} onChange={handleChange} error={errors.email} />
                                <TextareaField id="message" name="message" label="Reason for Consultation" value={formData.message} onChange={handleChange} error={errors.message} />
                                <div>
                                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300">
                                        Submit Request
                                    </button>
                                </div>
                            </form>
                        )}
                         <div className="mt-10 pt-8 border-t border-gray-200">
                                <h4 className="text-lg font-semibold text-center text-gray-700 mb-4">Follow on Social Media</h4>
                                <div className="flex justify-center items-center gap-6">
                                    <SocialLink href="#" icon={<TwitterIcon className="h-6 w-6" />} label="Follow on Twitter" />
                                    <SocialLink href="#" icon={<FacebookIcon className="h-6 w-6" />} label="Follow on Facebook" />
                                    <SocialLink href="#" icon={<LinkedInIcon className="h-6 w-6" />} label="Follow on LinkedIn" />
                                    <SocialLink href="#" icon={<InstagramIcon className="h-6 w-6" />} label="Follow on Instagram" />
                                </div>
                            </div>
                    </div>
                    {/* Right Side: Map */}
                    <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden min-h-[400px] lg:min-h-0">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.418888293608!2d74.4085726!3d31.485167999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919072594687f15%3A0xe4b85cbcbf71b34b!2sFarooq%20Hospital%20-%20DHA%20Avenue%20Mall!5e0!3m2!1sen!2s!4v1757895065408!5m2!1sen!2s"
                            width="100%" height="100%" style={{ border: 0 }}
                            allowFullScreen loading="lazy" title="Farooq Hospital DHA Location">
                        </iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Helper Components for Contact Form
const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string; href?: string }> = ({ icon, label, value, href }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">{icon}</div>
        <div>
            <strong className="text-gray-800">{label}:</strong><br/>
            {href ? <a href={href} className="hover:text-blue-600 transition-colors">{value}</a> : <span>{value}</span>}
        </div>
    </div>
);

const InputField: React.FC<{ id: string; name: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string; type?: string }> = 
({ id, name, label, value, onChange, error, type = 'text' }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input type={type} name={name} id={id} required value={value} onChange={onChange}
            className={`block w-full px-4 py-2 border rounded-md shadow-sm transition-colors ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
        />
        {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);

const TextareaField: React.FC<{ id: string; name: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; error?: string }> =
({ id, name, label, value, onChange, error }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea name={name} id={id} rows={4} required value={value} onChange={onChange}
            className={`block w-full px-4 py-2 border rounded-md shadow-sm transition-colors ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
        ></textarea>
        {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string; }> = ({ href, icon, label }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors" aria-label={label}>
        {icon}
    </a>
);

export default Contact;
