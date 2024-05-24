import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../Api";
import Modal from "../../components/UI/Modal/Modal";
import { Alert } from "../../components/UI/alert/alert";

const PublishAnApplication = ({
  setModalDeleteApplication,
  modalDeleteApplication,
  data,
  handleListRequest,
}) => {
  const navigate = useNavigate();
  const handleDelete = (id) => {
    api
      .delete(`/api/request-update/${id}/`, {
        header: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.responce === true) {
          handleListRequest();
          Alert("success", response.data.message);
          setModalDeleteApplication(false);
        }
      });
  };
  return (
    <div style={{ marginTop: 20 }} className="white_block">
      <div className="between al">
        <h2 className="title">Мои заявки</h2>
        <div>
          <button
            onClick={() => navigate("/dashboard/post-application")}
            className="button_form"
          >
            + Опубликовать заявку
          </button>
        </div>
      </div>
      {data?.results?.map((el, index) => (
        <div className="applications_block">
          <div className="between">
            <div className="flex">
              <h2 className="title">Заявка {el.id}</h2>
              <div className="sell_buy">{el.title}</div>
            </div>
            <div className="flex">
              <p
                onClick={() => setModalDeleteApplication(true)}
                className="text red"
              >
                Удалить заявку
              </p>
              <button
                onClick={() =>
                  navigate("/dashboard/change-post-application") ||
                  localStorage.setItem("request_id", el.id)
                }
                style={{ width: 160 }}
                className="button_form white"
              >
                Редактировать
              </button>
            </div>
          </div>
          <div className="grid_two">
            <div className="white_block">
              <h3>Информация</h3>
              <div className="column">
                <div className="between">
                  <p className="text">Валюта</p>
                  <div>
                    <button className="texting">{el.crypto}</button>
                  </div>
                </div>
                <div className="between">
                  <p className="text">Количество</p>
                  <div>
                    <button className="texting">{el.total}</button>
                  </div>
                </div>
                <div className="between">
                  <p className="text">По курсу</p>
                  <div>
                    <button className="texting">{el.course}</button>
                  </div>
                </div>
                <div className="between">
                  <p className="text">Оплата</p>
                  <div>
                    <button className="texting">Банковский перевод</button>
                  </div>
                </div>
                <div className="between">
                  <p className="text">Место сделки</p>
                  <div>
                    <button className="texting">{el.location}</button>
                  </div>
                </div>
                <div className="between">
                  <p className="text">Время</p>
                  <div>
                    <button className="texting">{el.date}</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="white_block">
              <h3>Условия сделки</h3>
              {React.createElement("p", {
                dangerouslySetInnerHTML: {
                  __html: el.description ? el.description : "",
                },
              })}
            </div>
            {modalDeleteApplication && (
              <Modal setModal={setModalDeleteApplication}>
                <h5>Удалить Заявку</h5>
                <p
                  style={{ width: 340, margin: "24px 0" }}
                  className="modal_text"
                >
                  Вы уверены, что хотите удалить заявку? После удаления все
                  данные валюты не подлежат восстановлению
                </p>
                <div className="btns">
                  <button
                    className="button_form off"
                    onClick={() => setModalDeleteApplication(false)}
                  >
                    Отмена
                  </button>
                  <button
                    className="button_form on"
                    onClick={() => handleDelete(el.id)}
                  >
                    Удалить
                  </button>
                </div>
              </Modal>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublishAnApplication;
