import Head from 'next/head';

const StructuredData = ({ type, data }) => {
  const getStructuredData = () => {
    switch (type) {
      case 'person':
        return {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Khoa Nguyễn",
          "alternateName": "yun.khngn",
          "url": "https://yunkhngn.dev",
          "image": "https://yunkhngn.dev/image/thumbnail.jpg",
          "jobTitle": "Software Engineer",
          "worksFor": {
            "@type": "Organization",
            "name": "Freelancer"
          },
          "alumniOf": {
            "@type": "Organization",
            "name": "FPT University"
          },
          "knowsAbout": [
            "Software Engineering",
            "Web Development",
            "Graphic Design",
            "Guitar"
          ],
          "sameAs": [
            "https://github.com/yunkhngn",
            "https://linkedin.com/in/yunkhngn"
          ]
        };

      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Khoa Nguyễn - Portfolio",
          "url": "https://yunkhngn.dev",
          "description": "Portfolio của Khoa Nguyễn - Software Engineer, Graphic Designer và Guitarist",
          "author": {
            "@type": "Person",
            "name": "Khoa Nguyễn"
          },
          "publisher": {
            "@type": "Person",
            "name": "Khoa Nguyễn"
          }
        };

      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "image": data.image,
          "author": {
            "@type": "Person",
            "name": "Khoa Nguyễn"
          },
          "publisher": {
            "@type": "Person",
            "name": "Khoa Nguyễn"
          },
          "datePublished": data.publishedAt,
          "dateModified": data.updatedAt,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data.url
          }
        };

      case 'project':
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": data.name,
          "description": data.description,
          "url": data.url,
          "author": {
            "@type": "Person",
            "name": "Khoa Nguyễn"
          },
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web",
          "programmingLanguage": data.language
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
    </Head>
  );
};

export default StructuredData;
