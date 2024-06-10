import React, { useEffect, useState } from "react";
import "./History.css";
import Change from "../../components/Change/Change";

const History = ({
  dynamic,
  name,
  activeCategoryId,
  setActiveCategoryId,
  handleChart,
}) => {
  useEffect(() => {
    document.title = "Архив криптовалют";
  }, []);
  return (
    <div className="history">
      <div className="container">
        <div style={{ marginTop: 30 }}>
          <h1 className="title_h1">Архив валют</h1>
        </div>
      </div>
      <Change
        dynamic={dynamic}
        none={true}
        name={name}
        setActiveCategoryId={setActiveCategoryId}
        activeCategoryId={activeCategoryId}
        handleChart={handleChart}
      />
    </div>
  );
};

export default History;
