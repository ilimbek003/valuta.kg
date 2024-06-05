import React, { useEffect, useState } from "react";
import "./Cryptocurrencies.css";
import { useNavigate } from "react-router-dom";
import { api } from "../../Api";

const Cryptocurrencies = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    api.get("/crypto").then((response) => setData(response.data));
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
              key={index}
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
