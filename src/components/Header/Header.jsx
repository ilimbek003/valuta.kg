import React, { useState } from "react";
import "./Header.css";
import logo from "../../img/logo.svg";
import user from "../../img/ava.svg";
import star from "../../img/Component2.svg";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [auth, setAuth] = useState(false);
  const token = localStorage.getItem("token");
  return (
    <div className="header">
      <div className="container">
        <div className="head">
          <NavLink to="/">
            <img src={logo} alt="" />
          </NavLink>
          <div className="center">
            <NavLink className="link" to="/exchange-bureaus">
              Обменные бюро
            </NavLink>
            <NavLink className="link" to="/cryptocurrencies">
              Криптовалюты
            </NavLink>
            <NavLink className="link" to="/cryptocurrency-archive">
              Архив криптовалют
            </NavLink>
          </div>
          <div className="flex">
            {token ? (
              <>
                <NavLink to="/dashboard/favorites">
                  <button className="favorites">
                    <img src={star} alt="" />
                    Избранное
                  </button>
                </NavLink>
                {localStorage.getItem("user_type") === "Buyer" ? (
                  <NavLink to="/dashboard/home">
                    <img className="user" src={user} alt="" />
                  </NavLink>
                ) : (
                  <NavLink to="/dashboard/cabinet">
                    <img className="user" src={user} alt="" />
                  </NavLink>
                )}
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <button className="button_form login">Войти</button>
                </NavLink>
                <NavLink to="/register">
                  <button className="button_form">Регистрация</button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="head-mob">
          <NavLink to="/">
            <img src={logo} alt="" />
          </NavLink>
          {/* <div className="center">
            <NavLink className="link" to="/exchange-bureaus">
              Обменные бюро
            </NavLink>
            <NavLink className="link" to="/cryptocurrencies">
              Криптовалюты
            </NavLink>
            <NavLink className="link" to="/cryptocurrency-archive">
              Архив криптовалют
            </NavLink>
          </div> */}
          {/* <div className="flex">
            {token ? (
              <>
                <NavLink to="/dashboard/favorites">
                  <button className="favorites">
                    <img src={star} alt="" />
                    Избранное
                  </button>
                </NavLink>
                {localStorage.getItem("user_type") === "Buyer" ? (
                  <NavLink to="/dashboard/home">
                    <img className="user" src={user} alt="" />
                  </NavLink>
                ) : (
                  <NavLink to="/dashboard/cabinet">
                    <img className="user" src={user} alt="" />
                  </NavLink>
                )}
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <button className="button_form login">Войти</button>
                </NavLink>
                <NavLink to="/register">
                  <button className="button_form">Регистрация</button>
                </NavLink>
              </>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
