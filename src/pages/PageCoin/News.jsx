import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const News = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="main_news">
      <h2>Последние новости</h2>
      <div className="main_news_block">
        {data.map((el, index) => (
          <NavLink key={index} to={`/news/${el.slug}`}>
            <div className="main_news_box">
              <div className="block_img">
                <img src={el.image} alt="" />
              </div>
              <div className="flex">
                <p className="title">{el.title}</p>
                <div>
                  <p
                    className="text"
                    dangerouslySetInnerHTML={{ __html: el.description }}
                  ></p>
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
  );
};

export default News;
