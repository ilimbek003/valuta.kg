import React, { useState } from "react";
import "../../components/UI/InputComponent/InputComponent.css";
import more from "../../img/more.svg";
const SuggestionsInput = ({
  value,
  setValue,
  data,
  width,
  setCourseCurency,
  setId,
}) => {
  const [select, setSelect] = useState(false);

  const handleSelects = (el) => {
    setValue(el.text);
    setSelect(false);
    if (el.course) {
      localStorage.setItem("fiat", JSON.stringify(el));
    }
    if (el.buy) {
      if (el.id) {
        localStorage.setItem("ids", JSON.stringify(el.id));
      } else {
        localStorage.setItem("id", "");
      }
    }
    if (el.slug) {
      localStorage.setItem("slug", el.slug);
      setCourseCurency();
    }
  };
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
                  onClick={() => handleSelects(el)}
                  className={`absolute_box ${el.text === value && "add"}`}
                >
                  {el.text ? el.text : el.crypto}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SuggestionsInput;
