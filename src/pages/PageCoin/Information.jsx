import React from "react";
import { FaGithub } from "react-icons/fa";
import copy_icon from "../../img/copy.svg";
import { Alert } from "../../components/UI/alert/alert";

const Information = ({ open }) => {
  const copyTextToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      Alert("success", "Текст успешно скопирован в буфер обмена!");
    } catch (err) {
      console.error("Ошибка:", err);
    }
  };
  return (
    <>
      <h3>Информация</h3>
      <div className="column">
        {open.information?.website ? (
          <div className="between">
            <p className="text">Веб-сайт</p>
            <div className="flex">
              <a
                href={open.information?.website}
                target="blank"
                className="texting"
              >
                {open.information?.website}
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
        {open.information?.observers ? (
          <div className="between">
            <p className="text">Обозреватели</p>
            <div className="flex">
              <a
                href={open.information?.observers}
                target="blank"
                className="texting"
              >
                {open.information?.observers}
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
        {open.information?.purses ? (
          <div className="between">
            <p className="text">Кошельки</p>
            <div className="flex">
              <a
                href={open.information?.purses}
                target="blank"
                className="texting"
              >
                {open.information?.purses}
              </a>
              {/* <div className="texting">
                        Ledger <IoIosArrowDown className="icon" />{" "}
                      </div> */}
            </div>
          </div>
        ) : (
          ""
        )}
        {open.information?.сommunity ? (
          <div className="between">
            <p className="text">Сообщество</p>
            <div className="flex">
              {/* <img className="flexbox" src={facebook} alt="" />
                      <img className="flexbox" src={twitter} alt="" /> */}
              <a
                href={open.information?.сommunity}
                target="blank"
                className="texting"
              >
                {open.information?.сommunity}
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
        {open.information?.platform_search ? (
          <div className="between">
            <p className="text">Поиск на платформах</p>
            <div className="flex">
              {/* <img className="flexbox" src={twitter} alt="" /> */}
            </div>
            <a
              href={open.information?.platform_search}
              target="blank"
              className="texting"
            >
              {open.information?.platform_search}
            </a>
          </div>
        ) : (
          ""
        )}

        {open.information?.source_code ? (
          <div className="between">
            <p className="text">Исходный код</p>
            <div className="flex">
              <a
                href={open.information?.source_code}
                target="blank"
                className="texting"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
        {open.information?.api_id ? (
          <div className="between">
            <p className="text">Идентификатор API</p>
            <div className="flex">
              <div
                className="texting"
                onClick={() => copyTextToClipboard(open.information?.api_id)}
              >
                {/* {open.information?.api_id} */}
                <img className="icon" src={copy_icon} alt="" />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {open.information?.categories ? (
          <div className="between">
            <p className="text">Категории</p>
            <div className="flex">
              <a
                href={open.information?.categories}
                target="blank"
                className="texting"
              >
                {open.information?.categories}
              </a>
              {/* <div className="texting">
                        еще 3 <IoIosArrowDown className="icon" />{" "}
                      </div> */}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Information;
