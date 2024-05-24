import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import { api } from "../../Api";
import { Alert } from "../../components/UI/alert/alert";

const DeleteAccount = ({ setModalDelete }) => {
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/api/requests-update/${id}`);
      if (response.data.response === true) {
        Alert("success", response.data.message);
        setModalDelete(false);
      }
    } catch (error) {}
  };
  return (
    <Modal setModal={setModalDelete}>
      <h5>Удалить аккаунт?</h5>
      <p style={{ width: 340, margin: "24px 0" }} className="modal_text">
        Вы уверены, что хотите удалить аккаунт? После удаления все данные
        аккаунта не подлежат восстановлению
      </p>
      <div className="btns">
        <button
          className="button_form off"
          onClick={() => setModalDelete(false)}
        >
          Отмена
        </button>
        <button className="button_form on" onClick={() => handleDelete()}>Удалить</button>
      </div>
    </Modal>
  );
};

export default DeleteAccount;
