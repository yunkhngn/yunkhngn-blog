import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Image } from 'atomize';

const SkeletonImage = ({ src, alt, h, w, rounded }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div style={{ position: 'relative', width: w, height: h }}>
            {isLoading && <Skeleton height={h} width={w} />}
            <Image
                src={src}
                alt={alt}
                h={h}
                w={w}
                rounded={rounded}
                onLoad={() => setIsLoading(false)}
                style={{ visibility: isLoading ? 'hidden' : 'visible' }}
            />
        </div>
    );
};

export default SkeletonImage;