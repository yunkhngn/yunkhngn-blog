import { useRouter } from "next/router";
const contentful = require("contentful");
import {ElementSpace} from '../../components/Post/';
import { Div } from 'atomize';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from "react-markdown";
import { Title, Para, Template } from "../../components/Template";
import {Spacer} from '../../components/Hooks';

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const PhotoDisplay = ({ data, themeUse, theme }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
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
    url: `https://khoanguyen.codes/photo/${data.slug}`,
    img: `https:${data.images[0].fields.file.url}`,
  };
  const images = data.images.map((img) => ({
    id: img.sys.id,
    url: img.fields.file.url,
    title: img.fields.title || "",
    description: img.fields.description || "",
  }));
  console.log(images);
  return (
    <Template description={desc} height="100%">
      <article>
        <Title color={themeUse.primary}>{data.title}</Title>
        <Para color={themeUse.secondary}>
          {"Hà Nội, ngày " + formatDate(data.createdAt)}
        </Para>
        <Spacer theme={theme} length="10em" />
        <ReactMarkdown>{data.description}</ReactMarkdown>
        <Div m={{ b: "1.7em" }} />
        <hr className={"hr" + theme} />
        <Div m={{ b: "1.7em" }} />
       <div>
        {images.map((img) => (
            <div className="photoPost" key={img.id}>
                <Image
                  fill={true}
                  src={"https:" + img.url}
                  alt="img"
                  sizes="100%"
                  priority={true}
                  style={{
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }
                }
                />
            </div>
        ))}
        </div>
        <Div m={{ b: "1.7em" }} />
        <hr className={"hr" + theme} />
        <p><i>Ảnh chụp bởi tớ</i></p>
        <p><strong>Khoa Nguyễn</strong></p>
        <p>&copy; 2024 Khoa Nguyễn. All rights reserved.</p>
        <Link href="/photo" passHref>
          <Div m={{ t: '1em' }} textColor={themeUse.secondary} hoverTextColor={themeUse.hover} transition>
            Quay lại...
          </Div>
        </Link>
        <ElementSpace space="12em" />
      </article>
    </Template>
  );
};

export async function getStaticPaths() {
  const response = await client.getEntries({ content_type: "picture" });
  const paths = response.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  try {
    const response = await client.getEntries({
      content_type: "picture",
      "fields.slug": params.slug,
    });
    if (response.items.length > 0) {
      const item = response.items[0];
      const transformedData = {
        id: item.sys.id,
        title: item.fields.title,
        description: item.fields.description,
        images: item.fields.images,
        createdAt: item.sys.createdAt,
        slug: item.fields.slug,
      };
      return {
        props: {
          data: transformedData,
        },
        revalidate: 60,
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    return { notFound: true };
  }
}

export default PhotoDisplay;
