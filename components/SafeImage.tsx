import React, { useState } from 'react';
import { ImageIcon } from './icons';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const SafeImage: React.FC<SafeImageProps> = ({ className, alt, ...props }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`} role="img" aria-label={alt}>
                <ImageIcon className="h-1/3 w-1/3" />
            </div>
        );
    }

    return <img alt={alt} className={className} {...props} onError={() => setHasError(true)} />;
};

export default SafeImage;
