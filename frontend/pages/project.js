import {Template, Title} from '../components/Template'
import {Project} from '../components/Content/'
import {desc} from '../components/lib'

export default function ProjectPage({theme, themeUse, prj}) {
  return (
    <Template 
      description={{
        ...desc.projects,
        structuredDataType: 'website'
      }}
    >
      <Title color={themeUse.primary}>{desc.projects.heading}</Title>
      <Project desc={desc.projects} theme={theme} themeUse={themeUse} prj={prj}/>
    </Template>
  )
}

export async function getStaticProps() {
  try {
    const token = process.env.GITHUB_TOKEN; 
    
    if (!token) {
      console.warn('GitHub token not found, using fallback data');
      return {
        props: {
          prj: [],
        },
        revalidate: 3600,
      };
    }

    const response = await fetch('https://api.github.com/users/yunkhngn/repos', {
      headers: {
        'Authorization': `token ${token}`, 
        'Accept': 'application/vnd.github.v3+json' 
      }
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} ${response.statusText}`);
      return {
        props: {
          prj: [],
        },
        revalidate: 3600,
      };
    }

    const prj = await response.json();
    
    // Check if response is an array (success) or object (error)
    if (!Array.isArray(prj)) {
      console.error('GitHub API returned non-array response:', prj);
      return {
        props: {
          prj: [],
        },
        revalidate: 3600,
      };
    }
    
    const filteredRepos = prj
    .filter(repo => !repo.fork)
    .filter(repo => repo.name !== 'yunkhngn')
    .sort((a, b) => {
      if (a.updated_at === b.updated_at) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    })
    return {
      props: {
        prj: filteredRepos,
      },
      // Revalidate every 1 hour (3600 seconds)
      revalidate: 3600,
    };
  }
  catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return {
      props: {
        prj: [],
      },
      revalidate: 3600,
    };
  }
}