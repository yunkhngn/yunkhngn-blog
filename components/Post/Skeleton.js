import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Image } from 'atomize';

const SkeletonImage = ({ src, alt, h, w, rounded, m }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div>
            <Image
                src={src}
                alt={alt}
                h={h}
                w={w}
                rounded={rounded}
                m={m}
                onLoad={() => setIsLoading(false)}
                d="block"
            />
            {isLoading && <Skeleton height={h} width={w} />}
        </div>
    );
};

export default SkeletonImage;