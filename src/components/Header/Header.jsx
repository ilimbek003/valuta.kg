import React, { useState } from "react";
import "./Header.css";
import logo from "../../img/logo.svg";
import user from "../../img/ava.svg";
import star from "../../img/Component2.svg";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoX } from "react-icons/go";

const Header = () => {
  const [burger, setBurger] = useState(false);
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
                {localStorage.getItem("user") === "Buyer" && (
                  <NavLink to="/dashboard/cabinet">
                    <img className="user" src={user} alt="" />
                  </NavLink>
                )}
                {localStorage.getItem("user") === "Exchanger" && (
                  <NavLink to="/dashboard/home">
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
          <div className="burger-flex">
            <div className="burger-block" onClick={() => setBurger(!burger)}>
              <RxHamburgerMenu size={25} />
            </div>
            <NavLink to="/">
              <img src={logo} alt="" />
            </NavLink>
          </div>
          {burger ? (
            <div className="burger-menu">
              <div className="burger-left">
                <div
                  className="burger-close"
                  onClick={() => setBurger(!burger)}
                >
                  <GoX size={25} />
                </div>
                <div className="center">
                  <NavLink
                    className="link"
                    onClick={() => setBurger(!burger)}
                    to="/exchange-bureaus"
                  >
                    Обменные бюро
                  </NavLink>
                  <NavLink
                    className="link"
                    onClick={() => setBurger(!burger)}
                    to="/cryptocurrencies"
                  >
                    Криптовалюты
                  </NavLink>
                  <NavLink
                    className="link"
                    onClick={() => setBurger(!burger)}
                    to="/cryptocurrency-archive"
                  >
                    Архив криптовалют
                  </NavLink>
                </div>
                <div className="flex">
                  {token ? (
                    <>
                      <NavLink
                        onClick={() => setBurger(!burger)}
                        to="/dashboard/favorites"
                      >
                        <button className="favorites">
                          <img src={star} alt="" />
                          Избранное
                        </button>
                      </NavLink>
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
          ) : (
            ""
          )}
          {token ? (
            <>
              {localStorage.getItem("user_type") === "Buyer" ? (
                <NavLink to="/dashboard/cabinet">
                  <div className="flex-mob">
                    <NavLink to="/dashboard/favorites">
                      <button className="favorites">
                        <img src={star} alt="" />
                      </button>
                    </NavLink>
                    <img className="user" src={user} alt="" />
                  </div>
                </NavLink>
              ) : (
                <NavLink to="/dashboard/cabinet">
                  <div className="flex-mob">
                    <NavLink to="/dashboard/favorites">
                      <button className="favorites">
                        <img src={star} alt="" />
                      </button>
                    </NavLink>
                    <img className="user" src={user} alt="" />
                  </div>
                </NavLink>
              )}
            </>
          ) : (
            <>
              <NavLink to="/login" style={{ textDecoration: "none" }}>
                <button className="button_form">Войти</button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
