import React, { useEffect, useState } from "react";
import "./Table.css";
import logo1 from "../../img/logo1.svg";
import logo2 from "../../img/logo2.svg";
import logo3 from "../../img/logo3.svg";
import star1 from "../../img/Component1.svg";
import star2 from "../../img/Component2.svg";
import phone from "../../img/phone.svg";
import map from "../../img/maping.svg";
import arrow from "../../img/icon_arrow.svg";
import { api } from "../../Api";
import { Alert } from "../UI/alert/alert";
import { useNavigate } from "react-router-dom";
import Tables from "./Tables";

const Table = ({ title }) => {
  const navigate = useNavigate();
  const [bankData, setBankData] = useState([]);
  const [storedExchanges, setStoredExchanges] = useState([]);
  useEffect(() => {
    api.get("/exchanger/currency-list/").then((response) => {
      setBankData(response.data.exchanger);
    });
  }, []);

  const isTokenAvailable = () => {
    const token = localStorage.getItem("token");
    return token !== null && token !== undefined;
  };
  const handleExchangeClick = (el) => {
    if (isTokenAvailable()) {
      let exchanges = JSON.parse(localStorage.getItem("exchange")) || [];
      if (exchanges.some((exchange) => exchange.id === el.id)) {
        exchanges = exchanges.filter((exchange) => exchange.id !== el.id);
        Alert("info", "Элемент удален");
      } else {
        exchanges.push(el);
        Alert("success", "Ваш выбор сохранен");
      }
      localStorage.setItem("exchange", JSON.stringify(exchanges));
      setStoredExchanges(exchanges);
    } else {
      navigate("/login");
    }
  };
  return (
    <div style={title && { margin: 0 }} className="table">
      <div className="container">
        <div>
          {title ? (
            ""
          ) : (
            <div>
              <h2 className="title_h1">
                Курсы криптовалюты на сегодня в Бишкеке
              </h2>
              <p className="text_p">
                Курсы криптовалюты обновляются {" "}
                <a href="/" className="link">
                  обменными пунктами
                </a>
                . коммерческие банки Кыргызстана обновляют курс
                криптовалюты каждые 5 минут
              </p>
            </div>
          )}
          <div className="max-media">
            <div className="head_grid">
              <div className="width_col">
                <p className="gray"># Название</p>
              </div>
              <div className="box">
                <div className="flex">
                  <img src={logo1} alt="" />
                  <p className="title">BTC</p>
                </div>
                <div className="grid_col">
                  <p className="gray">покупка</p>
                  <p className="gray">продажа</p>
                </div>
              </div>
              <div className="box">
                <div className="flex">
                  <img src={logo2} alt="" />
                  <p className="title">ETH</p>
                </div>
                <div className="grid_col">
                  <p className="gray">покупка</p>
                  <p className="gray">продажа</p>
                </div>
              </div>
              <div className="box">
                <div className="flex">
                  <img src={logo3} alt="" />
                  <p className="title">SOL</p>
                </div>
                <div className="grid_col">
                  <p className="gray">покупка</p>
                  <p className="gray">продажа</p>
                </div>
              </div>
              <div className="col">
                <img className="arrow" src={arrow} alt="" />
                <div>
                  <p className="gray">время</p>
                </div>
              </div>
            </div>
            <div className="blocks">
              {bankData?.map((el, id) => (
                <div key={id} className="grid">
                  <div className="save">
                    <img
                      onClick={() => handleExchangeClick(el)}
                      className="star"
                      src={
                        storedExchanges.some(
                          (exchange) => exchange.id === el.id
                        )
                          ? star2
                          : star1
                      }
                      alt="starred"
                    />
                    <div className="carob">
                      <img className="logos" src={el.logo} alt="" />
                      <div className="gray_texts_flex">
                        <div className="gray_texts">
                          <p
                            className="title"
                            onClick={() =>
                              localStorage.getItem("token") ? navigate(`/exchange-detail/${el.slug}`) : navigate("/login")
                            }
                          >
                            {el.exchanger}
                          </p>
                          <div className="gray_texts_flex_one">
                            <img className="icon" src={phone} alt="" />
                            <p className="gray">{el.phone}</p>
                          </div>
                        </div>
                        <div
                          className="gray_texts_flex_one"
                          style={{ width: " 60%" }}
                        >
                          <img className="icon" src={map} alt="" />
                          <p className="gray">{el.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {el.Bitcoin ? (
                    <div className="grid_flex">
                      <div>
                        <p className="chet">${el.Bitcoin?.buy}</p>
                      </div>
                      <div>
                        <p className="chet">${el.Bitcoin?.sell}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div></div>
                      <div></div>
                    </div>
                  )}
                  {el.Ethereum ? (
                    <div className="grid_flex">
                      <div>
                        <p className="chet">${el.Ethereum?.buy}</p>
                      </div>
                      <div>
                        <p className="chet" style={{ margin: "0 0 0 20px" }}>
                          ${el.Ethereum?.sell}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div></div>
                      <div></div>
                    </div>
                  )}
                  {el.Solana ? (
                    <div className="grid_flex">
                      <div>
                        <p className="chet">${el.Bitcoin?.buy}</p>
                      </div>
                      <div>
                        <p className="chet">${el.Bitcoin?.sell}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div></div>
                      <div></div>
                    </div>
                  )}
                  <div className="time_el">
                    <p className="time">{el.deadline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="min-media">
          <Tables
            bankData={bankData}
            handleExchangeClick={handleExchangeClick}
            storedExchanges={storedExchanges}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
