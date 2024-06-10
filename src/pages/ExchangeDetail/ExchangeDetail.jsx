import React, { useEffect, useState } from "react";
import "./ExchangeDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import map from "../../img/map.svg";
import number from "../../img/number.svg";
import star from "../../img/component.svg";
import eye from "../../img/eyes.svg";

import { api } from "../../Api";
import Dynamics from "./Dynamics";
import SetCourses from "./SetCourses";
import ActiveAds from "./ActiveAds";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Iframe from "./Iframe";

const ExchangeDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    api.get(`/exchanger/currency/${slug}`).then((response) => {
      setCurrency(response.data);
    });
  }, []);
  useEffect(() => {
    if (currency) {
      document.title = currency.crypto?.license_num;

      const setMetaTag = (name, content) => {
        let metaTag = document.querySelector(`meta[name="${name}"]`);
        if (!metaTag) {
          metaTag = document.createElement("meta");
          metaTag.name = name;
          document.head.appendChild(metaTag);
        }
        metaTag.content = content;
      };

      setMetaTag("og:title", currency.crypto?.license_num);
      setMetaTag("og:image", currency.crypto?.logo);
      setMetaTag("title", currency.crypto?.license_num);
      setMetaTag("og:description", currency.crypto?.description);
      setMetaTag(
        "keywords",
        currency.crypto?.description.replaceAll(" ", ", ")
      );
    }
  }, [currency]);

  return (
    <div className="exchange_detail">
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div className="bg_image" onClick={() => navigate(-1)}>
            <MdArrowBackIos size={24} color="var(--, rgba(20, 20, 22, 1))" />
          </div>
          <div className="flex_one_exchange">
            <p>Участники</p>
            <MdArrowForwardIos size={18} color="var(--, rgba(20, 20, 22, 1))" />
            <p>Обменное бюро</p>
          </div>
        </div>
        <div className="exchange_detail_block_one">
          <div className="detail">
            <div>
              <img className="image" src={currency.crypto?.logo} alt="" />
              <p className="title">{currency.crypto?.license_num}</p>
              <p className="text_title">{currency.crypto?.description}</p>
              <p className="text">
                <img className="icon" src={map} alt="" />
                {currency.crypto?.address}
              </p>
              <p className="text">
                <img className="icon" src={number} alt="" />
                {currency.crypto?.phone}
              </p>
            </div>
            <div className="between">
              <p className="star">
                <img className="icon" src={star} alt="" />{" "}
                {currency.crypto?.license_num}
              </p>
              <p className="star">
                <img className="icon" src={eye} alt="" />
                {currency.crypto?.views}
              </p>
            </div>
          </div>
          <Iframe currency={currency} />
        </div>
        <div className="exchange_detail_block_two">
          <SetCourses />
          <ActiveAds />
        </div>
        <Dynamics currency={currency} />
      </div>
    </div>
  );
};

export default ExchangeDetail;
