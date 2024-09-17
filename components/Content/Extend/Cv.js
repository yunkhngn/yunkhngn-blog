import React from "react"
import Image from "next/image"
import { ImagePreview, Back } from "../../Template"


const Cv = ({themeUse, theme}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [loaded, setLoaded] = React.useState(false);
  const handleImageLoad = () => {
    setLoaded(true);
  };
  return (
    <article>
    <ImagePreview img="/image/cv.svg" alt="resume" isOpen={isOpen} setIsOpen={setIsOpen} />
    <div className={"resume" + (!loaded ? (" skeleton--"+theme) : "")}>
        <Image
          src="/image/cv.svg"
          alt="resume"
          fill
          priority={true}
          quality={100}
          sizes="100%"
          onLoad={handleImageLoad}
          style={{
            objectFit: "contain",
            borderRadius: "10px",
          }}
          onClick={() => setIsOpen(true)}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>
      <a 
      href="/image/cv.pdf" 
      download
      className="link"
      >Download CV?</a>
      <Back themeUse={themeUse} route="/"/>
      </article>
  )
}

export default Cv