import React, { useEffect, useState } from "react";
import "./PageCoin.css";
import { useParams } from "react-router-dom";

import { api } from "../../Api";
import Prediction from "./Prediction";
import { Alert } from "../../components/UI/alert/alert";
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
  console.log(open2);

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
