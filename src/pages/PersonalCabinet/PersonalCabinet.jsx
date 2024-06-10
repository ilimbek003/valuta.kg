import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Profile from "../Profile/Profile";
import Favorites from "../Favorites/Favorites";
import AddCoin from "../AddCoin/AddCoin";
import UpDateCoin from "../UpDateCoin/UpDateCoin";
import Cabinet from "../Cabinet/Cabinet";
import PostApplication from "../PostApplication/PostApplication";
import ChangePostApplication from "../ChangePostApplication/ChangePostApplication";
import ExchangeBureaus from "../ExchangeBureaus/ExchangeBureaus";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { api } from "../../Api";

const PersonalCabinet = ({ calculate }) => {
  const [profiles, setProfiles] = useState([]);
  const handleEditProfile = () => {
    api
      .get(`/exchanger/profile/`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setProfiles(response.data);
      });
  };

  useEffect(() => {
    handleEditProfile();
  }, []);
  return (
    <div>
      <Routes>
        <Route
          path="/home"
          element={
            <Profile
              profiles={profiles}
              handleEditProfile={handleEditProfile}
            />
          }
        />
        <Route path="/favorites" element={<Favorites />} />
        <Route
          path="/add-coin"
          element={
            <AddCoin
              calculate={calculate}
              handleEditProfile={handleEditProfile}
            />
          }
        />
        <Route
          path="/up-date-coin"
          element={
            <UpDateCoin
              calculate={calculate}
              handleEditProfile={handleEditProfile}
            />
          }
        />
        <Route
          path="/cabinet"
          element={
            <Cabinet
              profiles={profiles}
              handleEditProfile={handleEditProfile}
            />
          }
        />
        <Route
          path="/post-application"
          element={<PostApplication calculate={calculate} />}
        />
        <Route
          path="/change-post-application"
          element={<ChangePostApplication />}
        />
        <Route path="/exchange-bureaus" element={<ExchangeBureaus />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default PersonalCabinet;
