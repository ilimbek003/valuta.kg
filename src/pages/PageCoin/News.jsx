import React from "react";
import { useNavigate } from "react-router-dom";

const News = ({ data }) => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Последние новости</h2>
      <div className="news_block">
        {data.map((el, index) => (
          <div
            key={index}
            onClick={() => navigate(`/news/${el.slug}`)}
            className="news_box"
          >
            <img src={el.image} alt="" />
            <div className="flex">
              <p className="titlees">{el.title}</p>
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
        ))}
      </div>
    </>
  );
};

export default News;
