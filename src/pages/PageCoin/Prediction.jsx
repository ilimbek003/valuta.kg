import React, { useEffect, useState } from "react";
import fire from "../../img/fire.svg";
import fu from "../../img/fu.svg";
import { api } from "../../Api";
import { Alert } from "../../components/UI/alert/alert";
const Prediction = ({ slug, open, handleCharts }) => {
  const [like, setLike] = useState([]);
  const copyTextToClipboard = (id) => {
    api
      .post(
        `/api/like/${id}/`,
        { id },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data) {
          handleCharts();
          Alert("success", response.data.message);
        }
      });
  };
  const copyTextToClipboard2 = (id) => {
    api
      .post(
        `/api/dislike/${id}/`,
        { id },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      )
      .then((response) => {
        if (response.data) {
          handleCharts();
          Alert("success", response.data.message);
        }
      });
  };

  const handleLike = () => {
    api.get(`/api/like-percentage/${slug}`).then((response) => {
      setLike(response.data);
    });
  };
  const handelDelete = (id) => {
    api.delete(`/api/dislike/${id}`).then((response) => {
      if (response.data.response === true) {
        handleCharts();
        Alert("success", response.data.message);
      }
    });
  };
  useEffect(() => {
    handleLike();
  }, []);

  return (
    <div>
      <div className="coin_box coin-box">
        <h3>Какой ваш прогноз по BTC сегодня?</h3>
        <p className="desc">
          Сегодня сообщество оптимистичного настроено в отношении Биткоин (BTC).
        </p>
        <div className="grid">
          <div
            className={
              like.response === true ? "image_emoji active" : "image_emoji"
            }
            onClick={() =>
              copyTextToClipboard(open?.crypto?.id) || handleLike()
            }
          >
            <img src={fire} alt="" />
            {like.like}
          </div>
          <div
            className={
              like.response === true ? "image_emoji active" : "image_emoji"
            }
            onClick={() =>
              copyTextToClipboard2(open?.crypto?.id) || handleLike()
            }
          >
            <img src={fu} alt="" />
            {like.dislike}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
