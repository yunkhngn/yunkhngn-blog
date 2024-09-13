import { useEffect, useState } from "react";
import { Para } from "../../Template";
import { Input, Button, Div, Row, Col } from "atomize";
import React from "react";
import { Spacer } from "../../Hooks/";
import ElementSpace from "../ElementSpace";

const Saoke = ({ theme, themeUse, desc, data }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const performSearch = async (search) => {
    try {
      const response = await fetch('https://soundke.vercel.app/api/search/ha%20duong');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log(search);
  return (
    <article>
      <Para color={themeUse.secondary}>{desc.desc}</Para>
      <hr className={"hr" + theme} />
      <Para textSize="subheader" color={themeUse.primary}>
        Tìm kiếm sao kê từ api tớ build
      </Para>
      <Para color={themeUse.secondary} m={{ b: "1em" }}>
        Tìm kiếm theo tên người, hoặc kí tự bao gồm trong giao dịch.
      </Para>
      <Row>
        <Col size={{ xs: 8, md: 8 }}>
          <Input
            placeholder="Tìm kiếm sao kê..."
            m={{ t: "1em", b: "1.5em" }}
            w="100%"
            h="50px"
            onChange={(e) => setSearch(e.target.value)}
            textSize="subheader"
            textColor={themeUse.secondary}
            rounded="12px"
            focusBorderColor={theme === "light" ? "gray300" : "#171717"}
            border="1px solid"
            bg={theme === "light" ? "#f9f9f9" : "rgba(20,20,20)"}
            borderColor={theme === "light" ? "gray300" : "#171717"}
          />
        </Col>
        <Col size={{ xs: 4, md: 4 }}>
          <Button
            w="100%"
            h="50px"
            m={{ t: "1em", b: "1.5em" }}
            textColor={theme === "light" ? "#ededed" : "#171717"}
            bg={theme === "light" ? "#171717" : "#ededed"}
            hoverBg={theme === "light" ? "black700" : "gray500"}
            onClick={() => performSearch(search)}
          >
            Tìm kiếm
          </Button>
        </Col>
      </Row>
      <Spacer length="100%" theme={theme} />
      <Row textAlign="center">
        <Col size="2">
          <Para color={themeUse.primary} textSize="paragraph" m={{ b: "1em" }}>
            Date
          </Para>
        </Col>
        |
        <Col size="2">
          <Para color={themeUse.primary} textSize="paragraph" m={{ b: "1em" }}>
            Mã
          </Para>
        </Col>
        |
        <Col size="2">
          <Para color={themeUse.primary} textSize="paragraph" m={{ b: "1em" }}>
            Credit
          </Para>
        </Col>
        |
        <Col size="5">
          <Para color={themeUse.primary} textSize="paragraph" m={{ b: "1em" }}>
            Detail
          </Para>
        </Col>
      </Row>
      <Spacer length="100%" theme={theme} />
      {data.map((item) => (
        <div className="list" key={item.trans_no}>
          <Row textAlign="center">
            <Col size="2" key={item.trans_no}>
              <Para
                color={themeUse.primary}
                textSize="paragraph"
                m={{ b: "1em" }}
              ></Para>
            </Col>
            |
            <Col size="2">
              <Para
                color={themeUse.primary}
                textSize="paragraph"
                m={{ b: "1em" }}
              >
                {item.trans_no}
              </Para>
            </Col>
            |
            <Col size="2">
              <Para
                color={themeUse.primary}
                textSize="paragraph"
                m={{ b: "1em" }}
              >
                {item.credit}
              </Para>
            </Col>
            |
            <Col size="5">
              <Para
                color={themeUse.primary}
                textSize="paragraph"
                m={{ b: "1em" }}
              >
                {item.detail}
              </Para>
            </Col>
          </Row>
          <Spacer length="100%" theme={theme} />
        </div>
      ))}
      <ElementSpace space="12em" />
    </article>
  );
};

export default Saoke;
