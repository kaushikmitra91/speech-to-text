import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import PieChart from "./piechart";
import DoughnutChart from "./doughnut";
import BarChart from "./barchart";
import WorldMap from "./worldmap/worldmap";
import { barchartData } from "../utils/data";
import "./style.css";

const Charts = () => {
  const [worldPopulation, setWorldPopulation] = useState(null);
  const [topography, setTopography] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartMenuState = {
    pie: false,
    doughnut: false,
    bar: false,
    worldMap: false,
  };

  const [visibility, setVisibility] = useState(chartMenuState);

  const getData = async () => {
    setLoading(true);

    let populationData = {};
    await Promise.all([
      d3.json(
        "https://res.cloudinary.com/tropicolx/raw/upload/v1/Building%20Interactive%20Data%20Visualizations%20with%20D3.js%20and%20React/world.geojson"
      ),
      d3.csv(
        "https://res.cloudinary.com/tropicolx/raw/upload/v1/Building%20Interactive%20Data%20Visualizations%20with%20D3.js%20and%20React/world_population.csv",
        (d) => {
          populationData = {
            ...populationData,
            [d.code]: +d.population,
          };
        }
      ),
    ]).then((fetchedData) => {
      const topographyData = fetchedData[0];
      setWorldPopulation(populationData);
      setTopography(topographyData);
    });

    setLoading(false);
  };

  const chartSelectionHandler = (chart) => {
    const temp = { ...chartMenuState };
    for (const options in temp) {
      if (options === chart) {
        temp[options] = true;
      } else {
        temp[options] = false;
      }
    }
    setVisibility(temp);
  };

  useEffect(() => {
    getData();
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="container">
      <div className="chartOptions">
        <div className="option" onClick={() => chartSelectionHandler("pie")}>
          Pie chart
        </div>
        <div
          className="option"
          onClick={() => chartSelectionHandler("doughnut")}
        >
          Doughnut chart
        </div>
        <div className="option" onClick={() => chartSelectionHandler("bar")}>
          Bar chart
        </div>
        <div
          className="option"
          onClick={() => chartSelectionHandler("worldMap")}
        >
          World map
        </div>
      </div>
      {visibility?.pie && (
        <PieChart data={barchartData} width={500} height={500} />
      )}
      {visibility?.doughnut && (
        <DoughnutChart
          data={barchartData}
          innerRadius={120}
          outerRadius={200}
        />
      )}
      {visibility?.bar && (
        <BarChart data={barchartData} width={500} height={600} />
      )}
      {worldPopulation && topography && visibility.worldMap && (
        <WorldMap
          width={550}
          height={450}
          data={{ worldPopulation, topography }}
        />
      )}
    </div>
  );
};

export default Charts;
