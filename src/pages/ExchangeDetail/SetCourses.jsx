import React, { useEffect, useState } from "react";
import { api } from "../../Api";

const SetCourses = ({ currency }) => {
  const [setCourses, setSetCourses] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      api
        .get("/exchanger/set-course/", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          setSetCourses(response.data);
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
      {setCourses?.set_rates?.map((el) => (
        <div className="detail_box">
          <div className="items">
            <img src={el.logo} alt="" />
            <p className="btc">{el.name}</p>
          </div>
          <p className="big_text">{el.buy}</p>
          <p className="big_text">{el.sell}</p>
          <p className="date">{el.deadline}</p>
        </div>
      ))}
    </div>
  );
};

export default SetCourses;
