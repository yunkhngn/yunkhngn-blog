import React from 'react'
import Image from 'next/image'
import { useState } from 'react'

const buildBlurUrl = (url) => {
  if (!url) return undefined;
  const sep = url.includes('?') ? '&' : '?';
  // tiny JPEG thumbnail to use as blur placeholder
  return `${url}${sep}w=16&fm=jpg&q=20`;
};

const PicWrite = ({src, theme, title}) => {

  const [loaded, setLoaded] = useState(false);
  const handleImageLoad = () => {
    setLoaded(true);
  };
  const blurUrl = buildBlurUrl(src);
  return (
    <div className={"writingPhoto" + (!loaded ? (" skeleton--"+theme) : "")}>
          <Image
            src={src}
            alt={title}
            fill
            priority={true}
            onLoad={handleImageLoad}
            quality={75}
            style={{
              objectFit: "cover",
            }}
            onDragStart={(e) => e.preventDefault()}
            placeholder="blur"
            blurDataURL={blurUrl}
          />
    </div>
  )
}

export default PicWrite