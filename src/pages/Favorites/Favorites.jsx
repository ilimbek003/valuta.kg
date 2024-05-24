import React from "react";
import "./Favorites.css";
import "../../components/Table/Table.css";
import logo1 from "../../img/logo1.svg";
import logo2 from "../../img/logo2.svg";
import logo3 from "../../img/logo3.svg";
import arrow from "../../img/icon_arrow.svg";
import FavoritesStar from "./FavoritesStar";

const Favorites = () => {
  return (
    <div className="table favorites " style={{ margin: "30px 0 50px 0" }}>
      <div className="container">
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
    </div>
  );
};

export default Favorites;
