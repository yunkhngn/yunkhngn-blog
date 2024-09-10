import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';

const SkeletonImage = ({ src, alt, h, w }) => {
    const isLoading = true
    console.log(src)
    return (
            <>
            <Image
                fill={true}
                src={"https:" + src}
                alt={alt}
                style={{
                    objectFit: 'cover',   
                }}
                // onLoad={() => setIsLoading(false)}
            />
            {isLoading && <Skeleton height={h} width={w} />}
            </>
    );
};

export default SkeletonImage;