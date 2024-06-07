import React from "react";
import "./News.css";
import navigate from "../../img/navigate.svg";
import { NavLink, useNavigate } from "react-router-dom";

const News = ({ data }) => {
  const navigation = useNavigate();
  return (
    <div className="main_news news">
      <div className="container">
        <div>
          <img
            onClick={() => navigation(-1)}
            style={{
              width: 45,
              height: 45,
              marginTop: 30,
              marginBottom: 20,
              cursor: "pointer",
            }}
            src={navigate}
            alt=""
          />
        </div>
        <div>
          <h1 className="title_h1">Все новости</h1>
        </div>
        <div className="main_news_block">
          {data.map((el, index) => (
            <NavLink key={index} to={`/news/${el.slug}`}>
              <div className="main_news_box">
                <div className="block_img">
                  <img src={el.image} alt="" />
                </div>
                <div className="flex">
                  <p className="title">{el.title}</p>
                  <p
                    className="text"
                    dangerouslySetInnerHTML={{ __html: el.description }}
                  ></p>
                  <div>
                    <div className="date_and_link">
                      <p className="date">{el.data}</p>
                      <a href="/" target="blank" className="link">
                        {el.link}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
