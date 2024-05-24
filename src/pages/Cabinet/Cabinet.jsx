import React, { useEffect, useState } from "react";
import "./Cabinet.css";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/UI/Modal/Modal";
import { api } from "../../Api";
import PublishAnApplication from "./PublishAnApplication";
import ChangePassword from "../Profile/ChangePassword";
import Accounts from "../Profile/Accounts";
import DeleteAccount from "./DeleteAccount";

const Cabinet = ({ profiles, handleEditProfile }) => {
  const navigate = useNavigate();
  const [modalLogou, setModalLogout] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalChange, setModalChange] = useState(false);
  const [modalDeleteApplication, setModalDeleteApplication] = useState(false);
  const [modalEditAccount, setModalEditAccount] = useState(false);
  const [list, setlist] = useState([]);
  const handleListRequest = () => {
    api
      .get("/api/request-list", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setlist(res.data);
      });
  };
  useEffect(() => {
    handleListRequest();
  }, []);

  return (
    <div className="cabinet">
      <div className="container">
        <h1>Профиль</h1>
        <div className="white_block">
          <div className="between al">
            <h2 className="title">Данные аккаунта</h2>
            <div>
              <button
                onClick={() => setModalEditAccount(true)}
                className="button_form white"
              >
                Редактировать
              </button>
            </div>
          </div>
          <div className="grid">
            <div className="col">
              <p className="text">Имя</p>
              <div>
                <button className="texting">{profiles?.name}</button>
              </div>
            </div>
            <div className="col">
              <p className="text">Номер телефона</p>
              <div>
                <button className="texting">{profiles?.phone}</button>
              </div>
            </div>
            <div className="col">
              <p className="text">Пароль</p>
              <div>
                <button className="texting">{profiles?.password}</button>
              </div>
            </div>
            <div style={{ marginTop: 35 }} className="between">
              <p onClick={() => setModalChange(true)} className="text blue">
                Сменить пароль
              </p>
              <p onClick={() => setModalLogout(true)} className="text red">
                Выйти с аккаунта
              </p>
            </div>
          </div>
        </div>
        <PublishAnApplication
          setModalDeleteApplication={setModalDeleteApplication}
          modalDeleteApplication={modalDeleteApplication}
          data={list}
          handleListRequest={handleListRequest}
        />
      </div>
      {modalEditAccount && (
        <Accounts
          setModalEditAccount={setModalEditAccount}
          profiles={profiles}
          setModalDelete={setModalDelete}
          handleEditProfile={handleEditProfile}
        />
      )}
      {modalChange && <ChangePassword setModalChange={setModalChange} />}

      {modalDelete && (
        <DeleteAccount
          setModalDelete={setModalDelete}
          modalDelete={modalDelete}
        />
      )}
      {modalLogou && (
        <Modal setModal={setModalLogout}>
          <h5>Выйти с аккаунта?</h5>
          <p style={{ width: 340, margin: "24px 0" }} className="modal_text">
            Вы уверены, что хотите выйти с аккаунта? Вы можете в любое время
            снова войти в свой аккаунт
          </p>
          <div className="btns">
            <button
              className="button_form off"
              onClick={() => setModalLogout(false)}
            >
              Отмена
            </button>
            <button
              className="button_form on"
              onClick={() =>
                localStorage.removeItem("token") || navigate("/login")
              }
            >
              Выйти
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Cabinet;
