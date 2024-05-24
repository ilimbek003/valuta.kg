import React, { useEffect, useState } from "react";
import Modal from "../../components/UI/Modal/Modal";
import { api } from "../../Api";
import Loading from "../../components/UI/Loading/Loading";
import { Alert } from "../../components/UI/alert/alert";

const Accounts = ({
  setModalEditAccount,
  setModalDelete,
  profiles,
  handleEditProfile,
}) => {
  const [dataAccount, setDataAccount] = useState({
    name: "",
    number: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (profiles) {
      setDataAccount({
        ...dataAccount,
        name: profiles?.user?.name || "",
        number: profiles?.user?.phone || "",
        password: profiles?.user?.password || "",
      });
    }
  }, [profiles]);

  useEffect(() => {
    if (profiles) {
      setDataAccount({
        ...dataAccount,
        name: profiles?.name || "",
        number: profiles?.phone || "",
        password: profiles?.password || "",
      });
    }
  }, [profiles]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("first_name", dataAccount.name);
      data.append("phone", dataAccount.number);
      data.append("password", dataAccount.password);
      const response = await api.patch("/auth/change-user/", data, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.response === true) {
        handleEditProfile();
        Alert("success", response.data.message);
        setModalEditAccount(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  };
  return (
    <div>
      <Modal setModal={setModalEditAccount}>
        <h5>Редактировать данные аккаунта</h5>
        <form
          style={{ width: 500 }}
          onSubmit={handleSubmit}
          className="form_password"
        >
          <div className="input_box">
            <label className="label_form">Имя</label>
            <input
              className="input_form"
              value={dataAccount.name}
              onChange={(e) =>
                setDataAccount({ ...dataAccount, name: e.target.value })
              }
              type="text"
              placeholder="ФИО"
              required
            />
          </div>
          <div className="input_box">
            <label className="label_form">Номер телефона</label>
            <input
              className="input_form disablet"
              value={dataAccount.number}
              onChange={(e) =>
                setDataAccount({ ...dataAccount, number: e.target.value })
              }
              type="text"
              disabled={true}
              required
            />
          </div>
          <div className="input_box">
            <label className="label_form">Пароль</label>
            <input
              className="input_form disablet"
              value={dataAccount.password}
              onChange={(e) =>
                setDataAccount({ ...dataAccount, password: e.target.value })
              }
              type="password"
              disabled={true}
              required
            />
          </div>
          <p
            onClick={() => setModalDelete(true) || setModalEditAccount(false)}
            className="text red"
          >
            Удалить аккаунт
          </p>
          <button
            type="submit"
            style={{ marginTop: 20 }}
            className="button_form"
          >
            {loading ? <Loading /> : "Сохранить изменения"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Accounts;
