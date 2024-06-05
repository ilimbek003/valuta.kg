import React, { useState } from "react";
import "./ChangePostApplication.css";
import InputComponent from "../../components/UI/InputComponent/InputComponent";
import arrows from "../../img/arrows.svg";
import { useNavigate } from "react-router-dom";
import { api } from "../../Api";
import Loading from "../../components/UI/Loading/Loading";
import { Alert } from "../../components/UI/alert/alert";

const btc_data = [
  {
    text: "BTC Биткоин",
  },
  {
    text: "BNB ",
  },
  {
    text: "ETH",
  },
  {
    text: "XRP",
  },
  {
    text: "USDT",
  },
];

const buy_sell_data = [
  {
    text: "Купить",
  },
  {
    text: "Продать",
  },
];

const payment_data = [
  {
    text: "Банковский перевод",
  },
  {
    text: "РСК банк»",
  },
  {
    text: "Айыл банк»",
  },
];

const ChangePostApplication = () => {
  const navigate = useNavigate();
  const [btcApplication, setBtcApplication] = useState("BTC Биткоин");
  const [buySell, setBuySell] = useState("Купить");
  const [payment, setPayment] = useState("Банковский перевод");
  const [loading, setLoading] = useState(false);
  const [dataApplication, setDataApplication] = useState({
    cryptocurrency: btcApplication,
    action: buySell,
    quantity: "",
    payment: payment,
    place_of_transaction: "",
    terms_of_a_transaction: "",
  });
  const handleApplication = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("crypto", localStorage.getItem("crypto_id"));
      data.append("title", dataApplication.action);
      data.append("description", dataApplication.terms_of_a_transaction);
      data.append("total", dataApplication.quantity);
      data.append("payment", dataApplication.payment);
      data.append("location", dataApplication.place_of_transaction);
      const response = await api.patch(
        `/request-update/${localStorage.getItem("request_id")}/`,
        data,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.responce === true) {
        setLoading(false);
        Alert("success", response.data.message);
        setDataApplication({
          cryptocurrency: btcApplication,
          action: buySell,
          quantity: "",
          payment: payment,
          place_of_transaction: "",
          terms_of_a_transaction: "",
        });
      }
    } catch (error) {
      Loading(false);
      Alert("success", error.message);
      console.log(error);
    }
  };

  return (
    <div className="change_post_application">
      <div className="container">
        <img
          onClick={() => navigate(-1)}
          className="back"
          src={arrows}
          alt=""
        />
        <div className="white_block">
          <h5>Редактировать заявку</h5>
          <form className="form_password" onSubmit={handleApplication}>
            <div className="grid">
              <div>
                <div className="input_box">
                  <label className="label_form">Криптовалюта</label>
                  <InputComponent
                    value={btcApplication}
                    setValue={setBtcApplication}
                    data={btc_data}
                    width={"100%"}
                  />
                </div>
                <div className="input_box">
                  <label className="label_form">Действие</label>
                  <InputComponent
                    value={buySell}
                    setValue={setBuySell}
                    data={buy_sell_data}
                    width={"100%"}
                  />
                </div>
                <div className="input_box">
                  <label className="label_form">Количество</label>
                  <input
                    className="input_form"
                    value={dataApplication.quantity}
                    onChange={(e) =>
                      setDataApplication({
                        ...dataApplication,
                        quantity: e.target.value,
                      })
                    }
                    type="number"
                    placeholder="Введите количество валюты"
                    required
                  />
                </div>
                <div className="input_box">
                  <label className="label_form">Оплата</label>
                  <InputComponent
                    value={payment}
                    setValue={setPayment}
                    data={payment_data}
                    width={"100%"}
                  />
                </div>
              </div>
              <div>
                <div className="input_box">
                  <label className="label_form">Место сделки</label>
                  <input
                    className="input_form"
                    value={dataApplication.place_of_transaction}
                    onChange={(e) =>
                      setDataApplication({
                        ...dataApplication,
                        place_of_transaction: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Введите адрес сделки"
                    required
                  />
                </div>
                <div style={{ height: 263 }} className="input_box">
                  <label className="label_form">
                    Условия сделки (до 500 символов)
                  </label>
                  <textarea
                    style={{ height: "100%" }}
                    className="input_form"
                    value={dataApplication.terms_of_a_transaction}
                    onChange={(e) =>
                      setDataApplication({
                        ...dataApplication,
                        terms_of_a_transaction: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Напишите несколько предложений о вашей компании"
                    required
                  />
                </div>
              </div>
            </div>
            <button
              style={{ marginTop: 20 }}
              type="submit"
              className="button_form"
            >
              {loading ? <Loading /> : "Сохранить изменения"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePostApplication;
