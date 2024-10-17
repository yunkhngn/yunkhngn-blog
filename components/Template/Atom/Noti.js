import React from 'react'
import { Notification } from 'atomize'

const Noti = ({message, showNotification, setState, theme}) => {

  return (
    <Notification
    isOpen={showNotification}
    onClick={() => setState(false)}
    onClose={() => setState(false)}
    bg={theme === "light" ? "#161616" : "white"}
    textColor={theme === "light" ? "#ededed" : "#171717"}
    >
    {message}
  </Notification>
  )
}

export default Noti