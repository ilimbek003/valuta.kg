import React, { useEffect, useState } from "react";
import "./ApplicationsDetails.css";
import { useParams } from "react-router-dom";
import phone from "../../img/phone.svg";
import users from "../../img/user.svg";
import Modal from "../../components/UI/Modal/Modal";
import { api } from "../../Api";
import Loading from "../../components/UI/Loading/Loading";
import { Alert } from "../../components/UI/alert/alert";

const ApplicationsDetails = () => {
  const { user_id } = useParams();
  const [modal, setModal] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneUser, setPhoneUser] = useState(false);
  const [complaint, setComplaint] = useState({
    data: [
      { id: 1, text: "Мошенники" },
      { id: 2, text: "Недостоверная информация" },
      { id: 3, text: "Другое" },
    ],
    state: 0,
  });
  const [user, setUser] = useState([]);
  useEffect(() => {
    api.get(`/api/request/${user_id}`).then((response) => {
      setUser(response.data);
    });
  }, []);
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      user: user_id,
      category: text.state,
    };
    api
      .post(`/api/complain/`, data, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        if (response.data.response === true) {
          setLoading(false);
          setModal(false);
          Alert("success", response.data.message);
        }
        if (response.data.response === false) {
          setLoading(false);
          Alert("error", response.data.message);
        }
      });
  };

  const handleChange = () => {
    if (localStorage.getItem("token")) {
      setPhoneUser(!phoneUser);
    }
  };
  const give = user.total * user.course;

  return (
    <div className="applications_details">
      <div className="container">
        <div className="white_block">
          <div className="between-one">
            <div className="flex">
              <img className="image" src={users} alt="" />
              <div>
                <p className="title">{user.user}</p>
                <div className="flex flex-one">
                  <p className="text">
                    <img src={phone} alt="" />
                    {!phoneUser ? "***********" : user.phone}
                  </p>
                  <p className="text blue" onClick={handleChange}>
                    Показать номер
                  </p>
                </div>
              </div>
            </div>
            <div>
              <button onClick={() => setModal(true)} className="button_form">
                Пожаловаться
              </button>
            </div>
          </div>
        </div>
        <div className="grid">
          <div className="white_block">
            <h2>Информация</h2>
            <div style={{ gap: 14 }} className="column">
              <div className="between">
                <p className="text">Валюта</p>
                <div className="texting">{user.crypto}</div>
              </div>
              <div className="between">
                <p className="text">Количество</p>
                <div className="texting">{user.total}</div>
              </div>
              <div className="between">
                <p className="text">По курсу</p>
                <div className="texting">{user.course}</div>
              </div>
              <div className="between">
                <p className="text">Оплата</p>
                <div className="texting">{user.payment}</div>
              </div>
              <div className="between">
                <p className="text">Место сделки</p>
                <div className="texting">{user.location}</div>
              </div>
              <div className="between">
                <p className="text">Время</p>
                <div className="texting">{user.date}</div>
              </div>
            </div>
          </div>
          <div style={{ gap: 20 }} className="column">
            <div className="white_block">
              <h2>Вы отдаете</h2>
              <div className="between">
                <p className="text">Сумма</p>
                <div className="texting_sum">
                  {give} <div className="valuta">$</div>
                </div>
              </div>
            </div>
            <div className="white_block white_block_two">
              <h2>Условия сделки</h2>
              {React.createElement("p", {
                dangerouslySetInnerHTML: {
                  __html: user.description ? user.description : "",
                },
              })}
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <Modal setModal={setModal}>
          <h5>Пожаловаться</h5>
          <div className="array">
            {complaint.data.map((el) => (
              <div
                onClick={() => setComplaint({ ...complaint, state: el.id })}
                className="array_box"
              >
                <div
                  className={`state ${el.id === complaint.state && "active"}`}
                  onClick={() => setText({ ...complaint, state: el.text })}
                >
                  {el.id === complaint.state && <div className="circle"></div>}
                </div>
                <p className="text">{el.text}</p>
              </div>
            ))}
          </div>
          <button onClick={submit} className="button_form">
            {loading ? <Loading color={"#fff"} /> : " Отправить жалобу"}
          </button>
        </Modal>
      )}
    </div>
  );
};

export default ApplicationsDetails;
