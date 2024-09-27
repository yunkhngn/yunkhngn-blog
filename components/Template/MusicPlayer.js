import React from 'react'
import {Div, Text,Icon} from 'atomize'
import Image from 'next/image'

const MusicPlayer = ({theme}) => {
  return (
    <Div
    d="flex"
    //transparent background about 0.7
    border="1px solid"
    borderColor="gray300"
    //blur
    p="2em"
    rounded="30px"
    m={{ y: "2em" }}
    >
        <div className="music--cover">
            <Image
                src="/ngot.jpeg"
                alt="Spotify"
                fill
                style={{borderRadius: "16px", objectFit: "cover"}}
            />
        </div>
        <Div
        m={{ l: "2em" }}
        >
            <Text>iPhone</Text>
            <Text>Ngọt - Vũ.</Text>
            <Div>
            </Div>
            <Div>
            </Div>
            <Div>
                <Icon name="PlayPrev" size="20px" color={theme} />
                <Icon name="Play" size="20px" color={theme} />
                <Icon name="PlayNext" size="20px" color={theme} />
            </Div>
        </Div>
    </Div>
  )
}

export default MusicPlayer