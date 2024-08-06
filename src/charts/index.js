import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import PieChart from "./piechart";
import DoughnutChart from "./doughnut";
import BarChart from "./barchart";
import WorldMap from "./worldmap/worldmap";
import { barchartData } from "../utils/data";
import "./style.css";

const ChartMenuItems = (props) => {
  const { chartSelectionHandler, visibility } = props;
  return (
    <div className="chartOptions">
      <div className="option" aria-selected={visibility?.pie} onClick={() => chartSelectionHandler("pie")}>
        Pie chart
      </div>
      <div className="option" aria-selected={visibility?.doughnut} onClick={() => chartSelectionHandler("doughnut")}>
        Doughnut chart
      </div>
      <div className="option" aria-selected={visibility?.bar} onClick={() => chartSelectionHandler("bar")}>
        Bar chart
      </div>
      <div className="option" aria-selected={visibility?.worldMap} onClick={() => chartSelectionHandler("worldMap")}>
        World map
      </div>
    </div>
  );
};

const Charts = () => {
  const refContainer = useRef();
  const [worldPopulation, setWorldPopulation] = useState(null);
  const [topography, setTopography] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartMenuState = {
    pie: false,
    doughnut: false,
    bar: false,
    worldMap: true,
  };

  const [visibility, setVisibility] = useState(chartMenuState);
  const [containerWidth, setContainerWidth] = useState(320);
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
    if (refContainer.current) {
      setContainerWidth(refContainer.current.offsetWidth);
    }
  }, []);

  return (
    <div className="container" ref={refContainer}>
       
      {visibility?.pie && (
        <PieChart
          data={barchartData}
          width={containerWidth}
          height={containerWidth}
        />
      )}
      {visibility?.doughnut && (
        <DoughnutChart data={barchartData} innerRadius={80} outerRadius={160} />
      )}
      {visibility?.bar && (
        <BarChart data={barchartData} width={containerWidth} height={400} />
      )}
      {worldPopulation && topography && visibility.worldMap && (
        <WorldMap
          width={containerWidth - 10}
          height={450}
          data={{ worldPopulation, topography }}
        />
      )}

      
      <ChartMenuItems visibility={visibility} chartSelectionHandler={chartSelectionHandler} />
      <h1 className="pageTitle">World Population</h1>
    </div>
  );
};

export default Charts;
