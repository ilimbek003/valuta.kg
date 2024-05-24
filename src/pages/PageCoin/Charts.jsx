import React, { useState } from "react";
import Chart from "react-apexcharts";
import ChartLoader from "../../components/UI/ChartLoader/ChartLoader";
const data = [
  {
    id: 1,
    name: "24ч",
    title: "24_hours",
  },
  {
    id: 2,
    name: "7д",
    title: "1_week",
  },
  {
    id: 3,
    name: "3м",
    title: "3_month",
  },
  {
    id: 4,
    name: "1г",
    title: "1_year",
  },
];
const Charts = ({
  open,
  isChartsLoaded,
  setView,
  setNews,
  view,
  news,
  setOpen2,
  handleCharts,
}) => {
  const [activeId, setActiveId] = useState(1);
  const handleChart = (title, id) => {
    setOpen2(title);
    setActiveId(id);
  };
  return (
    <div>
      <div className="between_carts">
        <div className="btns">
          <button
            onClick={() => {
              setView(true);
              setNews(false);
            }}
            className={`btn ${view && "active"}`}
          >
            Обзор
          </button>
        </div>
        <div>
          {data.map((el) => (
            <button
              onClick={() => {
                handleChart(el.title, el.id) || handleCharts();
              }}
              className={`btn_chart ${el.id === activeId ? "active_one" : ""}`}
            >
              {el.name}
            </button>
          ))}
        </div>
      </div>
      {isChartsLoaded ? (
        <Chart
          options={{
            chart: {
              type: "area",
              toolbar: {
                show: false,
              },
              zoom: {
                enabled: false,
              },
            },

            stroke: {
              curve: "smooth",
              width: 4,
              colors: ["red"],
              opacity: 0.3,
            },
            grid: {
              xaxis: { lines: { show: false } },
              yaxis: {
                lines: {
                  show: false,
                },
              },
            },
            fill: { colors: ["red"] },
            dataLabels: { enabled: false },
            legend: { show: false },
            xaxis: { labels: { show: false } },
          }}
          series={[
            {
              name: "Series 1",
              data:
                open.crypto?.rates && open.crypto?.rates?.hours
                  ? open.crypto?.rates?.hours.map((el) => el.buy_price)
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
  );
};

export default Charts;
