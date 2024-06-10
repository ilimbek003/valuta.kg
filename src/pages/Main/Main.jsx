import React, { useEffect, useState } from "react";
import "./Main.css";
import Nav from "../../components/Nav/Nav";
import Applications from "../../components/Applications/Applications";
import Сalculator from "../../components/Сalculator/Сalculator";
import MainNews from "../../components/MainNews/MainNews";
import Change from "../../components/Change/Change";
import Table from "../../components/Table/Table";

const Main = ({
  data,
  publis,
  dynamic,
  activeCategoryId,
  setActiveCategoryId,
  handleChart,
  name,
  calculate,
}) => {
  useEffect(() => {
    document.title =
      "Курс валют в Бишкеке, Обмен валюты :: Курс валют в Бишкеке, Курсы Моссовета в Бишкеке";
  });
  return (
    <div className="main">
      <Nav publis={publis} />
      <Table />
      <Applications calculate={calculate} />
      <Сalculator calculate={calculate} />
      <MainNews data={data} />
      <Change
        setActiveCategoryId={setActiveCategoryId}
        activeCategoryId={activeCategoryId}
        handleChart={handleChart}
        name={name}
        dynamic={dynamic}
      />
    </div>
  );
};

export default Main;
