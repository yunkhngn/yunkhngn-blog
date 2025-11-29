import React from 'react';
import { Text, Div } from 'atomize';

const LoadingCanva = ({ theme, themeUse }) => {
  // Get skeleton color based on theme
  const getSkeletonColor = () => {
    return theme === "light" ? "gray300" : themeUse.secondary;
  };

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
        maxW="800px"
        spaceY="1rem"
      >
        {/* Main title skeleton */}
        <Div
          h="3rem"
          bg={getSkeletonColor()}
          rounded="lg"
          w="60%"
          m="0 auto"
          style={{
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
        
        {/* Subtitle skeleton */}
        <Div
          h="1.5rem"
          bg={getSkeletonColor()}
          rounded="md"
          w="40%"
          m="0 auto"
          style={{
            animation: 'pulse 2s ease-in-out infinite',
            animationDelay: '0.3s',
          }}
        />
        
        {/* Content skeleton */}
        {[...Array(4)].map((_, i) => (
          <Div
            key={i}
            h="1rem"
            bg={getSkeletonColor()}
            rounded="md"
            w={`${85 - i * 10}%`}
            m="0 auto"
            style={{
              animation: 'pulse 2s ease-in-out infinite',
              animationDelay: `${0.5 + i * 0.1}s`,
            }}
          />
        ))}
        
        {/* Loading animation */}
        <Div
          d="flex"
          justify="center"
          align="center"
          m={{ t: "3rem" }}
        >
          <Div
            w="3rem"
            h="3rem"
            border="3px solid"
            borderColor={getSkeletonColor()}
            borderTopColor={themeUse.primary}
            rounded="50%"
            style={{
              animation: 'spin 1s linear infinite',
            }}
          />
        </Div>
        
        {/* Loading text */}
        <Text
          textAlign="center"
          textSize="body"
          color={themeUse.secondary}
          m={{ t: "1rem" }}
          style={{
            animation: 'fadeInOut 2s ease-in-out infinite',
          }}
        >
          Loading amazing content...
        </Text>
      </Div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </Div>
  );
};

export default LoadingCanva;