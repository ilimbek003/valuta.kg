import React from "react";
import "./Choice.css";
import { NavLink } from "react-router-dom";
import photo_auth from "../../img/photo_auth.svg";
import lodos from "../../img/logo.png";

const Choice = () => {
  return (
    <div className="choice">
      <div className="authentication-css">
        <img className="lodo" src={lodos} alt="" />
      </div>
      <div className="container">
        <div className="block">
          <div className="choice_box">
            <h1 className="title">Выберите тип пользователя для регистрации</h1>
            <NavLink
              to="/register/buyer"
              className="btn"
              onClick={() => localStorage.setItem("user_type", "Buyer")}
            >
              Покупатель
            </NavLink>
            <NavLink
              to="/register/exchanger"
              className="btn"
              onClick={() => localStorage.setItem("user_type", "Exchanger")}
            >
              Обменник
            </NavLink>
          </div>
          <img className="photo_auth" src={photo_auth} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Choice;
