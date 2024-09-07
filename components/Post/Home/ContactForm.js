import React from "react";
import { Para } from "../../Template";
import { Div, Textarea, Input, Button, Text, Icon } from "atomize";
import ElementSpace from "../ElementSpace";

const ContactForm = ({ theme, themeUse, desc }) => {
  const handleForm = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  }
  return (
    <form>
      <Para color={themeUse.secondary}>{desc.desc}</Para>
      <Div m={{ b: "1.7em" }} />
      <hr className={"hr" + theme} />
      <Div>
        <Text
          tag="section"
          textSize="title"
          textWeight="600"
          m={{ b: "0.5em" }}
          textColor={theme === "light" ? "#333" : "#858585"}
        >
          Họ và tên
        </Text>
        <Input 
          m={{ b: "1em" }}
          h="3.5em" 
          bg={theme === "light" ? "#f9f9f9" : "rgba(20,20,20)"}
          borderColor={theme === "light" ? "#f9f9f9" : "#171717"}
          focusBorderColor="none"
          textColor={theme === "light" ? "#333" : "#858585"}
          />
        <Text
          tag="section"
          textSize="title"
          textWeight="600"
          m={{ b: "0.5em" }}
          textColor={theme === "light" ? "#333" : "#858585"}
        >
          Email
        </Text>
        <Input
        m={{ b: "1em" }}
        h="3.5em" 
        bg={theme === "light" ? "#f9f9f9" : "rgba(20,20,20)"}
        borderColor={theme === "light" ? "#f9f9f9" : "#171717"}
        focusBorderColor="none"
        textColor={theme === "light" ? "#333" : "#858585"}
        />
        <Text tag="section" textSize="paragraph" m={{ b: "0.5em" }}>
          example@abc.com
        </Text>
        <Text
          tag="section"
          textSize="title"
          textWeight="600"
          m={{ b: "0.5em" }}
          textColor={theme === "light" ? "#333" : "#858585"}
        >
          Tiêu đề
        </Text>
        <Input
        m={{ b: "1em" }}
        h="3.5em" 
        bg={theme === "light" ? "#f9f9f9" : "rgba(20,20,20)"}
        borderColor={theme === "light" ? "#f9f9f9" : "#171717"}
        focusBorderColor="none"
        textColor={theme === "light" ? "#333" : "#858585"}
        />
        <Text
          tag="section"
          textSize="title"
          textWeight="600"
          m={{ b: "0.5em" }}
          textColor={theme === "light" ? "#333" : "#858585"}
        >
          Nội dung
        </Text>
        <Textarea
        m={{ b: "1em" }}
        h="250px" 
        bg={theme === "light" ? "#f9f9f9" : "rgba(20,20,20)"}
        borderColor={theme === "light" ? "#f9f9f9" : "#171717"}
        focusBorderColor="none"
        textColor={theme === "light" ? "#333" : "#858585"}
        />
        <Button
        textColor={theme === "light" ? "#ededed" : "#171717"}
        bg={theme === "light" ? "#171717" : "#ededed"}
        hoverBg={theme === "light" ? "black700" : "gray500"}
        w="100%"
        onClick={handleForm}
        suffix={
          <Icon
            name="RightArrow"
            size="16px"
            color={theme === "light" ? "#ededed" : "#171717"}
            m={{ l: "0.5rem" }}
          />
        }
        >Gửi cho tớ</Button>
      </Div>
      <ElementSpace space="12em" />
    </form>
  );
};

export default ContactForm;
