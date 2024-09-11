import React from "react";
import { Para } from "../../Template";
import { Div } from "atomize";
import ElementSpace from "../ElementSpace";
import Link from "next/link";
import Image from "next/image";

const Gallery = ({ desc, theme, themeUse, data }) => {
  return (
    <article>
      <Para color={themeUse.secondary}>{desc.desc}</Para>
      <Div m={{ b: "1.7em" }} />
      <hr className={"hr" + theme} />
      <div className="photography">
        {(data.length > 0) ? data.map((item) => (
            <Link passHref href={`/photo/${item.slug}`} key={item.id}>
              <div className="photo">
                <Image
                  fill={true}
                  src={"https:" + item.images[0].url}
                  alt={item.title}
                  quality={50}
                  priority={true}
                  style={{
                    objectFit: 'cover',
                  }}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
            </Link>
          )) : (
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
      <ElementSpace space="12em" />
    </article>
  );
};

export default Gallery;
