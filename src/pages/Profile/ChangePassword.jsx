import React, { useState } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Loading from "../../components/UI/Loading/Loading";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { api } from "../../Api";
import { Alert } from "../../components/UI/alert/alert";
const ChangePassword = ({ setModalChange }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState({
    visible1: false,
    visible2: false,
    visible3: false,
  });
  const [password, setPassword] = useState({
    old_password: "",
    password: "",
    confirm_password: "",
  });
  const ChangeFunc = async (e) => {
    e.preventDefault();
    if (
      password.password !== "" &&
      password.old_password !== "" &&
      password.confirm_password !== ""
    ) {
      if (password.password == password.confirm_password) {
        if (
          password.password.length >= 8 &&
          password.confirm_password.length >= 8
        ) {
          setLoading(true);
          try {
            const token = localStorage.getItem("token");
            const response = await api.post(
              "/auth/change-password/",
              {
                old_password: password.old_password,
                password: password.password,
                confirm_password: password.confirm_password,
              },
              {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );
            if (response.data.response === true) {
              Alert("success", response.data.message);
              setModalChange(false);
              setPassword({
                ...password,
                old_password: "",
                password: "",
                confirm_password: "",
              });
            } else {
              Alert("error", response.data.message);
            }
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        } else {
          alert("Новый пароль должен быть не менее 8-ми символов", "error");
        }
      } else {
        alert("Пароли не совпадают", "error");
      }
    } else {
      alert("Заполните все поля!", "error");
    }
  };
  return (
    <Modal setModal={setModalChange}>
      <h5>Сменить пароль</h5>
      <p className="modal_text">
        Придумайте новый пароль и введите его ещё раз для потверждения
      </p>
      <form onSubmit={ChangeFunc} className="form_password">
        <div className="input_box">
          <label className="label_form">Старый пароль</label>
          <input
            className="input_form"
            value={password.old_password}
            onChange={(e) =>
              setPassword({ ...password, old_password: e.target.value })
            }
            type={visible.visible1 ? "text" : "password"}
            placeholder="Старый пароль"
            required
          />
          <span
            className="span-icon"
            onClick={() =>
              setVisible({ ...visible, visible1: !visible.visible1 })
            }
          >
            {visible.visible1 ? <FaEye /> : <FaEyeSlash />}{" "}
          </span>
        </div>
        <div className="input_box">
          <label className="label_form">Новый пароль</label>
          <input
            className="input_form"
            value={password.password}
            onChange={(e) =>
              setPassword({ ...password, password: e.target.value })
            }
            type={visible.visible2 ? "text" : "password"}
            placeholder="Новый пароль"
            required
          />
          <span
            className="span-icon"
            onClick={() =>
              setVisible({ ...visible, visible2: !visible.visible2 })
            }
          >
            {visible.visible2 ? <FaEye /> : <FaEyeSlash />}{" "}
          </span>
        </div>
        <div className="input_box">
          <label className="label_form">Повторите пароль</label>
          <input
            className="input_form"
            value={password.confirm_password}
            onChange={(e) =>
              setPassword({ ...password, confirm_password: e.target.value })
            }
            type={visible.visible3 ? "text" : "password"}
            placeholder="Повторите пароль"
            required
          />
          <span
            className="span-icon"
            onClick={() =>
              setVisible({ ...visible, visible3: !visible.visible3 })
            }
          >
            {visible.visible3 ? <FaEye /> : <FaEyeSlash />}{" "}
          </span>
        </div>
        <button
          style={{ marginTop: 20 }}
          disabled={loading}
          onSubmit={ChangeFunc}
          className="button_form"
        >
          {loading ? <Loading /> : "Сменить пароль"}
        </button>
      </form>
    </Modal>
  );
};

export default ChangePassword;
