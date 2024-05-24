import React from "react";
import star1 from "../../img/Component1.svg";
import star2 from "../../img/Component2.svg";
import phone from "../../img/phone.svg";
import map from "../../img/maping.svg";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
const Tables = ({ handleExchangeClick, bankData, storedExchanges }) => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="blocks-block">
      <div className="slider-container">
        <Slider {...settings}>
          {bankData?.map((el, id) => (
            <div key={id} style={{ margin: "0 20px" }}>
              <div className="grid gap-grid">
                <div className="save-one">
                  <div className="carob lanes">
                    <img className="logos" src={el.logo} alt="" />
                    <div className="gray_texts_flex">
                      <div className="gray_texts">
                        <p
                          className="title"
                          onClick={() =>
                            localStorage.getItem("token")
                              ? navigate(`/exchange-detail/${el.slug}`)
                              : navigate("/login")
                          }
                        >
                          {el.exchanger}
                        </p>
                        <div className="gray_texts_flex_one">
                          <img className="icon" src={phone} alt="" />
                          <p className="gray">{el.phone}</p>
                        </div>
                      </div>
                      <div className="gray_texts_flex_one">
                        <img className="icon" src={map} alt="" />
                        <p className="gray">{el.address}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid_flex-img">
                    <div className="time_el">
                      <p className="time">{el.deadline}</p>
                    </div>
                    <img
                      onClick={() => handleExchangeClick(el)}
                      className="star"
                      src={
                        storedExchanges.some(
                          (exchange) => exchange.id === el.id
                        )
                          ? star2
                          : star1
                      }
                      alt="starred"
                    />
                  </div>
                </div>
                {el.Bitcoin ? (
                  <div className="grid_flex grid-flex-twos">
                    <div className="grid_flex grid-flex-all ">
                      <img src={el.Bitcoin?.img} alt="" />
                      <p>{el.Bitcoin?.code_name}</p>
                    </div>
                    <div className="grid_flex buy-gap">
                      <div>
                        <p className="buys">покупка</p>
                        <p className="chet">${el.Bitcoin?.buy}</p>
                      </div>
                      <div>
                        <p className="buys">продажа</p>
                        <p className="chet">${el.Bitcoin?.sell}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div></div>
                    <div></div>
                  </div>
                )}
                {el.Ethereum ? (
                  <div className="grid_flex grid-flex-twos">
                    <div
                      className="grid_flex grid-flex-all "
                      style={{ margin: "0 " }}
                    >
                      <img src={el.Ethereum?.img} alt="" />
                      <p>{el.Ethereum?.code_name}</p>
                    </div>
                    <div className="grid_flex buy-gap">
                      <div>
                        <p className="chet">${el.Ethereum?.buy}</p>
                      </div>
                      <div>
                        <p className="chet">${el.Ethereum?.sell}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div></div>
                    <div></div>
                  </div>
                )}
                {el.Solana ? (
                  <div className="grid_flex grid-flex-twos">
                    <div
                      className="grid_flex grid-flex-all "
                      style={{ margin: "0 " }}
                    >
                      <img src={el.Solana?.img} alt="" />
                      <p>{el.Solana?.code_name}</p>
                    </div>
                    <div className="grid_flex buy-gap">
                      <div>
                        <p className="chet">${el.Solana?.buy}</p>
                      </div>
                      <div>
                        <p className="chet">${el.Solana?.sell}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div></div>
                    <div></div>
                  </div>
                )}
                {el.Uniswap ? (
                  <div className="grid_flex grid-flex-twos">
                    <div
                      className="grid_flex grid-flex-all "
                      style={{ margin: "0 " }}
                    >
                      <img src={el.Uniswap?.img} alt="" />
                      <p>{el.Uniswap?.code_name}</p>
                    </div>
                    <div className="grid_flex buy-gap">
                      <div>
                        <p className="chet">${el.Uniswap?.buy}</p>
                      </div>
                      <div>
                        <p className="chet">${el.Uniswap?.sell}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div></div>
                    <div></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Tables;
