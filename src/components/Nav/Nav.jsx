import React, { useEffect, useState } from "react";
import "./Nav.css";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { api } from "../../Api";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";

const Nav = ({ publis }) => {
  const [data, setData] = useState([]);
  const [best, setBest] = useState(true);
  const [bestCorse, setBestCorse] = useState(false);
  const [course, setCourse] = useState(false);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    api.get("/ticker/").then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <div className="nav">
      <div className="container">
        <Slider {...settings}>
          {publis?.map((el, id) => (
            <a href={el.link} target="_blank" key={id} className="slider_box">
              <img className="banner" src={el.publicity} alt="" />
            </a>
          ))}
        </Slider>
        <div className="nav_main">
          <div className="nav_box">
            <table>
              <thead>
                <tr style={{ borderBottom: "none" }}>
                  <th style={{ padding: "0 0 0 105px" }} className="none-bay">
                    &nbsp;
                  </th>
                  <th>
                    <div className="th-title-flex">
                      <div className="th-title-flex-git">
                        <p className="medium-course">Средний курс</p>
                      </div>
                      <div className="th-bay-sell">
                        <p>покупка</p>
                        <p>продажа</p>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="th-title-flex">
                      <div className="th-title-flex-git">
                        <p className="medium-course">Лучший курс</p>
                        <p className="by-participants">по участникам</p>
                      </div>
                      <div className="th-bay-sell">
                        <p>покупка</p>
                        <p>продажа</p>
                      </div>
                    </div>
                  </th>
                  <th className="th_bay">
                    <div>
                      <div className="th-title-flex-git last-right">
                        <p className="medium-course">Курс Binance</p>
                        <p className="by-participants">все курсы</p>
                      </div>
                      <p className="none-bay">продажа</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.slice(0, 6).map((el, index) => (
                    <tr
                      style={
                        index === 5
                          ? { borderBottom: "none", paddingBottom: "0" }
                          : {}
                      }
                    >
                      <td className={index === 5 ? "nomed" : ""}>
                        <span className="first">
                          <img src={el.img} alt="" />
                          <p className="name">{el.symbol}</p>
                        </span>
                      </td>
                      <td className={index === 5 ? "nomed" : "borders"}>
                        <NavLink to={`/page-coin/${el.slug}`}>
                          <div>
                            <p className="number">
                              {typeof el.average.buy === "string" ||
                              typeof el.average.buy === "number"
                                ? el.average.buy.toString().slice(0, 8)
                                : ""}
                            </p>
                            <p className="number ">
                              {typeof el.average.sell === "string" ||
                              typeof el.average.sell === "number"
                                ? el.average.buy.toString().slice(0, 8)
                                : ""}
                            </p>
                          </div>
                        </NavLink>
                      </td>
                      <td className={index === 5 ? "nomed" : "borders"}>
                        <NavLink to={`/page-coin/${el.slug}`}>
                          <div>
                            <p className="number blue">
                              {typeof el.average.buy === "string" ||
                              typeof el.average.buy === "number"
                                ? el.average.buy.toString().slice(0, 8)
                                : ""}
                            </p>
                            <p className="number blue ">
                              {typeof el.average.sell === "string" ||
                              typeof el.average.sell === "number"
                                ? el.average.buy.toString().slice(0, 8)
                                : ""}
                            </p>
                          </div>
                        </NavLink>
                      </td>
                      <td
                        className={index === 5 ? "nomed" : "borders none-bay"}
                        style={
                          index === 5
                            ? { padding: "20px 0 0 0" }
                            : { padding: "0" }
                        }
                      >
                        <span className="last_s none-bay">
                          <p className="number">{el.binance.sell}</p>
                          {el.binance.difference >= 0 ? (
                            <TiArrowSortedUp color="green" size={26} />
                          ) : (
                            <TiArrowSortedDown color="red" size={26} />
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="rec">
            {publis &&
              publis?.slice(0, 1).map((el, id) => (
                <a
                  href={el.link}
                  target="_blank"
                  key={id}
                  className="slider_box"
                >
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
