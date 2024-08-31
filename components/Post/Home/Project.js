import { Para } from '../../Template';
import { Div, Button } from 'atomize'; // Import Button từ Atomize
import ElementSpace from '../ElementSpace';
import { useEffect, useState } from 'react';

const Project = ({ theme, themeUse }) => {
  const [prj, setPrj] = useState([]);

  const fetchRepositories = async () => {
    try {
      const username = 'yunkhngn';
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const repositories = await response.json();

      if (!response.ok) {
        console.error('Error fetching repositories:', repositories.message);
        return;
      }

      // Lọc 5 repository mới nhất và nhiều sao nhất
      const filteredRepos = repositories
        .sort((a, b) => {
          if (a.stargazers_count === b.stargazers_count) {
            return new Date(b.created_at) - new Date(a.created_at); // Sắp xếp theo ngày tạo nếu số sao bằng nhau
          }
          return b.stargazers_count - a.stargazers_count; // Sắp xếp theo số sao giảm dần
        })
        .slice(0, 5); // Chỉ lấy 5 repository đầu tiên

      setPrj(filteredRepos);
    } catch (error) {
      console.error('Failed to fetch repositories:', error);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

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