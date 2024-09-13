import React from "react";
import { Modal, Button, Icon } from "atomize";
import Image from "next/image";

const ImageModal = ({ theme, themeUse, url }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const OpenModal = ({check}) => {
    setIsModalOpen(check);
    //set body overflow hidden
    document.body.style.overflow = { check } ? "hidden" : "auto";
  }
  

  return (
    <div className="modal">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rounded="0"
        maxW="100vw"
        m="0"
        h="100vh"
        bg={themeUse.bg}
      >
        <Image
          fill={true}
          src={"https:" + url}
          alt="img"
          priority={true}
          style={{
            objectFit: "contain",
            borderRadius: "0",
          }}
          onDragStart={(e) => e.preventDefault()}
        />
        <Button
        pos="absolute"
        top="20px"
        right="20px"
        h="3em"
        w="3em"
        bg={themeUse.bgButton}
        hoverBg={themeUse.bgButtonHover}
        shadow="2"
        hoverShadow="4"
        borderColor={themeUse.border}
        textColor={theme === "light" ? "white" : "dark"}
        onClick={() => setIsModalOpen(false)}
        >
        <Icon name="Cross" size="20px" color={theme === "light" ? "white" : "dark"} />
        </Button>
      </Modal>
      <Image
        fill={true}
        src={"https:" + url}
        alt="img"
        priority={true}
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
