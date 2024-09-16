import { Para, ElementSpace, RowContent, Back} from "../../Template";
import { Div } from "atomize";

const ChangeLog = ({ theme, themeUse, desc, log }) => {
  return (
    <article>
      <Para color={themeUse.secondary}>{desc.desc}</Para>
      <Div m={{ b: "1.7em" }} />
      <hr className={"hr" + theme} />
      <Div>
        {log.length === 0 ? (
          <Para color={themeUse.secondary}>Chưa có change log nào ở đây.</Para>
        ) : (
          log.map((item) => (
            <div className="post" key={item.id}>
              <RowContent
                title={item.author}
                description={item.message}
                date={item.date}
                theme={theme}
                themeUse={themeUse}
              />
            </div>
          ))
        )}
      </Div>
      <Back themeUse={themeUse} route="/" />
      <ElementSpace space="12em" />
    </article>
  );
};

export default ChangeLog;
