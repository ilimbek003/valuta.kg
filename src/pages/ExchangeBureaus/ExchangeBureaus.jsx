import React, { useEffect, useState } from "react";
import "./ExchangeBureaus.css";
import map from "../../img/map.svg";
import number from "../../img/map.svg";
import search from "../../img/Search.svg";
import { useNavigate } from "react-router-dom";
import { api } from "../../Api";
import DG from "2gis-maps";

const ExchangeBureaus = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [geo, setGeo] = useState([]);

  useEffect(() => {
    api.get("/exchanger/currency/geo/").then((res) => {
      setGeo(res.data);
    });
  }, []);

  useEffect(() => {
    let mapInstance = DG.map("map", {
      center: [42.88, 74.59],
      zoom: 10,
    });
    let marker = geo.map((el) => {
      if (el.lat && el.lon) {
        return new DG.Marker([el.lat, el.lon]).addTo(mapInstance);
      }
      console.log(el.lat, el.lon);
    });
    return () => {
      mapInstance.remove();
    };
  });
 
  return (
    <div className="exchange_bureaus">
      <div className="bureaus_block">
        <div className="relative">
          <img className="search" src={search} alt="" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Поиск обменных бюро"
          />
        </div>
        {geo
          .filter((obj) => {
            return (
              obj.name && obj.name.toLowerCase().includes(value.toLowerCase())
            );
          })
          .map((el) => (
            <div className="bureaus_box">
              <div className="image_logo_bureaus">
                <img src={el.logo} alt="" />
              </div>
              <div className="flex">
                <p
                  onClick={() => localStorage.getItem("token") ? navigate(`/exchange-detail/${el.slug}`) : navigate(`/login`)}
                  className="title"
                >
                  {el.name}
                </p>
                <div>
                  <p className="text">
                    <img className="icon" src={map} alt="" />
                    {el.address}
                  </p>
                  <p className="text">
                    <img className="icon" src={number} alt="" />
                    {el.phone}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="map-container">
        <div
          id="map"
          style={{ width: "100%", height: "100%" }}
          className="map"
        ></div>
      </div>
    </div>
  );
};

export default ExchangeBureaus;
