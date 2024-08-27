//this is the main page
import {Template, Title} from '../components/Template/'
import {Intro} from '../components/Post/'
import {useState, useEffect} from 'react'
import {desc} from '../lib'
import {Button, Div, Icon} from 'atomize'

export default function Home({theme, themeUse, counter}) {
  const content = {
    Description: "Hi, I'm Khoa Nguyễn",
    Content: "I am the one you looking for"
  }
  return (
    <Template description={desc.home} height="100%">
      <Title color={themeUse.primary}>Khoa Nguyễn</Title>
      <Intro content={content} themeUse={themeUse} theme={theme}/>
    </Template>
  )
}
