import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const ActiveAds = () => {
  const [auth, setAuth] = useState(false);
  return (
    <div className="detail_block">
      <p className="block_title">Активные объявления</p>
      <div className="div_auth">
        <p className="text">
          Здесь будут появляться активные объявления от компаний
        </p>
      </div>
    </div>
  );
};

export default ActiveAds;
