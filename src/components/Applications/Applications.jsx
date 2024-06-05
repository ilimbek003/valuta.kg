import React, { useEffect, useState } from "react";
import "./Applications.css";
import { NavLink, useNavigate } from "react-router-dom";
import InputComponent from "../UI/InputComponent/InputComponent";
import user from "../../img/user.svg";
import { api } from "../../Api";
import SuggestionsInput from "./SuggestionsInput";
import SliderApplications from "./SliderApplications";

const buy_sell_data = [
  {
    text: "Купить",
  },
  {
    text: "Продать",
  },
];

const Applications = ({ calculate }) => {
  const [auth, setAuth] = useState(localStorage.getItem("token"));
  const [buySell, setBuySell] = useState("Купить");
  const [course, setCourse] = useState("");
  const [btc, setBtc] = useState("BTC Биткоин");
  const [currency, setCurrency] = useState("");
  const [payment, setPayment] = useState("");
  const navigate = useNavigate();
  const [request, setRequest] = useState([]);
  const [local, setLocal] = useState(localStorage.getItem("token"));
  const [id, setId] = useState("");

  const handleSubmit = () => {
    if (local) {
      api
        .get(
          `/request/filter/?title=${buySell}&summa=${course}&crypto=${id}&course=${payment}&currency=${currency}`,
          {
            headers: {
              Authorization: `Token ${local}`,
            },
          }
        )
        .then((response) => {
          setRequest(response.data);
        });
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);
  return (
    <>
      <div className="applications">
        <div className="container">
          <div>
            <h2 className="title_h1">Заявки</h2>
            <p className="text_p">
              Вы можете оставить заявку на выгодные предложения, действующие в
              течении 6 часов. Ознакомтесь с
              <a href="/" target="blank" className="link">
                правилами заявки
              </a>
              .
            </p>
          </div>
          <div className="applications_block">
            <div className="applications_block_head">
              <div className="input_block">Я хочу</div>
              <InputComponent
                value={buySell}
                setValue={setBuySell}
                data={buy_sell_data}
                width={135}
              />
              <input
                className="input_form"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                type="text"
                placeholder="сумма"
              />
              <InputComponent
                value={btc}
                setValue={setBtc}
                data={calculate?.current_currency}
                width={190}
                setId={setId}
              />
              <div className="input_block">за</div>
              <SuggestionsInput
                value={currency}
                setValue={setCurrency}
                data={calculate?.crypto}
                width={110}
              />
              <div className="input_block">по курсу</div>
              <input
                className="input_form"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                type="text"
                placeholder="курс"
              />
              <button className="button_form" onClick={handleSubmit}>
                Найти
              </button>
            </div>
            <div className="applications_block_body">
              <h3 className="title">Предложения</h3>
              {auth ? (
                <div>
                  <div className="offers">
                    <div className="offer">
                      <p className="offer_text">Участник</p>
                      <p className="offer_text">Количество</p>
                      <p className="offer_text">Валюта</p>
                      <p className="offer_text">По курсу</p>
                      <p className="offer_text">Время</p>
                      <p style={{ textAlign: "end" }} className="offer_text">
                        Торгуй
                      </p>
                    </div>
                    <div className="offer_blocks">
                      {request?.results?.map((el, id) => (
                        <div
                          key={id}
                          onClick={() =>
                            el.user_id
                              ? navigate(`/applications/${el.user_id}`)
                              : ""
                          }
                          className="offer_block"
                        >
                          <div className="flex">
                            <img className="user" src={user} alt="" />
                            <p className="offer_block_title">{el.user}</p>
                          </div>
                          <p className="offer_block_text total">{el.total}</p>
                          <p className="offer_block_text">{el.crypto}</p>
                          <p className="offer_block_text">${el.course}</p>
                          <p className="offer_block_time">{el.date}</p>
                          <button
                            className={
                              el.user_id
                                ? "button_form offer_block_btn"
                                : "button_form offer_block_btnsesion"
                            }
                          >
                            {el.title}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="div_auth">
                  <p className="text">
                    Тут появятся предложения об обмене криптовалюты.
                    Зарегистрируйтесь, чтобы добавить предложения
                  </p>
                  <div className="flex">
                    <NavLink to="/login">
                      <button className="button_form login">Войти</button>
                    </NavLink>
                    <NavLink to="/register">
                      <button className="button_form">Регистрация</button>
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          </div>
          <SliderApplications
            auth={auth}
            request={request}
            user={user}
            buySell={buySell}
            setBuySell={setBuySell}
            buy_sell_data={buy_sell_data}
            course={course}
            btc={btc}
            setCourse={setCourse}
            payment={payment}
            setPayment={setPayment}
            currency={currency}
            setCurrency={setCurrency}
            id={id}
            setId={setId}
            setBtc={setBtc}
            calculate={calculate}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default Applications;
