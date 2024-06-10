import React, { useEffect, useState } from "react";
import { api } from "../../Api";
import { NavLink } from "react-router-dom";

const SetCourses = () => {
  const [setCourses, setSetCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/exchanger/set-course/", {
          headers: { Authorization: `Token ${token}` },
        })
        .then((response) => {
          setSetCourses(response.data);
        })
        .catch((error) => {
          console.error("Error fetching set courses:", error);
        });
    }
  }, []);

  return (
    <div className="detail_block">
      <p className="block_title">Установленные курсы</p>
      <div className="detail_box">
        <div></div>
        <p className="name">покупка</p>
        <p className="name">продажа</p>
        <p className="name">время</p>
      </div>
      {localStorage.getItem("token") ? (
        <div>
          {setCourses?.map((el) => (
            <div className="detail_box" key={el.name}>
              <div className="items">
                <div className="images-img">
                  <img src={el.logo} alt="" />
                </div>
                <p className="btc">{el.crypto}</p>
              </div>
              <p className="big_text">{el.buy}</p>
              <p className="big_text">{el.sell}</p>
              <p className="date">{el.deadline}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="activve-auth">
          <p>
            Тут появятся предложения об обмене криптовалюты. Зарегистрируйтесь,
            чтобы добавить предложения
          </p>
          <div>
            <NavLink to="/login">
              <button className="active-btn-login">Войти</button>
            </NavLink>
            <NavLink to="/register">
              <button>Регистрация</button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetCourses;
