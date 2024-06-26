import React, { useEffect, useState } from "react";
import "./Cryptocurrencies.css";
import { NavLink } from "react-router-dom";
import { api } from "../../Api";

const Cryptocurrencies = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api.get("/crypto").then((response) => setData(response.data));
  }, []);
  useEffect(() => {
    document.title = "Криптовалюты";
  }, []);
  return (
    <div className="cryptocurrencies">
      <div className="container">
        <div>
          <h1 className="title_h1">Криптовалюты</h1>
        </div>
        <div className="cryptocurrencies_block">
          {data.map((el, index) => (
            <NavLink
              key={index}
              to={`/page-coin/${el.slug}`}
              className="cryptocurrencies_box"
            >
              <img src={el.img} alt="" />
              <p className="text">{el.name}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cryptocurrencies;
