import React from "react";
import "./MainNews.css";
import { NavLink, useNavigate } from "react-router-dom";

const MainNews = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="main_news">
      <div className="container">
        <div>
          <h2 className="title_h1">Финансовые новости</h2>
          <p className="text_p">
            Курсы криптовалют, новости банков, новости экономики
          </p>
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
        <button
          onClick={() => navigate("/news")}
          className="button_form news-ones"
        >
          Все новости
        </button>
      </div>
    </div>
  );
};

export default MainNews;
