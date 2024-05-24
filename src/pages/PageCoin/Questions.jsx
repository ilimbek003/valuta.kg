import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Questions = ({ open }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <h3>Вопросы-ответы</h3>
      <div className="accordion_container">
        {open?.question?.map((item, index) => (
          <div>
            {item.detail?.map((el, index) => (
              <div key={index} className="coin_box_accordion">
                <div
                  onClick={() => toggleAccordion(index)}
                  className="between acc"
                >
                  <h4>{el.question}</h4>
                  <IoIosArrowDown className="icon" />
                </div>

                <div
                  className={`accordion ${activeIndex === index ? "open" : ""}`}
                >
                  <p className="acc_text">{el.answer}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Questions;
