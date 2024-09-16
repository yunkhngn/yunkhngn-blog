import React from "react";
import { Para, Noti, ElementSpace, WarnBeforeUnload, ModalAsk } from "../../../Template";
import {
  Div,
} from "atomize";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import Form from "./Form";
import Functioning from "./Functioning";

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
       <Form theme={theme} setData={setData} data={data}/>
       <Functioning
        setAuthenticated={setAuthenticated}
        setError={setError}
        setState={setState}
        submitted={submitted}
        onDevelopmentEnv={onDevelopmentEnv}
        handleSubmit={handleSubmit}
        theme={theme}
        />
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
