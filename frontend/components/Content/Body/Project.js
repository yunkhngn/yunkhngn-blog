import { Para, Search, ProjectRow } from "../../Template";
import { Div } from "atomize";
import { useState, useEffect } from "react";

const Project = ({ desc, theme, themeUse, prj }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const dateFormer = (date) => {
    let dateArr = date.split("T")[0].split("-");
    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
  };

  // Get skeleton color based on theme
  const getSkeletonColor = () => {
    return theme === "light" ? "gray300" : themeUse.secondary;
  };

  if (isLoading) {
    return (
      <article>
        <Para color={themeUse.secondary}>{desc.desc}</Para>
        <Div m={{ b: "1.7em" }} />
        <hr className={"hr" + theme} />
        
        {/* Search skeleton */}
        <Div m={{ b: "2rem" }}>
          <Div
            h="1.5rem"
            bg={getSkeletonColor()}
            rounded="md"
            w="40%"
            m={{ b: "0.5rem" }}
            style={{
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          <Div
            h="1rem"
            bg={getSkeletonColor()}
            rounded="md"
            w="60%"
            m={{ b: "1rem" }}
            style={{
              animation: 'pulse 2s ease-in-out infinite',
              animationDelay: '0.2s',
            }}
          />
          <Div
            h="3.5rem"
            bg={getSkeletonColor()}
            rounded="12px"
            w="100%"
            style={{
              animation: 'pulse 2s ease-in-out infinite',
              animationDelay: '0.4s',
            }}
          />
        </Div>

        {/* Project cards skeleton */}
        <Div>
          {[...Array(3)].map((_, i) => (
            <Div
              key={i}
              bg={themeUse.background}
              border="1px solid"
              borderColor={theme === "light" ? "gray300" : themeUse.border}
              rounded="24px"
              p="1.5rem"
              m={{ b: "1rem" }}
              style={{
                animation: 'slideIn 0.6s ease-out',
                animationDelay: `${i * 0.1}s`,
                animationFillMode: 'both',
              }}
            >
              <Div d="flex" justify="space-between" align="flex-start">
                <Div w="80%">
                  {/* Title skeleton */}
                  <Div
                    h="1.5rem"
                    bg={getSkeletonColor()}
                    rounded="md"
                    w="50%"
                    m={{ b: "0.75rem" }}
                    style={{
                      animation: 'pulse 2s ease-in-out infinite',
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                  
                  {/* Description skeleton */}
                  <Div
                    h="1rem"
                    bg={getSkeletonColor()}
                    rounded="md"
                    w="90%"
                    m={{ b: "0.5rem" }}
                    style={{
                      animation: 'pulse 2s ease-in-out infinite',
                      animationDelay: `${i * 0.2 + 0.1}s`,
                    }}
                  />
                  <Div
                    h="1rem"
                    bg={getSkeletonColor()}
                    rounded="md"
                    w="70%"
                    m={{ b: "1rem" }}
                    style={{
                      animation: 'pulse 2s ease-in-out infinite',
                      animationDelay: `${i * 0.2 + 0.2}s`,
                    }}
                  />
                  
                  {/* Tags skeleton */}
                  <Div d="flex" gap="0.5rem" flexWrap="wrap">
                    <Div
                      h="1.5rem"
                      bg={getSkeletonColor()}
                      rounded="full"
                      w="4rem"
                      style={{
                        animation: 'pulse 2s ease-in-out infinite',
                        animationDelay: `${i * 0.2 + 0.3}s`,
                      }}
                    />
                    <Div
                      h="1.5rem"
                      bg={getSkeletonColor()}
                      rounded="full"
                      w="6rem"
                      style={{
                        animation: 'pulse 2s ease-in-out infinite',
                        animationDelay: `${i * 0.2 + 0.4}s`,
                      }}
                    />
                    <Div
                      h="1.5rem"
                      bg={getSkeletonColor()}
                      rounded="full"
                      w="8rem"
                      style={{
                        animation: 'pulse 2s ease-in-out infinite',
                        animationDelay: `${i * 0.2 + 0.5}s`,
                      }}
                    />
                  </Div>
                </Div>
                
                {/* Star count skeleton */}
                <Div
                  h="1.5rem"
                  bg={getSkeletonColor()}
                  rounded="md"
                  w="4rem"
                  style={{
                    animation: 'pulse 2s ease-in-out infinite',
                    animationDelay: `${i * 0.2 + 0.6}s`,
                  }}
                />
              </Div>
            </Div>
          ))}
        </Div>

        <style jsx>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 0.6;
            }
            50% {
              opacity: 1;
            }
          }
          
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </article>
    );
  }

  return (
    <article>
      <Para color={themeUse.secondary}>{desc.desc}</Para>
      <Div m={{ b: "1.7em" }} />
      <hr className={"hr" + theme} />
      <Search
        title="Tìm kiếm repository Github"
        subtitle="Các pet project/public repository sử dụng Node.js, React..."
        placeholder="Tìm kiếm repository..."
        theme={theme}
        themeUse={themeUse}
        postName="repo"
      />
      <Div>
        {prj.length === 0 ? (
          <Para color={themeUse.secondary}>Chưa có project nào ở đây.</Para>
        ) : (
          prj.map((item) => (
           <ProjectRow
            key={item.id}
            item={item}
            theme={theme}
            themeUse={themeUse}
           />
          ))
        )}
      </Div>

      <a target="_blank" rel="noreferrer" href="https://github.com/yunkhngn">
        <Div
          m={{ t: "1em" }}
          textColor={themeUse.secondary}
          hoverTextColor={themeUse.hover}
          transition
        >
          Xem Github của tớ...
        </Div>
      </a>
    </article>
  );
};

export default Project;
