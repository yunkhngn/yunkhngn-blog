import React from "react";
import { Para } from "../../Template";
import { Div } from "atomize";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Gallery = ({ desc, theme, themeUse, data }) => {
  const [loaded, setLoaded] = useState({});

  const handleImageLoad = (id) => {
    setLoaded((prev) => ({
      ...prev,
      [id]: true,  // Đánh dấu ảnh đã tải
    }));
  };

  return (
    <article>
      <Para color={themeUse.secondary}>{desc.desc}</Para>
      <Div m={{ b: "1.7em" }} />
      <hr className={"hr" + theme} />
      <div className="photography">
        {data.length > 0 ? (
          data.map((item) => (
            <Link passHref href={`/photo/${item.slug}`} key={item.id}>
              <div className={"photo" + (!loaded[item.id] ? " skeleton--" + theme : "")}>
                <Image
                  fill={true}
                  src={item.images[0].url.startsWith('http') ? item.images[0].url : `https:${item.images[0].url}`}
                  alt={item.title || 'Photo'}
                  quality={75}
                  sizes="(max-width: 768px) calc(100vw / 3), (max-width: 1200px) calc(100vw / 3), 33vw"
                  onLoad={() => handleImageLoad(item.id)} 
                  onError={(e) => {
                    console.error('Image failed to load:', item.images[0].url);
                    e.target.style.display = 'none';
                  }}
                  loading="lazy" 
                  style={{
                    objectFit: 'cover',
                  }}
                  onDragStart={(e) => e.preventDefault()}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </Link>
          ))
        ) : (
            <Para color={themeUse.secondary}>Chưa có ảnh được đăng cả.</Para>
          )
          }
      </div>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://instagram.com/yun.khngn"
      >
        <Div
          textColor={themeUse.secondary}
          hoverTextColor={themeUse.hover}
          transition
          textAlign="center"
          m={{ t: "1em" }}
        >
          Xem instagram của tớ...
        </Div>
      </a>
    </article>
  );
};

export default Gallery;
