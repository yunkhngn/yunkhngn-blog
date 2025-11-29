const contentful = require("contentful");
import { Div } from 'atomize';
import ReactMarkdown from "react-markdown";
import { Title, Para, Template, Spacer, Footer, Back, SocialShare } from "../../components/Template";
import { ImageModal } from "../../components/Content";

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const PhotoDisplay = ({ data, themeUse, theme }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day} tháng ${month} năm ${year}.`;
  };

  const desc = {
    title: data.title + " - Ảnh chụp",
    desc: data.description,
    url: `https://yunkhngn.dev/photo/${data.slug}`,
    img: `https:${data.images[0].fields.file.url}`,
    route: "/photo/" + data.slug,
  };

  const images = data.images.map((img) => ({
    id: img.sys.id,
    url: img.fields.file.url,
    title: img.fields.title || "",
  }));
  
  return (
    <Template description={desc} height="100%">
      <article>
        <Title color={themeUse.primary}>{data.title}</Title>
        <Para align="left" color={themeUse.secondary}>
          {"Hà Nội, ngày " + formatDate(data.createdAt)}
        </Para>
        <SocialShare url={desc.url} theme={theme}/>
        <Spacer theme={theme} length="10em" />
        <Div className="richText">
          <ReactMarkdown>{data.description}</ReactMarkdown>
        </Div>
        <Div m={{ b: "1.7em" }} />
        <hr className={"hr" + theme} />
        <Div m={{ b: "1.7em" }} />
       <div>
        {images.map((img) => (
            <div key={img.id}>
            <ImageModal key={img.id} id={img.id} theme={theme} themeUse={themeUse} url={img.url} />
            </div>
        ))}
        </div>
        <Div m={{ b: "1.7em" }} />
        <hr className={"hr" + theme} />
        <Footer content="Ảnh chụp qua lăng kính của tớ." />
        <Back themeUse={themeUse} />
      </article>
    </Template>
  );
};

export async function getServerSideProps({ params, res }) {
  try {
    if (res && res.setHeader) {
         res.setHeader('Cache-Control', 'no-store');
    }

    const response = await client.getEntries({
      content_type: "picture",
      'fields.slug': params.slug,
      limit: 1,
      include: 1, // resolve linked assets for images
      select: 'fields.title,fields.description,fields.images,fields.slug,sys.createdAt',
    });

    if (response.items.length > 0) {
      const item = response.items[0];
      const transformedData = {
        id: item.sys.id,
        title: item.fields.title,
        description: item.fields.description || '',
        images: item.fields.images || [],
        createdAt: item.sys.createdAt,
        slug: item.fields.slug,
      };
      return { props: { data: transformedData } };
    } else {
      return { notFound: true };
    }
  } catch (error) {
    console.error("SSR fetch error (photo/[slug]):", error);
    return { notFound: true };
  }
}

export default PhotoDisplay;
