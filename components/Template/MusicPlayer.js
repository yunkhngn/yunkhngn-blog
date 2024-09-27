import React, { useRef, useState, useEffect } from "react";
import { Div, Text, Icon } from "atomize";
import Image from "next/image";
import {song} from '../lib'

const MusicPlayer = ({ theme }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songIndex, setSongIndex] = useState(0);

  const handleChangeSong = (route) => {
    const audio = audioRef.current;
    audio.pause();
    setIsPlaying(false);
    if (route === "next") {
      if (songIndex === song.length - 1) {
        setSongIndex(0);
      } else {
        setSongIndex(songIndex + 1);
      }
    } else {
      if (songIndex === 0) {
        setSongIndex(song.length - 1);
      } else {
        setSongIndex(songIndex - 1);
      }
    }
  };
  
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
          src={song[songIndex].cover}
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
        m={{ l: { xs: "1em", md: "2em" } }}
        d="flex"
        flexDir="column"
        justify="space-between"
      >
        <div>
          <Text textSize={{ xs: "tiny", md: "paragraph" }}>iPhone</Text>
          <Text
            textColor={theme === "light" ? "black" : "white"}
            textSize={{ xs: "paragraph", md: "heading" }}
            textWeight="700"
          >
            {song[songIndex].title}
          </Text>
          <audio
            ref={audioRef}
            src={song[songIndex].musicSrc}
            preload="metadata"
          ></audio>
          <Text
            textColor={theme === "light" ? "black" : "white"}
            textSize={{ xs: "body", md: "title" }}
            m={{ b: { xs: "0.5em", md: "1em" } }}
          >
            {song[songIndex].artist}
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
            className={"music--slider slider--" + theme}
          />
          <Div d="flex" justify="space-between" m={{b:{md:"1em"}}}>
            <Text textSize={{ xs: "tiny", md: "subheader" }}>
              {formatTime(currentTime)}
            </Text>
            <Text textSize={{ xs: "tiny", md: "subheader" }}>
              {formatTime(duration)}
            </Text>
          </Div>
        </div>
        <Div 
        
        d="flex" 
        justify="center"
        m={{b:{md:"1em"}}}
        >
          <Icon
            name="PlayPrev"
            size={{ xs: "30px", md: "60px" }}
            color={theme === "light" ? "gray500" : "disabled"}
            m={{ y: "auto" }}
            onClick={() => handleChangeSong("prev")}
          />
          <Icon
            name={isPlaying ? "Pause" : "Play"}
            onClick={handlePlayPause}
            size={{ xs: "40px", md: "70px" }}
            color={theme === "light" ? "black500" : "white"}
            cursor="pointer"
          />
          <Icon
            name="PlayNext"
            size={{ xs: "30px", md: "60px" }}
            m={{ y: "auto" }}
            color={theme === "light" ? "gray500" : "disabled"}
            onClick={() => handleChangeSong("next")}
          />
        </Div>
      </Div>
    </Div>
  );
};

export default MusicPlayer;
