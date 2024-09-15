import React from "react";
import { Para, Noti, ElementSpace, WarnBeforeUnload, ModalAsk } from "../../Template";
import {
  Div,
  Textarea,
  Input,
  Button,
  Text,
} from "atomize";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const ContactForm = ({ theme, themeUse, desc }) => {
  const onDevelopmentEnv = process.env.NODE_ENV === "development";
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [showNotification, setState] = React.useState(false);

  const handleModal = (check) => {
    setIsOpen(check);
    document.body.style.overflow = { check } ? "hidden" : "auto";
  };

  const [data, setData] = React.useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });
  const checkMailFormat = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const handleSubmit = () => {
    if (
      data.name.length > 1 &&
      data.email.length > 4 &&
      data.title.length > 4 &&
      data.message.length > 5 &&
      checkMailFormat(data.email) &&
      authenticated
    ) {
      handleModal(true);
    } else {
      if (!checkMailFormat(data.email)) {
        setError("Email không hợp lệ!");
        setState(true);
      } else if (authenticated === false) {
        setError("Cậu chưa điền captcha!");
        setState(true);
      } else {
        setError("Có vẻ như còn thiếu thông tin, hãy kiểm tra lại nhé!");
        setState(true);
      }
    }
  };

  const [authenticated, setAuthenticated] = useState(
    onDevelopmentEnv ? true : false
  );

  const submitForm = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    handleModal(false);
    setSubmitted(true);
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
      setError("Cảm ơn cậu đã gửi mail cho tớ!");
      setState(true);
    } else {
      setError("Cảm ơn cậu đã gửi mail cho tớ!");
      setState(true);
    }
  };
  return (
    <article>
      <Para color={themeUse.secondary}>{desc.desc}</Para>
      <Div m={{ b: "1.7em" }} />
      <hr className={"hr" + theme} />
      <Noti
        message={error}
        showNotification={showNotification}
        setState={setState}
        theme={theme}
      />
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
              onError={() => {
                setError("Captcha không hợp lệ!");
                setState(true);
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
          disabled={submitted}
          m={{ t: "1em" }}
        >
          Gửi cho tớ
        </Button>
      </Div>
      <ModalAsk
        isOpen={isOpen}
        question="Cậu chắc chắn muốn gửi mail này chứ?"
        action={submitForm}
        handleModal={handleModal}
      />
      <ElementSpace space="12em" />
      {(data.name.length > 1 ||
        data.email.length > 1 ||
        data.title.length > 1 ||
        data.message.length > 1) && <WarnBeforeUnload/>}
    </article>
  );
};

export default ContactForm;
