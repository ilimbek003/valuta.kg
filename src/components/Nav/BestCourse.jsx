import React, { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Nav from "./Nav";
import { NavLink } from "react-router-dom";

const BestCourse = ({ data }) => {
  const [best, setBest] = useState(true);
  const [bestCorse, setBestCorse] = useState(false);
  const [course, setCourse] = useState(false);
  return (
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
          <p className={course === true ? "best" : "title"}>Курс Binance</p>
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
        data?.slice(0, 6).map((el, id, index) => (
          <NavLink className="link-a" to={`page-coin/${el.slug}`} key={id}>
            <div className="nav_box_s">
              <div className="first ones">
                <div className="images-img">
                  <img src={el.img} alt="" />
                </div>
                <p className="name">{el.symbol}</p>
              </div>
              {best === true ? (
                <div className="buy-sell-one-tewos">
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
                </div>
              ) : (
                ""
              )}
              {bestCorse === true ? (
                <div className="buy-sell-one-tewos">
                  <div className={bestCorse === true ? "" : "last_bets ones"}>
                    <p className="number blue">{el.best_price.buy}</p>
                  </div>
                  <div className={bestCorse === true ? "" : "last_bets ones"}>
                    <p className="number blue">{el.best_price.sell}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
              {course === true ? (
                <div
                  className={index === 5 ? "" : "buy-sell-one-tewos"}
                  style={index === 5 ? { border: "none" } : {}}
                >
                  <div
                    className={
                      course === true
                        ? "display-flex-git-one"
                        : "last_bets ones"
                    }
                  >
                    <p className="number">{el.binance.sell}</p>
                    {el.binance.difference >= 0 ? (
                      <TiArrowSortedUp color="green" size={26} />
                    ) : (
                      <TiArrowSortedDown color="red" size={26} />
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </NavLink>
        ))}
    </div>
  );
};

export default BestCourse;
