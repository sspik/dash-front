import React, { memo } from 'react';
import { yandexMetricsChart } from "utils";
import { Line, Pie } from 'react-chartjs-2';
import { grayColor } from "assets/jss/all";

import { IMetricsGraphProps } from "./interfaces";

export const MetricsGraph = memo<IMetricsGraphProps>((props) => {
  const { error, data, graphType } = props;
  if (error) return <p>{ error.message }</p>;
  const chartData = yandexMetricsChart(data!, graphType);
  return graphType === 'line'
    ? <Line
      data={chartData}
      height={75}
      options={{
        legend: {
          labels: {
            fontColor: grayColor[2]
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 1,
              fontColor: grayColor[2]
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: grayColor[2]
            },
            gridLines: {
              display: false,
            },
          }]
        }
      }}
    />
    : <Pie
      data={chartData}
      height={75}
      options={{
        legend: {
          labels: {
            fontColor: grayColor[2]
          }
        },
      }}
    />
});
