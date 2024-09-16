import React from 'react'
import { Text, Input, Textarea } from 'atomize'

const Form = ({theme, setData, data}) => {
  return (
    <form>
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
          rounded="12px"
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
          rounded="12px"
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
          rounded="12px"
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
          rounded="12px"
        />
    </form>
  )
}

export default Form