import React from "react";
import "./Footer.css";
import logo from "../../img/logo_footer.svg";
import whatsapp from "../../img/whatsapp.svg";
import telegram from "../../img/telegram.svg";
import instagram from "../../img/instagram.svg";
import tiktok from "../../img/tik-tok.svg";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
    <div className="bac"></div>
      <div className="footer">
        <div className="container">
          <img className="logo" src={logo} alt="" />
          <div className="foot">
            <div className="box_first">
              <p className="title">Актуальные курсы криптовалют в Бишкеке</p>
              <p className="text">
                Вся предоставляемая сайтом информация носит исключительно
                справочный характер, мы не можем гарантировать её достоверность.
              </p>
              <p className="text">
                Заявленные на сайте курсы валют не являются обязательством по
                совершению сделки. Перед обменной операцией уточняйте курс в
                банке или обменном пункте по указанным телефонам.
              </p>
              <p className="text">
                Меняйте деньги только в специализированных учреждениях с
                лицензией на проведение обменных операций.
              </p>
              <p className="medium">
                Обмен без лицензии — нарушение закона КР!
              </p>
            </div>
            <div className="box_secend">
              <NavLink to="" className="title">
                Основное
              </NavLink>
              <NavLink to="" className="text">
                О компании
              </NavLink>
              <NavLink to="" className="text">
                Контакты
              </NavLink>
              <NavLink to="" className="text">
                Новости
              </NavLink>
              <NavLink to="" className="text">
                Реклама на сайте
              </NavLink>
              <NavLink to="" className="text">
                Архив курсов
              </NavLink>
            </div>
            <div className="box_three">
              <p className="title">Статистика</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 46,
                }}
              >
                <p className="big_text">
                  66 115 180 <p className="text">участников</p>{" "}
                </p>
                <p className="text"></p>
              </div>
              <p className="title">Мы в соцсетях </p>
              <div className="flex_icon">
                <img src={whatsapp} alt="" />
                <img src={telegram} alt="" />
                <img src={instagram} alt="" />
                <img src={tiktok} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer top">
        <div className="container">
          <div className="foot_bottom">
            <span>© 2024 Valuta.KG. Все права защищены</span>
            <p>Made with love by NavisDevs</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
