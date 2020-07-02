import React, { memo } from 'react';
import { yandexMetricsChart } from "utils";
import ChartistGraph from "react-chartist";

import { IYandexMetrikaResponse, TGraphType } from "interfaces";

interface IMetricsGraphProps {
  error?: Error;
  data?: IYandexMetrikaResponse;
  graphType: TGraphType;
}

export const MetricsGraph = memo<IMetricsGraphProps>((props) => {
  const { error, data, graphType } = props;
  if (error) return <p>{ error.message }</p>;
  const chartData = yandexMetricsChart(data!, graphType);
  return <ChartistGraph { ...chartData } />
})
