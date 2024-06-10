import React, { useEffect, useState } from "react";
import "./PageCoin.css";
import { useParams } from "react-router-dom";

import { api } from "../../Api";
import Prediction from "./Prediction";
import Charts from "./Charts";
import News from "./News";
import Questions from "./Questions";
import Information from "./Information";
import Сrypto from "./Сrypto";

const PageCoin = ({ data }) => {
  const { slug } = useParams();
  const [view, setView] = useState(true);
  const [news, setNews] = useState(false);
  const [isChartsLoaded, setChartsLoaded] = useState(false);
  const [open, setOpen] = useState([]);
  const [open2, setOpen2] = useState("24_hours");

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setChartsLoaded(true);
    };
    fetchData();
  }, []);

  const handleCharts = () => {
    api.get(`/ticker/${slug}/${open2}`).then((response) => {
      setOpen(response.data);
    });
  };

  useEffect(() => {
    handleCharts();
  }, []);
  useEffect(() => {
    if (open) {
      document.title = open.crypto?.name;

      const setMetaTag = (name, content) => {
        let metaTag = document.querySelector(`meta[name="${name}"]`);
        if (!metaTag) {
          metaTag = document.createElement("meta");
          metaTag.name = name;
          document.head.appendChild(metaTag);
        }
        metaTag.content = content;
      };
     
      setMetaTag("og:title", open.crypto?.name);
      setMetaTag("og:image", open.crypto?.img);
      setMetaTag("title", open.crypto?.name);
      const questionDetail =
        open.question &&
        open.question[0] &&
        open.question[0].detail &&
        open.question[0].detail[0];
      setMetaTag("og:description", questionDetail ? questionDetail.answer : "");
      setMetaTag(
        "keywords",
        questionDetail && questionDetail.question
          ? questionDetail.question.replaceAll(" ", ", ")
          : ""
      );
    }
  }, [open]);

  return (
    <div className="page_coin">
      <div className="container">
        <div className="coin_block">
          <div className="one">
            <Сrypto open={open} />
            <div className="coin_box coin-box">
              <Information open={open} />
            </div>
            <Prediction slug={slug} open={open} handleCharts={handleCharts} />
          </div>
          <div className="two">
            <div className="coin_box ">
              <Charts
                isChartsLoaded={isChartsLoaded}
                open={open}
                setView={setView}
                setNews={setNews}
                news={news}
                view={view}
                setOpen2={setOpen2}
                handleCharts={handleCharts}
              />
            </div>
            <div className="coin_box coin-box">
              <Questions open={open} />
            </div>
          </div>
        </div>
        <div className="news">
          <News data={data} />
        </div>
      </div>
    </div>
  );
};

export default PageCoin;
