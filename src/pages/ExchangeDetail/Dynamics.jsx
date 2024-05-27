import React, { useEffect, useState } from "react";
import ChartLoader from "../../components/UI/ChartLoader/ChartLoader";
import Chart from "react-apexcharts";

const Dynamics = ({ currency }) => {
  const [isChartsLoaded, setChartsLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setChartsLoaded(true);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h3>Динамика изменения курсов криптовалют в MSC</h3>
      <div className="block_save">
        <div className="stacks_block">
          {currency.rates &&
            Object.keys(currency.rates).map((cryptoName) => (
              <div key={cryptoName}>
                <h4 className="cryptoName">{cryptoName}</h4>
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
                        data: currency.rates[cryptoName].map(
                          (el) => el.buy_price
                        ),
                      },
                    ]}
                    width="100%"
                    height="350px"
                    type="area"
                  />
                ) : (
                  <div className="not_chart">
                    <ChartLoader />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dynamics;
