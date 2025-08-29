import React from 'react';
import { Text, Div } from 'atomize';

const LoadingCanva = ({ theme, themeUse }) => {
  return (
    <Div
      d="flex"
      flexDir="column"
      align="center"
      justify="center"
      minH="100vh"
      p="2rem"
      bg={themeUse.background}
      color={themeUse.text}
    >
      <Div
        w="100%"
        maxW="600px"
        spaceY="1rem"
      >
        {/* Skeleton for title */}
        <Div
          h="2rem"
          bg={themeUse.secondary}
          rounded="md"
          w="60%"
          m="0 auto"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
        
        {/* Skeleton for content */}
        {[...Array(5)].map((_, i) => (
          <Div
            key={i}
            h="1rem"
            bg={themeUse.secondary}
            rounded="md"
            w={`${80 - i * 10}%`}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
        
        {/* Loading text */}
        <Text
          textAlign="center"
          textSize="body"
          color={themeUse.secondary}
          m={{ t: "2rem" }}
        >
          Loading...
        </Text>
      </Div>
    </Div>
  );
};

export default LoadingCanva;