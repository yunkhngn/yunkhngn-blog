import React from "react";
import { Modal } from "atomize";
import Image from "next/image";

const ImageModal = ({ theme, themeUse, url }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const OpenModal = ({check}) => {
    setIsModalOpen(check);
    //set body overflow hidden
    document.body.style.overflow = { check } ? "hidden" : "auto";
  }
  return (
    <div className="photoPost">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rounded="0"
        maxW="100vw"
        m="0"
        h="100vh"
        bg="rgba(0, 0, 0, 0.6)"
      >
        <Image
          fill={true}
          src={"https:" + url}
          alt="img"
          priority={true}
          sizes="100%"
          style={{
            objectFit: "contain",
            borderRadius: "0",
          }}
          onDragStart={(e) => e.preventDefault()}
          onClick={() => setIsModalOpen(false)}
        />
      </Modal>
      <Image
        fill={true}
        src={"https:" + url}
        alt="img"
        priority={true}
        sizes="100%"
        style={{
          objectFit: "cover",
          borderRadius: "10px",
        }}
        onDragStart={(e) => e.preventDefault()}
        onClick={() => setIsModalOpen(true)}
      />
    </div>
  );
};

export default ImageModal;
