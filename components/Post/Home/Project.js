import { Para } from '../../Template';
import { Div, Button } from 'atomize'; // Import Button từ Atomize
import ElementSpace from '../ElementSpace';

const Project = ({ theme, themeUse, prj }) => {

  const dateFormer = (date) => {
    let dateArr = date.split('T')[0].split('-');
    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
  };

  return (
    <article>
      <Para color={themeUse.secondary}>My latest incredible things built with React, Next.js,...from my Github.</Para>
      <Div m={{ b: '1.7em' }} />
      <hr className={'hr' + theme} />
      <Div>
        {prj.length === 0 ? (
          <Para color={themeUse.secondary}>No project posted yet.</Para>
        ) : (
          prj.map((item) => (
            <div key={item.id}>
              <a target="_blank" rel="noreferrer" href={item.html_url}>
                <Div
                  justify="flex-start"
                  align="center"
                  d="flex"
                  hoverBg={theme === 'light' ? 'gray200' : '#222222'}
                  rounded="12px"
                  p="16px"
                  transition
                  m={{ r: '-16px', l: '-16px' }}
                >

                  <Para margin="true" which="right" color={theme === 'light' ? '#171717' : '#ededed'}>
                    <strong>{item.name}</strong>
                  </Para>
                  <Para w={{xs: "170px", md: "350px"}} margin="true" which="right" color={theme === 'light' ? '#171717' : '#ededed'}>
                    {item.description || 'No description'}
                  </Para>
                  <hr className={'hr' + theme} />
                  <Para margin="true" which="left" color={themeUse.secondary}>
                    <strong>Stars:</strong> {item.stargazers_count}
                  </Para>
                </Div>
              </a>
            </div>
          ))
        )}
      </Div>

      <a target="_blank" rel="noreferrer" href="https://github.com/yunkhngn">
        <Div m={{ t: '1em' }} textColor={themeUse.secondary} hoverTextColor={themeUse.hover} transition>
          View all my projects...
        </Div>
      </a>
      <ElementSpace space="12em" />
    </article>
  );
};

export default Project;