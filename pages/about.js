import {Template, Title} from '../components/Template/'
import {About} from '../components/Post/'
import {desc} from '../lib'
import ElementSpace from '../components/Post/ElementSpace'
const about = ({themeUse,theme}) => {
    const content = {
        Description: "Hi, I’m Khoa Nguyễn. I’m currently a college student at FPT University, where I’m honing my skills in software engineering. I have a deep interest in building dynamic applications using Reactjs and Nodejs, and I thrive on creating innovative designs.",
        Content: "My studies and projects have provided me with a strong foundation in both front-end and back-end technologies, allowing me to gain a well-rounded understanding of the full stack of software development. I have developed skills in building dynamic and responsive user interfaces with modern frameworks like React.js, as well as working with server-side technologies such as Node.js to create robust and scalable applications. I am passionate about staying up-to-date with the latest advancements in the tech industry and constantly seek out opportunities to learn new tools, programming languages, and best practices. My enthusiasm for software development drives me to continuously experiment, build, and refine my skills, ensuring that I remain adaptable and prepared for the ever-evolving landscape of technology."
      }
    return (
        <Template description={desc.about} height="100%">
            <Title color={themeUse.primary}>About me</Title>
            <About content={content} themeUse={themeUse} theme={theme}/>
            <ElementSpace/>
            &nbsp;
        </Template>
    );
}

export default about;