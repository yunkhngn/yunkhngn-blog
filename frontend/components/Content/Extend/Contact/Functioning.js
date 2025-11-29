import React from 'react'
import { Div, Button, Text } from 'atomize'
import HCaptcha from '@hcaptcha/react-hcaptcha'

const Functioning = ({setAuthenticated, setError, setState, submitted, onDevelopmentEnv, handleSubmit, theme}) => {
  return (
    <div>
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
          hoverBg="#ff9a9e"
          hoverTextColor="white"
          w="100%"
          transition
          h="3.5em"
          onClick={handleSubmit}
          disabled={submitted}
          m={{ t: "1em" }}
          rounded="12px"
        >
          Gửi cho tớ
        </Button>
    </div>
  )
}

export default Functioning