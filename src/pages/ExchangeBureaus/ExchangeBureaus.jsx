import React, { useEffect, useState } from "react";
import "./ExchangeBureaus.css";
import map from "../../img/map.svg";
import search from "../../img/Search.svg";
import { NavLink } from "react-router-dom";
import { api } from "../../Api";
import DG from "2gis-maps";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const ExchangeBureaus = () => {
  const [value, setValue] = useState("");
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
    <div className="exchange-bureaus-map">
      <div className="relative one">
        <img className="search" src={search} alt="" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Поиск обменных бюро"
        />
      </div>
      <div className="exchange_bureaus">
        <div className="bureaus_block">
          <div className="relative twos-er">
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
                  <NavLink to={`/exchange-detail/${el.slug}`}>
                    <p className="title">{el.name}</p>
                  </NavLink>
                  <div className="flex-icon-dec">
                    <div style={{width: "20px", height: "20px"}}>
                      <FaLocationDot size={20} color="#1856cd" />
                    </div>
                    <p className="text">{el.address}</p>
                  </div>
                  <p
                    className="text"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      margin:"0 0 0 3px",
                    }}
                  >
                    <FaPhoneAlt size={16} color="#1856cd" /> {el.phone}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="map-container">
          <div
            id="map"
            style={{ width: "100%", height: "100%" }}
            className="maps-container"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeBureaus;
