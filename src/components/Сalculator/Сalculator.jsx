import React, { useEffect, useState } from "react";
import "./Сalculator.css";
import calc from "../../img/calendar-dot.svg";
import oshka from "../../img/oshka.svg";
import InputComponent from "../UI/InputComponent/InputComponent";
import { api } from "../../Api";

const Сalculator = ({ calculate }) => {
  const buy_sell_data = [{ text: "Купить" }, { text: "Продать" }];

  const [buySell, setBuySell] = useState("Купить");
  const [summa, setSumma] = useState();
  const [courseCrypto, setCourseCrypto] = useState([]);
  const [courseCurenc, setCourseCurenc] = useState([]);
  const [currency, setCurrency] = useState("");
  const [btc, setBtc] = useState("");
  const [course, setCourse] = useState("");

  const courseFiat = JSON.parse(localStorage.getItem("fiat"));
  const crypto_price = courseCurenc;

  const fetchCourseCrypto = () => {
    api.get("/exchanger/course-crypto/").then((response) => {
      setCourseCrypto(response.data);
    });
  };

  const fetchCourseCurrency = () => {
    api
      .get(`/exchanger/crypto/${localStorage.getItem("slug")}/`)
      .then((response) => {
        setCourseCurenc(response.data);
        if (response.data.length > 0) {
          setBtc(response.data[0].crypto);
        }
      });
  };

  useEffect(() => {
    fetchCourseCrypto();
    fetchCourseCurrency();
  }, []);

  let selectedCrypto = null;
  let fiatPrice = 0;
  if (summa && Array.isArray(crypto_price)) {
    selectedCrypto = crypto_price.find((item) => item.crypto === btc);
    if (selectedCrypto) {
      const rate =
        buySell === "Купить" ? selectedCrypto.buy : selectedCrypto.sell;
      fiatPrice = summa * rate * (courseFiat?.course || 1);
    }
  }

  return (
    <div className="calculator">
      <div className="container">
        <div>
          <h2 className="title_h1">
            Калькулятор валют{" "}
            <img
              style={{ width: 35, height: 35, marginLeft: 14 }}
              src={calc}
              alt=""
            />{" "}
          </h2>
        </div>
        <div className="calculator_block">
          <div className="calculator_box">
            <div className="input_box">
              <label className="label_form">По курсу от</label>
              <InputComponent
                value={
                  course === ""
                    ? courseCrypto.length > 0
                      ? courseCrypto[0]?.text
                      : ""
                    : course
                }
                setValue={setCourse}
                data={courseCrypto}
                width={"100%"}
                setCourseCurency={fetchCourseCurrency}
              />
            </div>
            <div className="grid">
              <div className="input_box">
                <label className="label_form">Я хочу</label>
                <InputComponent
                  value={buySell}
                  setValue={setBuySell}
                  data={buy_sell_data}
                  width={"100%"}
                />
              </div>
              <div className="input_box">
                <label className="label_form">В количестве</label>
                <input
                  className="input_form"
                  value={summa}
                  type="number"
                  name="amount"
                  onChange={(e) => setSumma(Number(e.target.value))}
                  placeholder="Введите количество"
                  required
                />
              </div>
              <div className="input_box">
                <label className="label_form">Криптовалюту</label>
                <InputComponent
                  value={btc}
                  setValue={setBtc}
                  data={
                    Array.isArray(courseCurenc)
                      ? courseCurenc.map((item) => ({
                          text: item.crypto,
                        }))
                      : []
                  }
                  width={"100%"}
                />
              </div>
              <div className="input_box">
                <label className="label_form">За</label>
                <InputComponent
                  value={
                    currency ||
                    (calculate?.crypto?.length ? calculate.crypto[0].text : "")
                  }
                  setValue={setCurrency}
                  data={calculate?.crypto}
                  width={"100%"}
                />
              </div>
            </div>
            <div className="gap">
              <div className="flex">
                <p className="eight">Формула</p>
                <p className="six">Результат</p>
              </div>
              <div className="flex">
                <p className="two_two">
                  {summa} *{" "}
                  {buySell === "Купить"
                    ? selectedCrypto?.buy
                    : selectedCrypto?.sell}
                </p>
                <p className="two_six">{fiatPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <img className="image_rec" src={oshka} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Сalculator;
