import React from 'react'
import Image from 'next/image'
import { useState } from 'react'

const PicWrite = ({src, theme, title}) => {

  const [loaded, setLoaded] = useState(false);
  const handleImageLoad = () => {
    setLoaded(true);
  };
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
          />
    </div>
  )
}

export default PicWrite