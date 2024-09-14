import React from "react";
import Image from "next/image";
import { ImagePreview } from "../../Template";

const ImageModal = ({url}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const OpenModal = ({check}) => {
    setIsModalOpen(check);
    document.body.style.overflow = { check } ? "hidden" : "auto";
  }
  return (
    <div className="photoPost">
      <ImagePreview img={"https:" + url} alt="img" isOpen={isModalOpen} setIsOpen={OpenModal}/>
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
