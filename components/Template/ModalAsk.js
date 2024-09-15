import React from 'react'
import {Modal, Icon, Text, Div, Button} from 'atomize'

const ModalAsk = ({isOpen, question, action, handleModal}) => {

  return (
    <Modal
        isOpen={isOpen}
        m={{ y: "4rem", x: { xs: "1rem", lg: "auto" } }}
        rounded="md"
        align="center"
      >
        <Icon
          name="Cross"
          pos="absolute"
          top="1rem"
          right="1rem"
          size="16px"
          onClick={() => handleModal(false)}
          cursor="pointer"
        />
        <Text
          p={{ l: "0.5rem", t: "0.25rem" }}
          textSize="subheader"
          m={{ b: "2rem" }}
        >
          {question}
        </Text>
        <Div d="flex" justify="flex-end">
          <Button
            onClick={() => handleModal(false)}
            bg="gray200"
            textColor="medium"
            m={{ r: "1rem" }}
          >
            Không
          </Button>
          <Button onClick={action}>Có</Button>
        </Div>
      </Modal>
  )
}

export default ModalAsk