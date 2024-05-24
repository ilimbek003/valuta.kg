import React, { useEffect, useState } from "react";
import "./Nav.css";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { api } from "../../Api";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const Nav = ({ publis }) => {
  const [data, setData] = useState([]);
  const [best, setBest] = useState(true);
  const [bestCorse, setBestCorse] = useState(false);
  const [course, setCourse] = useState(false);
  const navigate = useNavigate();
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 5000,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };
  useEffect(() => {
    api
      .get("/api/ticker/")
      .then((response) => {
        setData(response.data);
      })
      .then((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="nav">
      <div className="container">
        <Slider {...settings}>
          {publis.map((el) => (
            <a href={el.link} className="slider_box">
              <img className="banner" src={el.publicity} alt="" />
            </a>
          ))}
        </Slider>
        <div className="nav_main">
          <div>
            <div className="nav_box">
              <div className="none_buy_sell"></div>
              <div
                className={best === true ? "best_line" : "last_one"}
                onClick={() =>
                  setBest(true) || setBestCorse(false) || setCourse(false)
                }
              >
                <p className={best === true ? "best" : "title"}>
                  Средний <span className="span">курс</span>
                </p>
              </div>
              <div
                className={bestCorse === true ? "best_line" : "last_one"}
                onClick={() =>
                  setBest(false) || setBestCorse(true) || setCourse(false)
                }
              >
                <p className={bestCorse === true ? "best" : "title"}>
                  Лучший <span className="span">курс</span>
                </p>
                <p className="text">по участникам</p>
              </div>
              <div
                className={course === true ? "best_line" : "last"}
                onClick={() =>
                  setBest(false) || setBestCorse(false) || setCourse(true)
                }
              >
                <p className={course === true ? "best" : "title"}>
                  Курс Binance
                </p>
                <a className="link" href="/" target="blank">
                  все курсы
                </a>
              </div>
            </div>
            <div className="buy_sell">
              <div></div>
              <div className={best === true ? "" : "last_bets_one"}>
                <p>покупка</p>
              </div>
              <div className={best === true ? "" : "last_bets_one"}>
                <p>продажа</p>
              </div>
              <div className={bestCorse === true ? "" : "last_bets"}>
                <p>покупка</p>
              </div>
              <div className={bestCorse === true ? "" : "last_bets"}>
                <p>продажа</p>
              </div>
              <div
                className={course === true ? "last" : "last_e"}
                style={{ margin: "0 auto" }}
              >
                <p>продажа</p>
              </div>
            </div>
            {data &&
              data?.slice(0, 6).map((el, id) => (
                <div
                  key={id}
                  className="nav_box_s"
                  onClick={() => navigate(`page-coin/${el.slug}`)}
                >
                  <div className="first ones">
                    <img src={el.img} alt="" />
                    <p className="name">{el.symbol}</p>
                  </div>
                  <div className={best === true ? "" : "last_bets_one"}>
                    <p className="number ones">
                      {typeof el.average.buy === "string" ||
                      typeof el.average.buy === "number"
                        ? el.average.buy.toString().slice(0, 8)
                        : ""}
                    </p>
                  </div>
                  <div className={best === true ? "" : "last_bets_one"}>
                    <p className="number ones ">
                      {typeof el.average.sell === "string" ||
                      typeof el.average.sell === "number"
                        ? el.average.sell.toString().slice(0, 8)
                        : ""}
                    </p>
                  </div>
                  <div className={bestCorse === true ? "" : "last_bets ones"}>
                    <p className="number blue">{el.best_price.buy}</p>
                  </div>
                  <div className={bestCorse === true ? "" : "last_bets ones"}>
                    <p className="number blue">{el.best_price.sell}</p>
                  </div>
                  <div className={course === true ? "last_s" : "last_e ones"}>
                    <p className="number">{el.binance.sell}</p>
                    {el.binance.difference >= 0 ? (
                      <TiArrowSortedUp color="green" size={26} />
                    ) : (
                      <TiArrowSortedDown color="red" size={26} />
                    )}
                  </div>
                </div>
              ))}
          </div>
          <div className="rec">
            {publis &&
              publis?.slice(0, 1).map((el) => (
                <a href={el.link} className="slider_box">
                  <img className="resize" src={el.publicity} alt="" />
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
