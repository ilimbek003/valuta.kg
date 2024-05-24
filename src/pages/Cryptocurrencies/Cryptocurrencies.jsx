import React, { useEffect, useState } from "react";
import "./Cryptocurrencies.css";
import image1 from "../../img/logo_c1.svg";
import image2 from "../../img/logo_c2.svg";
import image3 from "../../img/logo_c3.svg";
import image4 from "../../img/logo_c4.svg";
import image5 from "../../img/logo_c5.svg";
import image6 from "../../img/logo_c6.svg";
import { useNavigate } from "react-router-dom";
import { api } from "../../Api";

const data = [
  {
    img: image1,
    text: "Bitcoin BTC",
  },
  {
    img: image2,
    text: "Bitcoin BTC",
  },
  {
    img: image3,
    text: "Bitcoin BTC",
  },
  {
    img: image4,
    text: "Bitcoin BTC",
  },
  {
    img: image5,
    text: "Bitcoin BTC",
  },
  {
    img: image6,
    text: "Bitcoin BTC",
  },
  {
    img: image1,
    text: "Bitcoin BTC",
  },
  {
    img: image2,
    text: "Bitcoin BTC",
  },
  {
    img: image3,
    text: "Bitcoin BTC",
  },
  {
    img: image4,
    text: "Bitcoin BTC",
  },
  {
    img: image5,
    text: "Bitcoin BTC",
  },
  {
    img: image6,
    text: "Bitcoin BTC",
  },
  {
    img: image1,
    text: "Bitcoin BTC",
  },
  {
    img: image2,
    text: "Bitcoin BTC",
  },
  {
    img: image3,
    text: "Bitcoin BTC",
  },
  {
    img: image4,
    text: "Bitcoin BTC",
  },
  {
    img: image5,
    text: "Bitcoin BTC",
  },
  {
    img: image6,
    text: "Bitcoin BTC",
  },
];

const Cryptocurrencies = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    api.get("/api/crypto").then((response) => setData(response.data));
  }, []);
  return (
    <div className="cryptocurrencies">
      <div className="container">
        <div>
          <h1 className="title_h1">Криптовалюты</h1>
        </div>
        <div className="cryptocurrencies_block">
          {data.map((el, index) => (
            <div
              onClick={() => navigate(`/page-coin/${el.slug}`)}
              className="cryptocurrencies_box"
            >
              <img src={el.img} alt="" />
              <p className="text">{el.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cryptocurrencies;
