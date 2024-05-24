import React, { useState } from "react";
import "./AddCoin.css";
import InputComponent from "../../components/UI/InputComponent/InputComponent";
import arrows from "../../img/arrows.svg";
import { useNavigate } from "react-router-dom";
import { api } from "../../Api";
import InputCrypto from "../../components/UI/InputComponent/InputCrypto";
import { Alert } from "../../components/UI/alert/alert";
import Loading from "../../components/UI/Loading/Loading";

const AddCoin = ({ calculate, handleEditProfile }) => {
  const [btcCoin, setBtcCoin] = useState("BTC Биткоин");
  const [loading, setLoading] = useState(false);
  const [dataCoin, setDataCoin] = useState({
    crypto: localStorage.getItem("crypto_id"),
    buy: "",
    sell: "",
    deadline: "",
    time: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/exchanger/currency-post/", dataCoin, {
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
      if (response.data.response === false) {
        Alert("success", response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  return (
    <div className="add_coin">
      <div className="container">
        <img
          onClick={() => navigate(-1)}
          className="back"
          src={arrows}
          alt=""
        />
        <div className="white_block">
          <h5>Добавить новую валюту</h5>
          <form
            style={{ width: 500 }}
            onSubmit={handleSubmit}
            className="form_password"
          >
            <div className="input_box">
              <label className="label_form">Криптовалюта</label>
              <InputCrypto
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
                  value={dataCoin.deadline}
                  onChange={(e) =>
                    setDataCoin({ ...dataCoin, deadline: e.target.value })
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
              {loading ? <Loading /> : "Добавить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCoin;
