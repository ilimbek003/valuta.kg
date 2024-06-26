import React, { useEffect, useState } from "react";
import "./NewsDetail.css";
import { useParams } from "react-router-dom";
import { api } from "../../Api";

const NewsDetail = () => {
  const { slug } = useParams();
  const [news, setNews] = useState([]);
  useEffect(() => {
    api
      .get(`/news/${slug}`)
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (news) {
      document.title = news.news?.title;

      const setMetaTag = (name, content) => {
        let metaTag = document.querySelector(`meta[name="${name}"]`);
        if (!metaTag) {
          metaTag = document.createElement("meta");
          metaTag.name = name;
          document.head.appendChild(metaTag);
        }
        metaTag.content = content;
      };

      setMetaTag("og:title", news.news?.title);
      setMetaTag("og:image", news.news?.image);
      setMetaTag("title", news.news?.title);
      setMetaTag("description", news.news?.description);
      setMetaTag("og:description", news.news?.description);
      setMetaTag("keywords", news.news?.description.replaceAll(" ", ", "));
    }
  }, [news]);
  return (
    <div className="news_detail">
      <div className="container">
        <div className="news_detail_block">
          <div>
            <h1 className="title-news-detail">{news.news?.title}</h1>
            <div className="date">
              <p>{news.news?.data}</p>
              <p>{news.news?.user}</p>
            </div>
            <img className="image" src={news.news?.image} alt="" />
            <p
              className="desc"
              dangerouslySetInnerHTML={{ __html: news.news?.description }}
            ></p>
          </div>
          <div>
            <div className="news_block">
              <p className="title-news-p">Еще новости</p>
              {news.similar_news?.slice(0, 3).map((el, index) => (
                <a href={`/news/${el.slug}`} className="a">
                  <div key={index} className="news_box">
                    <img src={el.image} alt="" />
                    <div className="flex">
                      <p className="title">{el.title}</p>
                      <div>
                        <p
                          className="text"
                          dangerouslySetInnerHTML={{
                            __html: news.news?.description,
                          }}
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
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
