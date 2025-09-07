import React from 'react';

const Footer: React.FC = () => {
    const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="bg-gray-900 text-gray-400 py-8">
            <div className="container mx-auto px-6 text-center">
                 <div className="mb-6">
                    <h4 className="font-semibold text-gray-300 mb-2">Patient Resources</h4>
                    <div className="flex justify-center items-center gap-x-6 gap-y-2 flex-wrap text-sm">
                        <a href="https://www.msdmanuals.com/professional/resource" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            MSD Manuals (Professional)
                        </a>
                        <a href="https://www.reddit.com/r/ACL/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            r/ACL Subreddit
                        </a>
                    </div>
                </div>

                <p>&copy; {new Date().getFullYear()} Dr. Naveed Ali Sher. All Rights Reserved.</p>
                <p className="mt-2 text-sm">
                    This website is for informational purposes only and does not constitute medical advice.
                </p>
                 <div className="mt-4">
                    <a href="#top" onClick={handleScrollToTop} className="hover:text-white transition-colors">Back to Top</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;