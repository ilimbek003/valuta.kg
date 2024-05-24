import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./Change.css";
import ChartLoader from "../UI/ChartLoader/ChartLoader";

const Change = ({
  dynamic,
  none,
  activeCategoryId,
  setActiveCategoryId,
  handleChart,
  name,
}) => {
  const [isChartsLoaded, setChartsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setChartsLoaded(true);
    };
    fetchData();
  }, []);
  const handleCategoryClick = (id) => {
    setActiveCategoryId(id);
  };

  return (
    <div style={{ marginTop: none ? 30 : 130 }} className="change">
      <div className="container">
        <div>
          <h2 style={{ fontSize: none ? 24 : 30 }} className="title_h1">
            Изменение курсов криптовалюты в Бишкеке
          </h2>
          <p className="text_p">
            Для того, чтобы получить больше информации о изменениях курсов валют
            Вы можете просмотреть наш
            <a href="/" target="blank" className="link">
              Архив
            </a>
            .
          </p>
        </div>
        <div className="change_block">
          <div className="category">
            {name?.map((el) => (
              <div>
                <div
                  className={`category_box ${
                    el.id === activeCategoryId ? "active" : ""
                  }`}
                  onClick={() =>
                    handleCategoryClick(el.id) || handleChart(el.id)
                  }
                >
                  {el.name}
                </div>
              </div>
            ))}
          </div>
          <div className="chart">
            <div className="stacks_block one-stack">
              {isChartsLoaded ? (
                <Chart
                  options={{
                    chart: {
                      type: "area",
                    },

                    stroke: {
                      curve: "smooth",
                      width: 4,
                      colors: ["red"],
                    },
                    fill: {
                      colors: ["red"],
                    },
                    dataLabels: { enabled: false },
                  }}
                  series={[
                    {
                      name: "Series 1",
                      data:
                        dynamic?.hours && dynamic?.hours
                          ? dynamic?.hours?.map((el) => el.sell_price)
                          : [],
                    },
                  ]}
                  width="100%"
                  height="300px"
                  type="area"
                />
              ) : (
                <div className="not_chart">
                  <ChartLoader />
                </div>
              )}
            </div>
            <div className="stacks_block two-stack ">
              {isChartsLoaded ? (
                <Chart
                  options={{
                    chart: {
                      type: "area",
                    },

                    stroke: {
                      curve: "smooth",
                      width: 4,
                      colors: ["red"],
                    },
                    fill: {
                      colors: ["red"],
                    },
                    dataLabels: { enabled: false },
                    dataLabels: { enabled: false },
                    legend: { show: false },
                    xaxis: { labels: { show: false } },
                  }}
                  series={[
                    {
                      name: "Series 1",
                      data:
                        dynamic?.hours && dynamic?.hours
                          ? dynamic?.hours?.map((el) => el.sell_price)
                          : [],
                    },
                  ]}
                  width="100%"
                  height="300px"
                  type="area"
                />
              ) : (
                <div className="not_chart">
                  <ChartLoader />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Change;
