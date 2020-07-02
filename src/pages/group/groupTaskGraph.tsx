import React, { FC } from 'react';
import { Line, ChartData } from 'react-chartjs-2';
import chartJs from "chart.js";

interface IGroupTaskGraphProps {
  data: ChartData<chartJs.ChartData>
}

export const GroupTaskGraph: FC<IGroupTaskGraphProps> = (props) => {
  const { data } = props;
  return (
    <Line
      data={data}
      height={50}
      options={{
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 1,
              fontColor: "rgb(255 255 255)"
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              fontColor: "rgb(255 255 255)"
            }
          }]
        },

      }}

    />
  )
};