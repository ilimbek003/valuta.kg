import React, { useEffect, useState } from "react";
import "./Favorites.css";
import "../../components/Table/Table.css";
import star2 from "../../img/Component2.svg";
import logo1 from "../../img/logo1.svg";
import logo2 from "../../img/logo2.svg";
import logo3 from "../../img/logo3.svg";
import arrow from "../../img/icon_arrow.svg";
import FavoritesStar from "./FavoritesStar";
import { useNavigate } from "react-router-dom";
import phone from "../../img/phone.svg";
import map from "../../img/maping.svg";

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("exchange")) || [];
    setFavorites(storedFavorites);
  }, []);

  const exchange = JSON.parse(localStorage.getItem("exchange")) || [];
  const handleDelete = (id) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("exchange", JSON.stringify(updatedFavorites));
  };
  useEffect(() => {
    document.title = "Избранное ";
  }, []);
  return (
    <div className="table favorites " style={{ margin: "30px 0 50px 0" }}>
      <div className="container favorites-none">
        <h1 className="title_h1">Избранное</h1>
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
          <FavoritesStar />
        </div>
      </div>
      <div className="container favorites-block">
        <h1 className="title_h1">Избранное</h1>
        {exchange.map((el, index) => (
          <div className="grid gap-grid">
            <div className="save-one">
              <div className="carob lanes">
                <img className="logos" src={el.logo} alt="" />
                <div className="gray_texts_flex">
                  <div className="gray_texts">
                    <p
                      className="title"
                      onClick={() =>
                        localStorage.getItem("token")
                          ? navigate(`/exchange-detail/${el.slug}`)
                          : navigate("/login")
                      }
                    >
                      {el.exchanger}
                    </p>
                    <div className="gray_texts_flex_one">
                      <img className="icon" src={phone} alt="" />
                      <p className="gray">{el.phone}</p>
                    </div>
                  </div>
                  <div className="gray_texts_flex_one">
                    <img className="icon" src={map} alt="" />
                    <p className="gray">{el.address}</p>
                  </div>
                </div>
              </div>
              <div className="grid_flex-img">
                <div className="time_el">
                  <p className="time">{el.deadline}</p>
                </div>
                <img
                  onClick={() => handleDelete(el.id)}
                  className="star"
                  src={star2}
                  alt="starred"
                />
              </div>
            </div>
            {el.Bitcoin ? (
              <div className="grid_flex grid-flex-twos">
                <div className="grid_flex grid-flex-all ">
                  <img src={el.Bitcoin?.img} alt="" />
                  <p>{el.Bitcoin?.code_name}</p>
                </div>
                <div className="grid_flex buy-gap">
                  <div>
                    <p className="buys">покупка</p>
                    <p className="chet">${el.Bitcoin?.buy}</p>
                  </div>
                  <div>
                    <p className="buys">продажа</p>
                    <p className="chet">${el.Bitcoin?.sell}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div></div>
                <div></div>
              </div>
            )}
            {el.Ethereum ? (
              <div className="grid_flex grid-flex-twos">
                <div
                  className="grid_flex grid-flex-all "
                  style={{ margin: "0 " }}
                >
                  <img src={el.Ethereum?.img} alt="" />
                  <p>{el.Ethereum?.code_name}</p>
                </div>
                <div className="grid_flex buy-gap">
                  <div>
                    <p className="chet">${el.Ethereum?.buy}</p>
                  </div>
                  <div>
                    <p className="chet">${el.Ethereum?.sell}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div></div>
                <div></div>
              </div>
            )}
            {el.Solana ? (
              <div className="grid_flex grid-flex-twos">
                <div
                  className="grid_flex grid-flex-all "
                  style={{ margin: "0 " }}
                >
                  <img src={el.Solana?.img} alt="" />
                  <p>{el.Solana?.code_name}</p>
                </div>
                <div className="grid_flex buy-gap">
                  <div>
                    <p className="chet">${el.Solana?.buy}</p>
                  </div>
                  <div>
                    <p className="chet">${el.Solana?.sell}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div></div>
                <div></div>
              </div>
            )}
            {el.Uniswap ? (
              <div className="grid_flex grid-flex-twos">
                <div
                  className="grid_flex grid-flex-all "
                  style={{ margin: "0 " }}
                >
                  <img src={el.Uniswap?.img} alt="" />
                  <p>{el.Uniswap?.code_name}</p>
                </div>
                <div className="grid_flex buy-gap">
                  <div>
                    <p className="chet">${el.Uniswap?.buy}</p>
                  </div>
                  <div>
                    <p className="chet">${el.Uniswap?.sell}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div></div>
                <div></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
