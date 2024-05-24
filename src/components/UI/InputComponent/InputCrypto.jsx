import React, { useState } from "react";
import "./InputComponent.css";
import more from "../../../img/more.svg";

const InputCrypto = ({ value, setValue, data, width }) => {
  const [select, setSelect] = useState(false);
  return (
    <div className="sss">
      <div
        style={{ width: width }}
        onClick={() => setSelect(true)}
        className={`input_component ${select && "add"} `}
      >
        <p className="text_input">{value}</p>
        <img className={`image ${select && "add"}`} src={more} alt="" />
      </div>
      <div className="relative">
        {select && (
          <>
            <div
              onClick={() => setSelect(false)}
              className="not_found_data"
            ></div>
            <div style={{ width: width }} className="select">
              {data.map((el, id) => (
                <div
                  key={id}
                  onClick={() =>
                    setValue(el.text) ||
                    setSelect(false) ||
                    (el.course &&
                      localStorage.setItem("fiat", JSON.stringify(el))) ||
                    (el.buy &&
                      el.sell &&
                      localStorage.setItem("curency", JSON.stringify(el))) ||
                    localStorage.setItem("crypto_id", JSON.stringify(el.id))
                  }
                  className={`absolute_box ${el.text === value && "add"}`}
                >
                  {el.text}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InputCrypto;
