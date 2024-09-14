import Link from "next/link"
import { Div, Modal } from "atomize"
import React from "react"
import Image from "next/image"
import { ElementSpace } from "../../Template"


const Cv = ({themeUse}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <article>
      <Modal
        isOpen={isOpen}
        align="center"
        onClose={() => setIsOpen(false)}
        rounded="0"
        maxW="100vw"
        m="0"
        h="100vh"
        bg="rgba(0, 0, 0, 0.6)"
      >
        <Image
          src="/image/cv.svg"
          alt="resume"
          fill={true}
          priority={true}
          quality={100}
          onClick={() => setIsOpen(false)}
          style={{
            objectFit: "contain",
          }}
          onDragStart={(e) => e.preventDefault()}
        />
      </Modal>
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