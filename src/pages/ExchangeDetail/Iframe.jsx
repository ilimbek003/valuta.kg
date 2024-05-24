import React, { useEffect } from "react";
import DG from "2gis-maps";

const Iframe = ({ currency }) => {
  useEffect(() => {
    let mapInstance = DG.map("map", {
      center: [42.88, 74.59],
      zoom: 10,
    });
    if (currency?.crypto?.lat && currency?.crypto?.lon) {
      let marker = DG.marker([currency.crypto.lat, currency.crypto.lon]).addTo(
        mapInstance
      );
    }
    return () => {
      mapInstance.remove();
    };
  }, [currency]);
  return (
    <div className="map">
      <div
        id="map"
        style={{ width: "100%", height: "100%" }}
        className="map"
      ></div>
    </div>
  );
};

export default Iframe;
