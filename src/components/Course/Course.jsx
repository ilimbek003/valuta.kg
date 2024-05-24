import React from "react";
import "./Course.css";
import photo from "../../img/course.svg";

const datas = [
  {
    img: photo,
    text: "06.03.2024 12:30",
  },
  {
    img: photo,
    text: "06.03.2024 12:30",
  },
  {
    img: photo,
    text: "06.03.2024 12:30",
  },
  {
    img: photo,
    text: "06.03.2024 12:30",
  },
  {
    img: photo,
    text: "06.03.2024 12:30",
  },
  {
    img: photo,
    text: "06.03.2024 12:30",
  },
];

const Course = () => {
  return (
    <div className="course">
      <div className="container">
        <div>
          <h2 className="title_h1">
            Курсы криптовалют с Моссовета
            <div className="box_text">на 07.03.2024</div>
          </h2>
          <p className="text_p">
            Фотографии курсов криптовалют носят ознакомительный характер и не
            являются основанием для сделки
          </p>
        </div>
        <div className="course_block">
          {datas.slice(0, 6).map((el, id) => (
            <div key={id} className="course_box">
              <img src={el.img} alt="" />
              <p>{el.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course;
