import React from "react";
import { Para } from "../../Template";
import { Div, Textarea, Input, Button, Text, Icon } from "atomize";
import ElementSpace from "../ElementSpace";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Warnbeforeunload from "../WarnBeforeUnload";

const ContactForm = ({ theme, themeUse, desc }) => {
  const onDevelopmentEnv = process.env.NODE_ENV === "development";
  const [submited, setSubmited] = useState(false);
  const [data, setData] = React.useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });
  const checkMailFormat = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const handleSubmit = () => {
    if (
      data.name.length > 1 &&
      data.email.length > 4 &&
      data.title.length > 4 &&
      data.message.length > 5 &&
      checkMailFormat(data.email) &&
      authenticated
    ){
      submitForm();
      setSubmited(true);
    } else {
      alert("Cậu chưa điền đủ/sai thông tin hoặc chưa xác nhận captcha");
    }
  };
  const [authenticated, setAuthenticated] = useState(
    onDevelopmentEnv ? true : false
  );
  const submitForm = (event) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!onDevelopmentEnv) {
      emailjs.send(
        process.env.SERVICE_ID,
        process.env.TEMPLATE_ID,
        {
          email: data.email,
          from_name: data.name,
          message: data.message,
          title: data.title,
        },
        process.env.PUBLIC_KEY
      );
      alert("Cảm ơn cậu đã liên hệ với tớ, tớ sẽ trả lời cậu sớm nhất có thể");
    } else {
      alert("Đã gửi r nhé | Development mode");
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
          textColor={theme === "light" ? "#171717" : "#ededed"}
        >
          Họ và tên
        </Text>
        <Input
          m={{ b: "1em" }}
          h="3.5em"
          bg={theme === "light" ? "#f9f9f9" : "rgba(20,20,20)"}
          borderColor={theme === "light" ? "#f9f9f9" : "#171717"}
          focusBorderColor="none"
          textColor={theme === "light" ? "#171717" : "#ededed"}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder="Họ và tên của bạn"
        />
        <Text
          tag="section"
          textSize="title"
          textWeight="600"
          m={{ b: "0.5em" }}
          textColor={theme === "light" ? "#171717" : "#ededed"}
        >
          Email
        </Text>
        <Input
          m={{ b: "1em" }}
          h="3.5em"
          bg={theme === "light" ? "#f9f9f9" : "rgba(20,20,20)"}
          borderColor={theme === "light" ? "#f9f9f9" : "#171717"}
          focusBorderColor="none"
          textColor={theme === "light" ? "#171717" : "#ededed"}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="example@abc.com"
        />
        <Text
          tag="section"
          textSize="title"
          textWeight="600"
          m={{ b: "0.5em" }}
          textColor={theme === "light" ? "#171717" : "#ededed"}
        >
          Tiêu đề
        </Text>
        <Input
          m={{ b: "1em" }}
          h="3.5em"
          bg={theme === "light" ? "#f9f9f9" : "rgba(20,20,20)"}
          borderColor={theme === "light" ? "#f9f9f9" : "#171717"}
          focusBorderColor="none"
          textColor={theme === "light" ? "#171717" : "#ededed"}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          placeholder="Tiêu đề"
        />
        <Text
          tag="section"
          textSize="title"
          textWeight="600"
          m={{ b: "0.5em" }}
          textColor={theme === "light" ? "#171717" : "#ededed"}
        >
          Nội dung
        </Text>
        <Textarea
          m={{ b: "1em" }}
          h="250px"
          bg={theme === "light" ? "#f9f9f9" : "rgba(20,20,20)"}
          borderColor={theme === "light" ? "#f9f9f9" : "#171717"}
          focusBorderColor="none"
          textColor={theme === "light" ? "#171717" : "#ededed"}
          onChange={(e) => setData({ ...data, message: e.target.value })}
          placeholder="Nội dung của bạn..."
          fontFamily="primary"
        />
        {!onDevelopmentEnv && (
          <Div m={{ t: "1em" }}>
            <Text tag="section" textSize="paragraph" m={{ b: "0.5em" }}>
              Lưu ý: điền captcha trước khi submit nhé!
            </Text>
            <HCaptcha
            sitekey="31677f64-0983-4d5f-afcf-bcb06e4a6bc6"
            onVerify={() => {
              setAuthenticated(true);
            }}
            theme={theme === "light" ? "light" : "dark"}
            ></HCaptcha>
        </Div>
        )}
        <Button
          textColor={theme === "light" ? "#ededed" : "#171717"}
          bg={theme === "light" ? "#171717" : "#ededed"}
          hoverBg={theme === "light" ? "black700" : "gray500"}
          w="100%"
          onClick={handleSubmit}
          disabled={submited}
          m={{ t: "1em" }}
        >
          Gửi cho tớ
        </Button>
      </Div>
      <ElementSpace space="12em" />
      {
        (data.name.length > 1 ||
        data.email.length > 1 ||
        data.title.length > 1 ||
        data.message.length > 1) &&
        <Warnbeforeunload/>
      }
    </article>
  );
};

export default ContactForm;
