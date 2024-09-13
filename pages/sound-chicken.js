import React from "react";
import { Template, Title } from "../components/Template";
import { Saoke } from "../components/Post";

const desc = {
  title: "Sao kê | Khoa Nguyễn",
  heading: "Sao kê",
  url: "https://khoanguyen.codes/sounc-chicken",
  desc: "Sao kê số tiền ủng hộ mttq.",
  img: "https://khoanguyen.codes/image/wall.png",
};

const soundChicken = ({ themeUse, theme, data }) => {
  return (
    <Template description={desc} height="100%">
      <Title color={themeUse.primary}>{desc.heading}</Title>
      <Saoke data={data} desc={desc} themeUse={themeUse} theme={theme} />
    </Template>
  );
};

//api https://soundke.vercel.app/api/transactions
export async function getStaticProps() {
    const res = await fetch("https://soundke.vercel.app/api/transactions");
    const data = await res.json();
    //remove " " from data
    data.map((item) => {
        item.date = item.date.replace(/"/g, "");
        item.trans_no = item.trans_no.replace(/"/g, "");
        item.credit = item.credit.replace(/"/g, "");
        item.detail = item.detail.replace(/"/g, "");
    }
    );
    // only take date from 01/09/2024_5215.97152
    data.map((item) => {
        item.date = item.date.split("_")[0];
    }
    );
    
    return {
        props: {
        data,
        },
    };
    }

export default soundChicken;
