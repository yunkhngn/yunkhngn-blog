import React from "react"
import Image from "next/image"
import { ImagePreview, Back } from "../../Template"


const Cv = ({themeUse}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <article>
    <ImagePreview img="/image/cv.svg" alt="resume" isOpen={isOpen} setIsOpen={setIsOpen} />
    <div className="resume">
        <Image
          src="/image/cv.svg"
          alt="resume"
          fill
          priority={true}
          quality={100}
          sizes="100%"
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