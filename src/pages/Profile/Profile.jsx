import React, { useEffect, useState } from "react";
import "./Profile.css";
import map from "../../img/map.svg";
import number from "../../img/number.svg";
import star from "../../img/component.svg";
import eye from "../../img/eyes.svg";
import deleted from "../../img/delete-one.svg";
import Modal from "../../components/UI/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { api } from "../../Api";
import { Alert } from "../../components/UI/alert/alert";
import Edited from "./Edited";
import Accounts from "./Accounts";
import ChangePassword from "./ChangePassword";
import add_photo from "../../img/add_photo.svg";
import ModalDashbosrd from "./ModalDashbosrd";

const Profile = ({ profiles, handleEditProfile }) => {
  const navigate = useNavigate();
  const [modalLogou, setModalLogout] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalChange, setModalChange] = useState(false);
  const [modalDeleteCoin, setModalDeleteCoin] = useState(false);
  const [modalEditAccount, setModalEditAccount] = useState(false);
  const [modalEditCompanies, setModalEditCompanies] = useState(false);
  const [verification, setVerification] = useState(true);
  const [loading, setLoading] = useState(false);

  const [dataCompanies, setDataCompanies] = useState({
    name: "",
    address: "",
    number: "",
    license: "",
    logo: null,
  });

  const [count, setCount] = useState({
    first: false,
    second: false,
    third: false,
  });
  const [empty, setEmpty] = useState(false);
  const [timoutImage, setTimoutImage] = useState(false);

  useEffect(() => {
    setVerification(true);
  }, []);

  useEffect(() => {
    if (dataCompanies.logo) {
      const image = dataCompanies.logo;
      const formData = new FormData();
      formData.append("logo", image);
      const dash = {
        logo: image,
      };
      console.log(dash);
    }
  }, [dataCompanies]);

  const handleDelete = () => {
    api
      .delete(
        `/exchanger/currency/delete/${localStorage.getItem("id_corse")}`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.data.response === true) {
          handleEditProfile();
          Alert("success", response.data.message);
          setModalDeleteCoin(false);
        }
      });
  };

  return (
    <div className="profile">
      {profiles?.user?.is_active === true ? (
        ""
      ) : (
        <div>
          {verification && (
            <ModalDashbosrd
              count={count}
              add_photo={add_photo}
              setCount={setCount}
              setEmpty={setEmpty}
              timoutImage={timoutImage}
              setVerification={setVerification}
              dataCompanies={dataCompanies}
              setDataCompanies={setDataCompanies}
              handleEditProfile={handleEditProfile}
            />
          )}
        </div>
      )}
      <div className="container">
        <h1>Личный кабинет</h1>
        <div className="grid d">
          <div className="white_block">
            <div style={{ margin: 0 }} className="between al">
              <h2>Данные компании</h2>
              <div>
                <button
                  onClick={() => setModalEditCompanies(true)}
                  className="button_form white"
                >
                  Редактировать
                </button>
              </div>
            </div>
            <p className="title">{profiles?.exchanger?.name}</p>
            <div className="profile_block">
              <img className="images" src={profiles?.exchanger?.logo} alt="" />
              <div
                style={{ justifyContent: "space-between" }}
                className="column"
              >
                <div style={{ gap: 30 }} className="flex">
                  <p style={{ maxWidth: "50%" }} className="text">
                    <img className="icon" src={map} alt="" />
                    {profiles?.exchanger?.address}
                  </p>
                  <div className="flex">
                    <img className="icon" src={number} alt="" />
                    <div>
                      {" "}
                      <p className="text">{profiles?.exchanger?.phone}</p>
                    </div>
                  </div>
                </div>
                <p className="text g">{profiles?.exchanger?.description}</p>
                <div className="buttons-block-star">
                  <p className="star">
                    <img className="icon" src={star} alt="" />{" "}
                    {profiles?.exchanger?.license_num}
                  </p>
                  <p className="star">
                    <img className="icon" src={eye} alt="" />
                    {profiles?.exchanger?.views}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="white_block">
            <div className="between al">
              <h2>Данные аккаунта</h2>
              <div>
                <button
                  onClick={() => setModalEditAccount(true)}
                  className="button_form white"
                >
                  Редактировать
                </button>
              </div>
            </div>
            <div className="column">
              <div className="between-users">
                <p className="text g">Имя</p>
                <div className="texting">{profiles?.user?.name}</div>
              </div>
              <div className="between-users">
                <p className="text g">Номер телефона</p>
                <div className="texting">{profiles?.user?.phone}</div>
              </div>
              <div className="between-users">
                <p className="text g">Пароль</p>
                <div className="texting">{profiles?.user?.password}</div>
              </div>
              <div className="between-users">
                <p onClick={() => setModalLogout(true)} className="text red">
                  Выйти с аккаунта
                </p>
                <p onClick={() => setModalChange(true)} className="text blue">
                  Сменить пароль
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="white_block">
          <div className="between al">
            <h2>Мои криптовалюты</h2>
            <div>
              <button
                onClick={() => navigate("/dashboard/add-coin")}
                className="button_form"
              >
                + Добавить новую валюту
              </button>
            </div>
          </div>
          <div className="offers">
            <div className="offer">
              <p className="offer_text">Валюты</p>
              <p className="offer_text">Покупка</p>
              <p className="offer_text">Продажа</p>
              <p className="offer_text">Таймер до</p>
              <p className="offer_text">Время</p>
              <p style={{ textAlign: "end" }} className="offer_text">
                Редактирование
              </p>
            </div>
            <div className="offer_blocks">
              {profiles?.currency?.map((el, id) => (
                <div className="offer_block">
                  <div className="flex">
                    <img className="btc" src={el.img} alt="" />
                    <p className="offer_block_title">{el.crypto}</p>
                  </div>
                  <p className="offer_block_text">{el.buy}</p>
                  <p className="offer_block_text">{el.sell}</p>
                  <p className="offer_block_time">{el.dead_datetime}</p>
                  <p className="offer_block_time">{el.dead_time}</p>
                  <div className="flex">
                    <img
                      onClick={() =>
                        setModalDeleteCoin(true) ||
                        localStorage.setItem("id_corse", el.id)
                      }
                      className="deleted"
                      src={deleted}
                      alt=""
                    />
                    <button
                      onClick={() =>
                        navigate("/dashboard/up-date-coin") ||
                        localStorage.setItem("id_corse", el.id) ||
                        localStorage.setItem("name", el.crypto)
                      }
                      className="button_form white"
                    >
                      Обновить курс
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {profiles?.currency?.map((el, id) => (
                <div className="offer_blocks-edit">
                  <div className="flex-edit-offer">
                    <p className="offer_text">Валюты</p>
                    <div className="flex">
                      <img className="btc" src={el.img} alt="" />
                      <p className="offer_block_title">{el.crypto}</p>
                    </div>
                  </div>
                  <div className="flex-edit-offer">
                    <p className="offer_text">Покупка</p>
                    <p className="offer_block_text">{el.buy}</p>
                  </div>
                  <div className="flex-edit-offer">
                    <p className="offer_text">Продажа</p>
                    <p className="offer_block_text">{el.sell}</p>
                  </div>
                  <div className="flex-edit-offer">
                    <p className="offer_text">Таймер до</p>
                    <p className="offer_block_time">{el.dead_datetime}</p>
                  </div>
                  <div className="flex-edit-offer">
                    <p className="offer_text">Время</p>
                    <p className="offer_block_time">{el.dead_time}</p>
                  </div>
                  <div className="flex">
                    <img
                      onClick={() =>
                        setModalDeleteCoin(true) ||
                        localStorage.setItem("id_corse", el.id)
                      }
                      className="deleted"
                      src={deleted}
                      alt=""
                    />
                    <button
                      onClick={() =>
                        navigate("/dashboard/up-date-coin") ||
                        localStorage.setItem("id_corse", el.id) ||
                        localStorage.setItem("name", el.crypto)
                      }
                      className="button_form white"
                    >
                      Обновить курс
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {modalEditCompanies && (
        <Edited
          setModalEditCompanies={setModalEditCompanies}
          setModalEditAccount={setModalEditAccount}
          handleEditProfile={handleEditProfile}
        />
      )}
      {modalEditAccount && (
        <Accounts
          setModalEditAccount={setModalEditAccount}
          profiles={profiles}
          setModalDelete={setModalDelete}
          handleEditProfile={handleEditProfile}
        />
      )}
      {modalChange && <ChangePassword setModalChange={setModalChange} />}
      {modalDeleteCoin && (
        <Modal setModal={setModalDeleteCoin}>
          <h5>Удалить {localStorage.getItem("name")}?</h5>
          <p style={{ width: 340, margin: "24px 0" }} className="modal_text">
            Вы уверены, что хотите удалить валюту? После удаления все данные
            валюты не подлежат восстановлению
          </p>
          <div className="btns">
            <button
              className="button_form off"
              onClick={() => setModalDeleteCoin(false)}
            >
              Отмена
            </button>
            <button className="button_form on" onClick={handleDelete}>
              Удалить
            </button>
          </div>
        </Modal>
      )}
      {modalDelete && (
        <Modal setModal={setModalDelete}>
          <h5>Удалить аккаунт?</h5>
          <p style={{ width: 340, margin: "24px 0" }} className="modal_text">
            Вы уверены, что хотите удалить аккаунт? После удаления все данные
            аккаунта не подлежат восстановлению
          </p>
          <div className="btns">
            <button className="button_form off">Отмена</button>
            <button className="button_form on">Удалить</button>
          </div>
        </Modal>
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

export default Profile;
