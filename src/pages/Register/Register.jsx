import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "../../components/UI/Loading/Loading";
import { api } from "../../Api";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import navigateImage from "../../img/navigate.svg";
import photo_auth from "../../img/photo_auth.svg";
import lodo from "../../img/logo.png";
import { Alert } from "../../components/UI/alert/alert";

const Register = () => {
  const { name } = useParams();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [inputData, setInputData] = useState({
    email: "",
    first_name: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (inputData.password === inputData.confirm_password) {
      const dataNew = {
        user: localStorage.getItem("user"),
        email: inputData.email,
        first_name: inputData.first_name,
        password: inputData.password,
        confirm_password: inputData.confirm_password,
      };
      try {
        const response = await api.post("/auth/register/", dataNew);
        if (response.data.response === true) {
          localStorage.setItem("email", inputData.email);
          navigate("/activation");
          Alert("success", response.data.message);
          console.log(inputData.email);
        } else {
          if (response.data.message) {
            Alert("error", response.data.message);
          }
          setError(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
      alert("Пароли не совпадают", "error");
    }
  };

  return (
    <div className="container">
      <div className="form">
        <div className="authentication-css authentication-grid">
          <img
            className="block-img-left"
            onClick={() => navigate(-1)}
            src={navigateImage}
            alt=""
          />
          <img className="lodo" src={lodo} alt="" />
          <div className="with"></div>
        </div>
        <div className="block">
          <form onSubmit={handleSubmit} className="register_from">
            <div className="login_form_head">
              <img
                className="none-img"
                onClick={() => navigate(-1)}
                src={navigateImage}
                alt=""
              />
              <span className="text_center">
                Регистрация - {name === "buyer" && "Покупатель"}
                {name === "exchanger" && "Обменник"}
              </span>
            </div>
            <div className="register_grid">
              <div className="input_box">
                <label className="label_form">Имя</label>
                <input
                  className="input_form"
                  type="text"
                  value={inputData.first_name}
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      first_name: e.target.value,
                    })
                  }
                  name="last_name"
                  placeholder="Видно всем участникам"
                  required
                />
                {error.first_name && <p className="red">{error.first_name}</p>}
              </div>
              <div className="input_box">
                <label className="label_form">Почта</label>
                <input
                  className="input_form"
                  onChange={(e) =>
                    setInputData({ ...inputData, email: e.target.value })
                  }
                  value={inputData.email}
                  type="text"
                  placeholder="Электронная почта"
                  required
                />
                {error.email && <p className="red">{error.email}</p>}
              </div>
              <div className="input_box">
                <label className="label_form">Пароль</label>
                <input
                  className="input_form"
                  onChange={(e) =>
                    setInputData({ ...inputData, password: e.target.value })
                  }
                  value={inputData.password}
                  type={visible ? "text" : "password"}
                  placeholder="Пароль"
                  required
                />
                <span
                  className="span-icon"
                  onClick={() => setVisible(!visible)}
                >
                  {" "}
                  {visible ? <FaEye /> : <FaEyeSlash />}{" "}
                </span>
                {error.confirm_password && (
                  <p className="red">{error.confirm_password}</p>
                )}
                {error.non_field_errors && (
                  <p className="red">{error.non_field_errors}</p>
                )}
              </div>
              <div className="input_box hh">
                <label className="label_form"> Повторить пороль </label>
                <input
                  className="input_form"
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      confirm_password: e.target.value,
                    })
                  }
                  value={inputData.confirm_password}
                  type={visible2 ? "text" : "password"}
                  placeholder="Повторите пороль"
                  required
                />
                <span
                  className="span-icon"
                  onClick={() => setVisible2(!visible2)}
                >
                  {" "}
                  {visible2 ? <FaEye /> : <FaEyeSlash />}{" "}
                </span>
              </div>
            </div>
            <div className="all-submit">
              <button
                style={{ marginBottom: 20 }}
                disabled={loading}
                className="button_form"
                onSubmit={handleSubmit}
              >
                {loading ? <Loading color={"#fff"} /> : "Зарегистрироваться"}
              </button>
            </div>
            <p
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: 400,
                color: "var(--gray)",
              }}
            >
              Уже есть аккаунт ?{" "}
              <NavLink
                style={{
                  marginLeft: 5,
                  textDecoration: "none",
                  color: "var(--blue)",
                  fontSize: 14,
                  fontWeight: 400,
                }}
                to="/login"
              >
                Войти
              </NavLink>
            </p>
          </form>
          <img className="photo_auth" src={photo_auth} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Register;
