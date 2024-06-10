import React, { useState } from "react";
import star1 from "../../img/Component1.svg";
import star2 from "../../img/Component2.svg";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { api } from "../../Api";
import { Alert } from "../../components/UI/alert/alert";
import { useNavigate } from "react-router-dom";

const Crypto = ({ open }) => {
  const navigate = useNavigate();
  const [starredIds, setStarredIds] = useState({});

  const handleStar = (id) => {
    api
      .post(
        `/api/star/crypto/${id}/`,
        { id },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.response === true) {
          Alert("success", response.data.message);
          setStarredIds((prevIds) => ({ ...prevIds, [id]: true }));
        }
      });
  };

  const handleDelete = (id) => {
    api
      .delete(`/api/star/crypto/${id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.response === true) {
          Alert("success", response.data.message);
          const { [id]: removedId, ...restIds } = starredIds;
          setStarredIds(restIds);
        }
      });
  };

  const min = parseInt(open.crypto?.rates?.min_price);
  const max = parseInt(open.crypto?.rates?.max_price);
  const count = parseInt(open.crypto?.buy);
  const range = max - min;
  const percentage = ((count - min) / range) * 100;

  return (
    <div className="coin_box coin-box">
      <div className="between">
        <div className="flex">
          <div className="image-img">
            <img src={open.crypto?.img} alt="" />
          </div>
          <p className="title">{open.crypto?.name}</p>
        </div>
        <div className="flex">
          <p className="text g">{open.crypto?.count_rates}</p>
          {localStorage.getItem("token") ? (
            <div>
              {localStorage
                .getItem(`stars${open?.crypto?.id}`)
                ?.includes(open?.crypto?.id) ? (
                <img
                  onClick={() =>
                    handleDelete(
                      open?.crypto?.id,
                      !starredIds[open?.crypto?.id]
                    ) ||
                    localStorage.removeItem(
                      `stars${open?.crypto?.id}`,
                      open?.crypto?.id
                    )
                  }
                  className="star"
                  src={star2}
                  alt=""
                />
              ) : (
                <img
                  onClick={() => {
                    handleStar(open.crypto.id, !starredIds[open?.crypto?.id]);
                    localStorage.setItem(
                      `stars${open?.crypto?.id}`,
                      open?.crypto?.id
                    );
                  }}
                  className="star"
                  src={star1}
                  alt=""
                />
              )}
            </div>
          ) : (
            <img
              onClick={() => navigate("/login")}
              className="star1"
              src={star1}
              alt=""
            />
          )}
        </div>
      </div>
      <div className="price_block">
        <p className="price">{open.crypto?.buy}</p>
        <p className={open.crypto?.difference >= 0 ? "green_text" : "red_text"}>
          {open.crypto?.difference >= 0 ? (
            <TiArrowSortedUp color="green" size={26} />
          ) : (
            <TiArrowSortedDown color="red" size={26} />
          )}
          <p>{open.crypto?.difference} %</p>
        </p>
      </div>
      <div className="save_block">
        <div className="flex">
          <p className="text g">
            {open.crypto?.volume} {open.crypto?.name}
          </p>
        </div>
        <div className="pris">
          <div style={{ width: `${percentage}%` }} className="renge"></div>
        </div>
        <div className="between">
          <p className="bold">{open.crypto?.rates?.min_price}</p>
          <p className="bold">за 24 часа</p>
          <p className="bold">{open.crypto?.rates?.max_price}</p>
        </div>
      </div>
    </div>
  );
};

export default Crypto;
