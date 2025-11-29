import React from 'react'
import { Modal } from 'atomize'
import Image from 'next/image'

const ImagePreview = ({img,alt, isOpen, setIsOpen}) => {
  return (
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
      src={img}
      alt={alt}
      fill={true}
      loading="lazy"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
      onClick={() => setIsOpen(false)}
      style={{
        objectFit: "contain",
      }}
      onDragStart={(e) => e.preventDefault()}
    />
  </Modal>
  )
}

export default ImagePreview