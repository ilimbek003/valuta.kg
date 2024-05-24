import React, { useState } from "react";
import logo1 from "../../img/logo1.svg";
import logo2 from "../../img/logo2.svg";
import logo3 from "../../img/logo3.svg";
import logo4 from "../../img/logo4.svg";
import logo5 from "../../img/logo5.svg";
import logo6 from "../../img/logo6.svg";
const datas = [
  {
    img: logo1,
    name: "Bitcoin BTC",
    number: 66115.18,
    date: "12:30/12.03.24",
  },
  {
    img: logo2,
    name: "Etherium ETH",
    number: 3775.5,
    date: "12:30/12.03.24",
  },
  {
    img: logo3,
    name: "Solana SOL",
    number: 139.26,
    date: "12:30/12.03.24",
  },
  {
    img: logo4,
    name: "Tether USDT",
    number: 1,
    date: "12:30/12.03.24",
  },
  {
    img: logo5,
    name: "Binance BNB",
    number: 428.62,
    date: "12:30/12.03.24",
  },
  {
    img: logo6,
    name: "Ripple ZRP",
    number: 139.26,
    date: "12:30/12.03.24",
  },
];
const SetCourses = ({ currency }) => {
  return (
    <div className="detail_block">
      <p className="block_title">Установленные курсы</p>
      <div className="detail_box">
        <div></div>
        <p className="name">покупка</p>
        <p className="name">продажа</p>
        <p className="name">время</p>
      </div>
      {currency?.set_rates?.map((el) => (
        <div className="detail_box">
          <div className="items">
            <img src={el.logo} alt="" />
            <p className="btc">{el.name}</p>
          </div>
          <p className="big_text">{el.buy}</p>
          <p className="big_text">{el.sell}</p>
          <p className="date">{el.deadline}</p>
        </div>
      ))}
    </div>
  );
};

export default SetCourses;
