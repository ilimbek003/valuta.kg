import React from "react";
import star1 from "../../img/Component1.svg";
import star2 from "../../img/Component2.svg";
import phone from "../../img/phone.svg";
import map from "../../img/maping.svg";

const FavoritesList = ({ list, starredIds, handleStar, handleStarDelete }) => {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <div>
      {list?.exchanger?.map((el, index) => (
        <div key={index} className="grid">
          <div className="save">
            {isAuthenticated ? (
              localStorage.getItem(`star${el.id}`) ? (
                <img
                  onClick={() => {
                    handleStarDelete(el.id, !starredIds[el.id]);
                    localStorage.removeItem(`star${el.id}`);
                  }}
                  className="star"
                  src={star2}
                  alt="unstarred"
                />
              ) : (
                <img
                  onClick={() => {
                    handleStar(el.id, !starredIds[el.id]);
                    localStorage.setItem(`star${el.id}`, el.id);
                  }}
                  className="star"
                  src={star1}
                  alt="starred"
                />
              )
            ) : (
              <img
                onClick={() => {
                  handleStar(el.id, !starredIds[el.id]);
                  localStorage.setItem(`star${el.id}`, el.id);
                }}
                className="star"
                src={star1}
                alt="starred"
              />
            )}
            <div className="carob">
              <img className="logos" src={el.logo} alt="" />
              <div className="gray_texts_flex">
                <div className="gray_texts">
                  <p className="title">{el.exchanger}</p>
                  <div className="gray_texts_flex_one">
                    <img className="icon" src={phone} alt="" />
                    <p className="gray">{el.phone}</p>
                  </div>
                </div>
                <div className="gray_texts_flex_one" style={{ width: " 60%" }}>
                  <img className="icon" src={map} alt="" />
                  <p className="gray">{el.address}</p>
                </div>
              </div>
            </div>
          </div>
          {el.Bitcoin ? (
            <div className="grid_flex">
              <div>
                <p className="chet">{el.Bitcoin.buy}</p>
              </div>
              <div>
                <p className="chet">{el.Bitcoin.sell}</p>
              </div>
            </div>
          ) : (
            <div>
              <div></div>
              <div></div>
            </div>
          )}
          {el.Ethereum ? (
            <div className="grid_flex">
              <div>
                <p className="chet">{el.Ethereum.buy}</p>
              </div>
              <div>
                <p className="chet" style={{ margin: "0 0 0 20px" }}>
                  {el.Ethereum.sell}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div></div>
              <div></div>
            </div>
          )}
          {el.Solana ? (
            <div className="grid_flex">
              <div>
                <p className="chet">{el.Bitcoin.buy}</p>
              </div>
              <div>
                <p className="chet">{el.Bitcoin.sell}</p>
              </div>
            </div>
          ) : (
            <div>
              <div></div>
              <div></div>
            </div>
          )}
          <div className="time_el">
            <p className="time">{el.deadline}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
