import React from "react";
import "./Modal.css";
import closeImage from "../../../img/close.svg";

const Modal = ({ close, setModal, children }) => {
  return (
    <div className="fixet_modal">
      <div onClick={() => setModal(false)} className="modal_not"></div>
      <div className="modal">
        {close ? (
          ""
        ) : (
          <img
            onClick={() => setModal(false)}
            className="close"
            src={closeImage}
            alt=""
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
