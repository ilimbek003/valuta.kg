import React, { useEffect, useState } from "react";
import Modal from "../../components/UI/Modal/Modal";
import { api } from "../../Api";
import timoutImage from "../../img/timout.svg";

const ModalDashbosrd = ({
  count,
  add_photo,
  setCount,
  setEmpty,
  timoutImage,
  setVerification,
  dataCompanies,
  setDataCompanies,
}) => {
  const [verificationValue, setVerificationValue] = useState({
    logo: null,
  });
  useEffect(() => {
    if (dataCompanies.logo) {
      const image = dataCompanies.logo;
      const formData = new FormData();
      formData.append("logo", image);
      const dash = {
        logo: image,
      };
      console.log(dash);
    }
  }, [dataCompanies]);
  const sendDataToServer = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("logo", verificationValue.logo);
      formData.append("name", dataCompanies.name);
      formData.append("description", verificationValue.desc);
      formData.append("address", dataCompanies.address);
      formData.append("phone", dataCompanies.number);
      formData.append("license_num", dataCompanies.license);

      const response = await api.post("/exchanger/", formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Ответ сервера:", response);
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error);
    }
  };

  return (
    <div>
      <Modal close={true} setModal={setEmpty}>
        {count.third ? (
          <h5>Ожидание проверки</h5>
        ) : (
          <>
            <h5>Заполните данные о компании</h5>
            <div className="verification_block">
              <div className="verification_box active">
                1<p className="absolute_text active">Информация</p>
              </div>
              <div className="line active"></div>
              <div className={`verification_box ${count.first && "active"}`}>
                2{" "}
                <p className={`absolute_text ${count.first && "active"}`}>
                  Данные
                </p>
              </div>
              <div className={`line ${count.first && "active"}`}></div>
              <div className={`verification_box ${count.second && "active"}`}>
                3{" "}
                <p className={`absolute_text ${count.second && "active"}`}>
                  Верификация
                </p>
              </div>
            </div>
          </>
        )}
        {count.first ? (
          count.second ? (
            count.third ? (
              <form style={{ width: 360 }} className="form_password">
                <div className="timout">
                  <img src={timoutImage} alt="" />
                  <p className="text">
                    Ваш аккаунт находится на стадии проверки. Ожидайте
                    потверждение верификации
                  </p>
                </div>
                <button
                  onClick={() => setVerification(false)}
                  style={{
                    marginTop: 20,
                  }}
                  className="button_form"
                >
                  Поянтно
                </button>
              </form>
            ) : (
              <form
                style={{ width: 850 }}
                onSubmit={sendDataToServer}
                className="form_password"
              >
                <h1 onClick={() => setCount({ ...count, third: true })}>
                  verification
                </h1>

                <button
                  style={{
                    marginTop: 20,
                  }}
                  type="submit"
                  className="button_form"
                >
                  Далее
                </button>
              </form>
            )
          ) : (
            <form style={{ width: 850 }} className="form_password">
              <div className="grid">
                <div>
                  <div className="input_box">
                    <label className="label_form">Адрес</label>
                    <input
                      className="input_form"
                      value={dataCompanies.address}
                      onChange={(e) =>
                        setDataCompanies({
                          ...dataCompanies,
                          address: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Адрес"
                      required
                    />
                  </div>
                  <div className="input_box">
                    <label className="label_form">Номер телефона</label>
                    <input
                      className="input_form"
                      value={dataCompanies.number}
                      onChange={(e) =>
                        setDataCompanies({
                          ...dataCompanies,
                          number: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Номер телефона"
                      required
                    />
                  </div>
                  <div className="input_box">
                    <label className="label_form">Лицензия</label>
                    <input
                      className="input_form"
                      value={dataCompanies.license}
                      onChange={(e) =>
                        setDataCompanies({
                          ...dataCompanies,
                          license: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Лицензия"
                      required
                    />
                  </div>
                </div>
                <div>
                  <div style={{ margin: 0 }} className="grid">
                    <div className="image_box">
                      <label className="label_form">Логотип компании</label>
                      <div style={{ height: 235 }} className="image_block">
                        <label style={{ width: "100%", height: "100%" }}>
                          {verificationValue.logo ? (
                            <img
                              src={
                                verificationValue.logo &&
                                URL.createObjectURL(verificationValue.logo)
                              }
                              alt=""
                            />
                          ) : (
                            <div className="empty_img">
                              <img src={add_photo} alt="" />
                              <div>
                                <div className="button_form white">
                                  + Загрузить фото
                                </div>
                              </div>
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) =>
                              setVerificationValue({
                                ...verificationValue,
                                logo:
                                  event.target.files && event.target.files[0],
                              })
                            }
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="image_box">
                      <label className="label_form">Логотип компании</label>
                      <div style={{ height: 235 }} className="image_block">
                        <label style={{ width: "100%", height: "100%" }}>
                          {verificationValue.logo ? (
                            <img
                              src={
                                verificationValue.logo &&
                                URL.createObjectURL(verificationValue.logo)
                              }
                              alt=""
                            />
                          ) : (
                            <div className="empty_img">
                              <img src={add_photo} alt="" />
                              <div>
                                <div className="button_form white">
                                  + Загрузить фото
                                </div>
                              </div>
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) =>
                              setVerificationValue({
                                ...verificationValue,
                                logo:
                                  event.target.files && event.target.files[0],
                              })
                            }
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setCount({ ...count, second: true })}
                style={{
                  marginTop: 20,
                }}
                className="button_form"
              >
                Далее
              </button>
            </form>
          )
        ) : (
          <form style={{ width: 850 }} className="form_password">
            {" "}
            <div className="grid">
              {" "}
              <div>
                <div className="input_box">
                  <label className="label_form">Название компании</label>
                  <input
                    className="input_form"
                    value={dataCompanies.name}
                    onChange={(e) =>
                      setDataCompanies({
                        ...dataCompanies,
                        name: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Название компании"
                    required
                  />
                </div>
                <div className="image_box">
                  <label className="label_form">Логотип компании</label>
                  <div className="image_block">
                    <label style={{ width: "100%", height: "100%" }}>
                      {dataCompanies.logo ? (
                        <img
                          src={
                            dataCompanies.logo &&
                            URL.createObjectURL(dataCompanies.logo)
                          }
                          alt=""
                        />
                      ) : (
                        <div className="empty_img">
                          <img src={add_photo} alt="" />
                          <div>
                            <div className="button_form white">
                              + Загрузить фото
                            </div>
                          </div>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                          setDataCompanies({
                            ...dataCompanies,
                            logo: event.target.files && event.target.files[0],
                          })
                        }
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div style={{ height: "100%" }} className="input_box">
                <label className="label_form">
                  Условия сделки (до 500 символов)
                </label>
                <textarea
                  style={{ height: "100%" }}
                  className="input_form"
                  value={verificationValue.desc}
                  onChange={(e) =>
                    setVerificationValue({
                      ...verificationValue,
                      desc: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Напишите несколько предложений о вашей компании"
                  required
                />
              </div>
            </div>
            <button
              onClick={() => setCount({ ...count, first: true })}
              style={{
                marginTop: 20,
              }}
              className="button_form"
            >
              Далее
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default ModalDashbosrd;
