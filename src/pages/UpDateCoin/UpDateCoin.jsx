import React, { useState } from "react";
import "./UpDateCoin.css";
import InputComponent from "../../components/UI/InputComponent/InputComponent";
import arrows from "../../img/arrows.svg";
import { useNavigate } from "react-router-dom";
import { api } from "../../Api";
import Loading from "../../components/UI/Loading/Loading";
import { Alert } from "../../components/UI/alert/alert";

const UpDateCoin = ({ calculate, handleEditProfile }) => {
  const [btcCoin, setBtcCoin] = useState("BTC Биткоин");
  const [loading, setLoading] = useState(false);
  const [dataCoin, setDataCoin] = useState({
    id: localStorage.getItem("id_corse"),
    cryptocurrency: localStorage.getItem("id"),
    buy: "",
    sell: "",
    taimer: "",
    time: "",
  });
  const navigate = useNavigate();
  const handleSubmitCurse = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.patch("/exchanger/currency-post/", dataCoin, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.response === true) {
        handleEditProfile();
        Alert("success", response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="up_date_coin">
      <div className="container">
        <img
          onClick={() => navigate(-1)}
          className="back"
          src={arrows}
          alt=""
        />
        <div className="white_block">
          <h5>Обновить курс валюты</h5>
          <form
            style={{ width: 500 }}
            onSubmit={handleSubmitCurse}
            className="form_password"
          >
            <div className="input_box">
              <label className="label_form">Криптовалюта</label>
              <InputComponent
                value={btcCoin}
                setValue={setBtcCoin}
                data={calculate?.current_currency}
                width={"100%"}
              />
            </div>
            <div className="input_box">
              <label className="label_form">Покупка</label>
              <input
                className="input_form"
                value={dataCoin.buy}
                onChange={(e) =>
                  setDataCoin({ ...dataCoin, buy: e.target.value })
                }
                type="number"
                placeholder="Введите курс покупки валюты"
                required
              />
            </div>
            <div className="input_box">
              <label className="label_form">Продажа</label>
              <input
                className="input_form"
                value={dataCoin.sell}
                onChange={(e) =>
                  setDataCoin({ ...dataCoin, sell: e.target.value })
                }
                type="number"
                placeholder="Введите курс продажи валюты"
                required
              />
            </div>
            <div style={{ margin: 0 }} className="grid">
              <div className="input_box">
                <label className="label_form">Таймер до (дата)</label>
                <input
                  className="input_form"
                  value={dataCoin.taimer}
                  onChange={(e) =>
                    setDataCoin({ ...dataCoin, taimer: e.target.value })
                  }
                  type="date"
                  required
                />
              </div>
              <div className="input_box">
                <label className="label_form">Таймер до (время)</label>
                <input
                  className="input_form"
                  value={dataCoin.time}
                  onChange={(e) =>
                    setDataCoin({ ...dataCoin, time: e.target.value })
                  }
                  type="time"
                  required
                />
              </div>
            </div>
            <button
              style={{ marginTop: 20 }}
              type="submit"
              className="button_form"
            >
              {loading ? <Loading /> : "Обновить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpDateCoin;
