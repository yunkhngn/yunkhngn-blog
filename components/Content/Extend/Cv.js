import Link from "next/link"
import { Div } from "atomize"
import React from "react"
import Image from "next/image"
import { ElementSpace, ImagePreview } from "../../Template"


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
      <Link href="/" passHref scroll={true}>
        <Div
          m={{ t: "1em" }}
          textColor={themeUse.secondary}
          hoverTextColor={themeUse.hover}
          transition
        >
          Quay lại trang chủ...
        </Div>
      </Link>
      <ElementSpace space="12em" />
      </article>
  )
}

export default Cv