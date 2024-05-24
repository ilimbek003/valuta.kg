import React, { useState } from "react";
import "./ForgotPassword.css";
import Loading from "../../components/UI/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { api } from "../../Api";
import navigateImage from "../../img/navigate.svg";
import photo_auth from "../../img/photo_auth.svg";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/forgot-password/", {
        email,
      });
      if (response.data.response === true) {
        localStorage.setItem("email", email);
        alert(response.data.message, "success");
        navigate("/activation/verify");
      } else {
        if (response.data.message) {
          alert(response.data.message, "error");
        }
        setError(response.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <div className="block">
          <img
            className="absolute"
            onClick={() => navigate(-1)}
            src={navigateImage}
            alt=""
          />
          <form onSubmit={handleSubmit} className="form_forgot">
            <div className="login_form_head">
              <div></div>
              <div>
                <span className="text_center">Забыли пароль?</span>
                <p className="text_gray">
                  Мы отправим код на вашу электронную почту
                </p>
              </div>
            </div>
            <div className="input_box">
              <label className="label_form">Почта</label>
              <input
                className="input_form"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Электронная почта"
              />
              {error.email && <p className="red">{error.email}</p>}
            </div>
            <button
              style={{ marginBottom: 28 }}
              onSubmit={handleSubmit}
              className="button_form"
            >
              {loading ? <Loading color={"#fff"} /> : "Получить код"}
            </button>
          </form>
          <img className="photo_auth" src={photo_auth} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
