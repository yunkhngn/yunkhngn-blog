import React from "react";
import Image from "next/image";
import { ImagePreview } from "../../Template";
import {useState} from "react";

const ImageModal = ({url, theme}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const OpenModal = ({check}) => {
    setIsModalOpen(check);
    document.body.style.overflow = { check } ? "hidden" : "auto";
  }

  const [loaded, setLoaded] = useState(false);
  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div className={"photoPost" + (!loaded ? (" skeleton--"+theme) : "")}>
      <ImagePreview img={"https:" + url} alt="img" isOpen={isModalOpen} setIsOpen={OpenModal}/>
      <Image
        fill={true}
        src={"https:" + url}
        alt="img"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        quality={75}
        loading="lazy"
        onLoad={handleImageLoad}
        style={{
          objectFit: "cover",
        }}
        onDragStart={(e) => e.preventDefault()}
        onClick={() => setIsModalOpen(true)}
      />
    </div>
  );
};

export default ImageModal;
