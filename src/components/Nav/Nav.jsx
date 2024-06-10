import React, { useEffect, useState } from "react";
import "./Nav.css";
import { api } from "../../Api";
import Slider from "react-slick";
import AverageCourse from "./AverageCourse";
import BestCourse from "./BestCourse";

const Nav = ({ publis }) => {
  const [data, setData] = useState([]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    api.get("/ticker/").then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <div className="nav">
      <div className="container">
        <Slider {...settings}>
          {publis?.map((el, id) => (
            <a href={el.link} target="_blank" key={id} className="slider_box">
              <img className="banner" src={el.publicity} alt="" />
            </a>
          ))}
        </Slider>
        <div className="nav_main">
          <div className="average-course">
            <AverageCourse data={data} />
          </div>
          <div className="best-course">
            <BestCourse data={data} />
          </div>
          <div className="rec">
            {publis &&
              publis?.slice(0, 1).map((el, id) => (
                <a
                  href={el.link}
                  target="_blank"
                  key={id}
                  className="slider_box"
                >
                  <img className="resize" src={el.publicity} alt="" />
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
