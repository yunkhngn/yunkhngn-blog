import React from "react";
import { Para } from "../../Template";
import { Div, Textarea, Input, Button, Text, Icon } from "atomize";
import ElementSpace from "../ElementSpace";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const ContactForm = ({ theme, themeUse, desc }) => {
  const onDevelopmentEnv = process.env.NODE_ENV === "development";
  const [data, setData] = React.useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const handleSubmit = () => {
    if (
      data.name !== "" &&
      data.email !== "" &&
      data.title !== "" &&
      data.message !== "" &&
      authenticated
    ) {
      submitForm();
    } else {
      alert("Cậu chưa điền đủ thông tin hoặc chưa xác nhận captcha");
    }
  };

  const [authenticated, setAuthenticated] = useState(onDevelopmentEnv ? true : false);
  console.log(authenticated);
  const submitForm = (event) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!onDevelopmentEnv) {
      emailjs.send(process.env.SERVICE_ID,process.env.TEMPLATE_ID,{
        email: data.email,
        from_name: data.name,
        message: data.message,
        title: data.title,
        },
        process.env.PUBLIC_KEY
      );
      alert("Cảm ơn cậu đã liên hệ với tớ, tớ sẽ trả lời cậu sớm nhất có thể");
    }
    else {
      alert("Đã gửi r nhé");
    }
  };
  return (
    <article>
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
          onChange={(e) => setData({ ...data, name: e.target.value })}
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
        onChange={(e) => setData({ ...data, email: e.target.value })}
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
        onChange={(e) => setData({ ...data, title: e.target.value })}
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
        onChange={(e) => setData({ ...data, message: e.target.value })}
        />
        {!onDevelopmentEnv && <HCaptcha
                sitekey="31677f64-0983-4d5f-afcf-bcb06e4a6bc6"
                onVerify={(token, ekey) => {
                  setAuthenticated(true);
                }}
                theme={theme === "light" ? "light" : "dark"}
              ></HCaptcha>}
        <Button
        textColor={theme === "light" ? "#ededed" : "#171717"}
        bg={theme === "light" ? "#171717" : "#ededed"}
        hoverBg={theme === "light" ? "black700" : "gray500"}
        w="100%"
        onClick={handleSubmit}
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
    </article>
  );
};

export default ContactForm;
