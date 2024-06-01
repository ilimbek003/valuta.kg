import { useEffect, useState } from "react";
import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main/Main";
import ApplicationsDetails from "./pages/ApplicationsDetails/ApplicationsDetails";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Activation from "./pages/Activation/Activation";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

import Choice from "./pages/Choice/Choice";
import News from "./pages/News/News";
import NewsDetail from "./pages/NewsDetail/NewsDetail";
import History from "./pages/History/History";

import ExchangeBureaus from "./pages/ExchangeBureaus/ExchangeBureaus";
import ExchangeDetail from "./pages/ExchangeDetail/ExchangeDetail";
import PageCoin from "./pages/PageCoin/PageCoin";
import Cryptocurrencies from "./pages/Cryptocurrencies/Cryptocurrencies";

import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { api } from "./Api";
import PersonalCabinet from "./pages/PersonalCabinet/PersonalCabinet";

function App() {
  const location = useLocation();
  useEffect(() => {
    handleScroll();
  }, [location]);
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to="/login" replace />;
  };
  const [data, setData] = useState([]);
  const [publis, setPublis] = useState([]);
  const [dynamic, setDynamic] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(2);
  const [name, setName] = useState([]);
  const [calculate, setCalculate] = useState([]);
  useEffect(() => {
    api.get("/crypto/сalculate/").then((response) => {
      setCalculate(response.data);
    });
  }, []);

  useEffect(() => {
    api.get("/crypto-name").then((response) => {
      setName(response.data);
    });
  }, []);

  const handleChart = (id = null) => {
    if (!id) {
      api.get(`/dynamic/${activeCategoryId}`).then((response) => {
        setDynamic(response.data);
      });
    } else {
      api.get(`/dynamic/${id}`).then((response) => {
        setDynamic(response.data);
      });
    }
  };
  useEffect(() => {
    handleChart();
  }, []);
  useEffect(() => {
    api.get("/news").then((response) => {
      setData(response.data);
    });
  }, []); 
  useEffect(() => {
    api.get("/public").then((response) => {
      setPublis(response.data);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              data={data}
              publis={publis}
              dynamic={dynamic}
              setActiveCategoryId={setActiveCategoryId}
              activeCategoryId={activeCategoryId}
              handleChart={handleChart}
              name={name}
              calculate={calculate}
            />
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Choice />} />
        <Route path="register/:name" element={<Register />} />
        <Route path="activation" element={<Activation />} />
        <Route path="activation/:verify" element={<Activation />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="news" element={<News data={data} />} />
        <Route path="news/:slug" element={<NewsDetail />} />
        <Route path="applications/:user_id" element={<ApplicationsDetails />} />
        <Route path="exchange-bureaus" element={<ExchangeBureaus />} />
        <Route
          path="exchange-detail/:slug"
          element={<ExchangeDetail dynamic={dynamic} />}
        />
        <Route path="cryptocurrencies" element={<Cryptocurrencies />} />
        <Route path="page-coin/:slug" element={<PageCoin data={data} />} />
        <Route
          path="cryptocurrency-archive"
          element={
            <History
              dynamic={dynamic}
              name={name}
              setActiveCategoryId={setActiveCategoryId}
              activeCategoryId={activeCategoryId}
              handleChart={handleChart}
            />
          }
        />
        <Route
          path="dashboard/*"
          element={<PersonalCabinet calculate={calculate} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
