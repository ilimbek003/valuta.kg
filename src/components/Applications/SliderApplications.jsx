import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import InputComponent from "../UI/InputComponent/InputComponent";
import SuggestionsInput from "./SuggestionsInput";
import { IoIosSearch } from "react-icons/io";
import Loading from "../UI/Loading/Loading";

const SliderApplications = ({
  request,
  user,
  calculate,
  buySell,
  setBuySell,
  buy_sell_data,
  course,
  btc,
  setCourse,
  payment,
  setPayment,
  currency,
  setCurrency,
  setId,
  setBtc,
  handleSubmit,
}) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
  };

  const closeModal = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModal(false);
    }, 500);
  };

  return (
    <div className="boby-none">
      <div className="applications-search" onClick={toggleModal}>
        <IoIosSearch size={28} color="var(--gray, rgba(154, 154, 154, 1))" />
        <p>Поиск</p>
      </div>
      {modal === true ? (
        <div className="modal-all-block" onClick={closeModal}>
          <div
            className="applications-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="input_block label">Я хочу</div>
            <InputComponent
              value={buySell}
              setValue={setBuySell}
              data={buy_sell_data}
              width={135}
            />
            <input
              className="input_form form-input"
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
            <div className="input_block label">за</div>
            <SuggestionsInput
              value={currency}
              setValue={setCurrency}
              data={calculate?.crypto}
              width={110}
            />
            <div className="input_block label">по курсу</div>
            <input
              className="input_form form-input"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              type="text"
              placeholder="курс"
            />
            <button
              className="button_form"
              onClick={closeModal || handleSubmit}
            >
              {loading ? <Loading /> : "Найти"}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <Slider {...settings}>
        {request?.results?.map((el, id) => (
          <div
            key={id}
            onClick={() => navigate(`/applications/${el.user_id}`)}
            className="boby_block"
          >
            <div>
              <p className="offer_text" style={{ margin: "0 0 20px 0" }}>
                Участник
              </p>
              <div className="flex">
                <img className="user" src={user} alt="" />
                <p className="offer_block_title">{el.user}</p>
              </div>
            </div>
            <div className="flex-flex">
              <p className="offer_text">Количество</p>
              <p className="offer_block_text ">{el.total}</p>
            </div>
            <div className="flex-flex">
              <p className="offer_text">Валюта</p>
              <p className="offer_block_text">{el.crypto}</p>
            </div>

            <div className="flex-flex">
              <p className="offer_text">По курсу</p>
              <p className="offer_block_text">${el.course}</p>
            </div>
            <div className="flex-flex">
              <p className="offer_text">Время</p>
              <p className="offer_block_time">{el.date}</p>
            </div>

            <button className="button_form offer_block_btn">{el.title}</button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderApplications;
