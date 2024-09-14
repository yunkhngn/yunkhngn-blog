import React from 'react'

const Footer = ({content}) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
        <p><i>{content}</i></p>
        <br/>
        <p><strong>Khoa Nguyễn</strong></p>
        <p>&copy; {currentYear} Khoa Nguyễn. All rights reserved!</p>
    </footer>
  )
}

export default Footer