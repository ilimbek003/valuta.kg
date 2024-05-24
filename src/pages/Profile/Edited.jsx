import React, { useState } from "react";
import Modal from "../../components/UI/Modal/Modal";
import { api } from "../../Api";
import { Alert } from "../../components/UI/alert/alert";
import Loading from "../../components/UI/Loading/Loading";

const Edited = ({
  setModalEditCompanies,
  handleEditProfile,
}) => {
  const [dataCompanies, setDataCompanies] = useState({
    name: "",
    address: "",
    number: "",
    license: "",
    logo: null,
  });
  const [loading, setLoading] = useState(false);
  const handleEditCompanies = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", dataCompanies.name);
      data.append("address", dataCompanies.address);
      data.append("phone", dataCompanies.number);
      data.append("license_num", dataCompanies.license);
      data.append("logo", dataCompanies.logo);
      const response = await api.patch("/exchanger/", data, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.response === true) {
        Alert("success", response.data.massage);
        handleEditProfile();
        setModalEditCompanies(false);
        setLoading(false);
        console.log(response.data);
      } else {
        Alert("error", response.data.massage);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      Alert("Ошибка при отправке данных на сервер:", error);
    }
  };
  return (
    <div>
      <Modal setModal={setModalEditCompanies}>
        <h5>Редактировать данные о компании</h5>
        <form
          style={{ width: 500 }}
          onSubmit={handleEditCompanies}
          className="form_password"
        >
          <div>
            {" "}
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
          <div className="image_box">
            <label className="label_form">Логотип компании</label>
            <div className="image_block">
              <img
                src={
                  dataCompanies.logo && URL.createObjectURL(dataCompanies.logo)
                }
                alt=""
              />
              <div className="absolute">
                <label className="button_form white">
                  Изменить фото
                  <input
                    className="input_form"
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
              <div className="not"></div>
            </div>
          </div>
          <button
            style={{
              marginTop: 20,
            }}
            className="button_form"
            type="submit"
          >
            {loading ? <Loading /> : "Сохранить изменения"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Edited;
