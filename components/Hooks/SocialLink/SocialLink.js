import {Div} from 'atomize'
import SocialIcon from './SocialIcon';

const social = [
    {
      id: 4,
      name: "Facebook",
      icon: "Facebook",
      link: "https://www.facebook.com/yun.khngn",
    },
    {
      id: 5,
      name: "Instagram",
      icon: "Instagram",
      link: "https://instagram.com/yun.khngn",
    },
    {
      id: 6,
      name: "Github",
      icon: "Github",
      link: "https://github.com/yunkhngn",
    },
    {
      id: 7,
      name: "Behance",
      icon: "Behance",
      link: "https://www.behance.net/yunkhngn_",
    },
];

const SocialLink = () => {
    return (
      <footer>
        <Div m={{t:'1em'}}>
            {social.map(item => (
                <SocialIcon key={item.id} icon={item.icon} link={item.link} />
            ))}
        </Div>
      </footer>
    );
}

export default SocialLink;