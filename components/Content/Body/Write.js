import { Para, ElementSpace, Search, RowContent } from "../../Template";
import { Div } from "atomize";
import Link from "next/link";

const Write = ({ desc, theme, themeUse, content }) => {
  return (
    <article>
      <Para color={themeUse.secondary}>{desc.desc}</Para>
      <Div m={{ b: "1.7em" }} />
      <hr className={"hr" + theme} />
      <Search
        title="Tìm kiếm các bài viết của tớ"
        subtitle="Viết linh tinh về cuộc sống, lập trình, nghệ thuật,..."
        placeholder="Tìm kiếm post..."
        theme={theme}
        themeUse={themeUse}
        postName="post"
      />
      <Div>
        {content.length === 0 ? (
          <Para color={themeUse.secondary}>Chưa có post nào ở đây.</Para>
        ) : (
          content.map((item) => (
            <div className="post" key={item.id}>
              <Link href={`/writing/${item.attributes.Slug}`} passHref>
                <RowContent
                  title={item.attributes.Title}
                  theme={theme}
                  themeUse={themeUse}
                  description={item.attributes.Description}
                  date={item.attributes.createdAt}
                />
              </Link>
            </div>
          ))
        )}
      </Div>
      <ElementSpace space="12em" />
    </article>
  );
};

export default Write;
