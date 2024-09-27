import React, { useRef, useState, useEffect } from "react";
import { Div, Text, Icon } from "atomize";
import Image from "next/image";

const MusicPlayer = ({ theme }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", updateTime);

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, []);
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (event) => {
    const newTime = event.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  return (
    <Div
      d="flex"
      //transparent background about 0.7
      border="1px solid"
      borderColor={theme === "light" ? "gray300" : "hsl(0 0% 100% / 0.077)"}
      //blur
      p={{ xs: "1em", md: "2em" }}
      rounded="30px"
      m={{ y: "2em" }}
      transition
    >
      <div className="music--cover">
        <Image
          src="/ngot.jpeg"
          alt="Spotify"
          fill
          style={{ 
            borderRadius: "16px", 
            objectFit: "cover",
            filter: `brightness(${theme === "light" ? "1" : "0.9"})`,
        }}
        />
      </div>
      <Div 
      w="50%" 
      m={{l:{xs:"1em", md:"2em"}}}
      d="flex"
      flexDir="column"
      justify="center"
      >
        <div>
            <Text
            textSize={{ xs: "body", md: "paragraph" }}
            >iPhone</Text>
            <Text
            textColor={theme === "light" ? "black" : "white"}
            textSize={{ xs: "subheader", md: "title" }}
            textWeight="700"
            >
            Ánh đèn phố
            </Text>
            <audio ref={audioRef} src="/catxet.mp3" preload="metadata"></audio>
            <Text
            textColor={theme === "light" ? "black" : "white"}
            textSize={{ xs: "paragraph", md: "subheader" }}
            m={{ b: {xs:"0.5em",md:"1em"} }}
            >
            The Cassette
            </Text>
        </div>
        <div>
            <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            step="1"
            onChange={handleSliderChange}
            className={"music--slider slider--"+ theme}
            />
            <Div
            d="flex"
            justify="space-between"
            >
                <Text
                textSize={{ xs: "caption", md: "subheader" }}
                >{formatTime(currentTime)}</Text>
                <Text
                textSize={{ xs: "caption", md: "subheader" }}
                >{formatTime(duration)}</Text>
            </Div>
        </div>
        <Div
        d="flex"
        justify="center"
        >
          <Icon 
          name="PlayPrev" 
          size={{xs:"30px", md:"40px"}} 
          color={theme === "light" ? "gray500" : "gray900"}
          m={{y:"auto"}}
          />
          <Icon
            name={isPlaying ? "Pause" : "Play"}
            onClick={handlePlayPause}
            size={{xs:"40px", md:"50px"}}
            color={theme === "light" ? "black500" : "white"}
            cursor="pointer"
          />
          <Icon 
          name="PlayNext" 
          size={{xs:"30px", md:"40px"}} 
          m={{y:"auto"}}
          color={theme === "light" ? "gray500" : "gray900"}
          />
        </Div>
      </Div>
    </Div>
  );
};

export default MusicPlayer;
