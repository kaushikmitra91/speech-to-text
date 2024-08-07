import { useEffect } from "react";
import * as d3 from "d3";

const marginTop = 0;
const marginBottom = 0;
const marginLeft = 0;
const marginRight = 0
const oneMillion = 1_000_000;

const BarChartWidget = ({ width, height, data }) => {
  const chartBottomY = height - marginBottom;

  // Create the horizontal scale and its axis generator.
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

  // Create the vertical scale and its axis generator.
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value / oneMillion)])
    .nice()
    .range([chartBottomY, marginTop]);

  const yAxis = d3.axisLeft(yScale);

  useEffect(() => {
    d3.select(".x-axis")
      .call(xAxis)
      .selectAll("text")
      .attr("font-size", "14px")
      // Rotate the labels to make them easier to read.
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end");
    d3.select(".y-axis")
      .call(yAxis)
      .selectAll("text")
      .attr("font-size", "14px");
  }, [xAxis, yAxis]);

  return (
    <div className="chartContainer">
       <div className="chart-Title">Widget</div>
       <div className="subtitle"> <span>August 2024</span> <span>Per Day</span></div>
      <div className="customChart">
       
      {data.map((d) => (
        <div className="bar">
          <span style={{height:chartBottomY - yScale(d.value / oneMillion)}}></span>
        </div>
      ))}
      </div>
      {/* <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="viz"
      >
        <g className="bars">
          {data.map((d) => (
            <rect
              key={d.name}
              x={xScale(d.name)}
              y={yScale(d.value / oneMillion)}
              height={chartBottomY - yScale(d.value / oneMillion)}
              width="5px"
              fill="#4292c6"
            />
          ))}
        </g>
        <g className="labels">
          {data.map((d) => (
            <text
              key={d.name}
              x={xScale(d.name) + xScale.bandwidth() / 2}
              y={yScale(d.value / oneMillion) - 5}
              textAnchor="middle"
              fontSize={8}
            >
              {Number((d.value / oneMillion).toFixed(1)).toLocaleString()}
            </text>
          ))}
        </g>
        <g className="x-axis" transform={`translate(0,${chartBottomY})`}></g>
        <g className="y-axis" transform={`translate(${marginLeft},0)`}></g>
      </svg> */}

<ul className="list-wrapper">
                        <li>
                           <div className="content">
                                <h5>Option 1</h5>
                                <span>Search for helpful answers</span>
                            </div>
                            <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>
                            </span>
                        </li>
                        <li>
                            <div className="content">
                                <h5>Option 2</h5>
                                <span>Search for helpful answers</span>
                            </div>
                            <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>
                            </span>
                        </li>
                        <li>
                            <div className="content">
                            <h5>Option 3</h5>
                                <span>Search for helpful answers</span>
                            </div>
                            <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>
                            </span>
                        </li>
                        <li>
                           
                            <div className="content">
                                <h5>Option 4</h5>
                                <span>Search for helpful answers</span>
                            </div>
                            <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>
                            </span>
                        </li>
                    </ul>

                    <div className="viewAll-link">view all</div>
    </div>
  );
};

export default BarChartWidget;
