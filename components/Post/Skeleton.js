import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Image } from 'atomize';

const SkeletonImage = ({ src, alt, h, w, rounded, m }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div>
            {isLoading && <Skeleton height={h} width={w} />}
            <Image
                src={src}
                alt={alt}
                h={h}
                w={w}
                m = {m}
                rounded={rounded}
                onLoad={() => setIsLoading(false)}
                style={{ visibility: isLoading ? 'hidden' : 'visible' }}
            />
        </div>
    );
};

export default SkeletonImage;