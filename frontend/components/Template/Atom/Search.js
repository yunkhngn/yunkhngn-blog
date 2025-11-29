import React from 'react'
import { Input } from 'atomize'
import {Para, Spacer} from '../'

const Search = ({title, subtitle, placeholder, theme, themeUse, postName}) => {
    const search = (e) => {
        const posts = document.querySelectorAll("."+postName);
        posts.forEach((post) => {
          if (post.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
            post.style.display = "block";
          } else {
            post.style.display = "none";
          }
        });
      };
  return (
    <div>
      <Para textSize="subheader" color={themeUse.primary}>
       {title}
      </Para>
      <Para color={themeUse.secondary} m={{ b: "1em" }}>
        {subtitle}
      </Para>
      <Input
        placeholder={placeholder}
        m={{ t: "1em", b: "1.5em" }}
        w="100%"
        h="3.5em"
        textSize="subheader"
        textColor={themeUse.secondary}
        rounded="12px"
        focusBorderColor={theme === "light" ? "gray300" : "#171717"}
        onChange={search}
        transition
        border="1px solid"
        bg={theme === "light" ? "#f9f9f9" : "rgba(20,20,20)"}
        borderColor={theme === "light" ? "gray300" : "#171717"}
      />
      <Spacer length="100%" theme={theme} />
    </div>
  )
}

export default Search