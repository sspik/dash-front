import moment from 'moment';
import _ from 'lodash';
import { ChartData } from 'react-chartjs-2';
import chartJs from "chart.js";

import {
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  whiteColor,
  grayColor,
} from 'assets/jss/all';

import {
  IGroup,
  IGroupTask,
  ITopVisorProject, ITopvisorSummaryChart,
  IYandexMetrikaResponse,
  TGraphType,
} from "./interfaces";

export const formatBytes = (bytes: number, dec: number = 2): string => {
  if (bytes === 0) return '0 Байт';
  const k = 1024;
  const dm = dec < 0 ? 0 : dec;
  const sizes = ['Байт', 'Кб', 'Мб', 'Гб', 'Тб', 'Пб', 'Еб', 'Зб', 'Уб', 'Йб'];
  const index = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, index)).toFixed(dm)) + ' ' + sizes[index];
}

const chartColors: string[] = [
  warningColor[0],
  dangerColor[0],
  successColor[0],
  infoColor[0],
  roseColor[0],
  grayColor[4],
  grayColor[1],
]

export const tasksTimeChart = (
  tasks: IGroupTask[],
  group: IGroup,
  seriesCount: number = 30,
): ChartData<chartJs.ChartData> => {
  const timeStart = moment(group.DATE_CREATE).valueOf();
  const dateNow = moment.now()
  const stepSize = Math.ceil((dateNow - timeStart) / seriesCount);
  const steps = _.range(
    timeStart,
    dateNow,
    stepSize,
  );
  let series: number[] = _.fill<number>(Array(seriesCount), 0);
  for (let i = 0; i < steps.length; i++) {
    for (let task of tasks) {
      const taskCreated = moment(task.CREATED_DATE).valueOf();
      const taskClosed = task.CLOSED_DATE
        ? moment(task.CLOSED_DATE).valueOf()
        : moment.now().valueOf();
      if (steps[i] > taskCreated && taskClosed > steps[i]) {
        series[i]++;
      }
    }
  }
  const labels = steps.map(s => moment(s).format('DD.MM'));
  return {
    labels,
    datasets: [
      {
        label: "Количество задач",
        data: series,
        borderColor: ['rgb(255, 255, 255)'],
        backgroundColor: ['rgba(0, 0, 0, 0)'],
        pointBackgroundColor: 'rgba(0, 0, 0, 0)'
      }
    ]
  }
}

type TMetricNames = {[key: string]: string};
export const metricNames: TMetricNames = {
  'ym:s:visits': 'Визиты',
  'ym:s:bounceRate': 'Отказы',
  'ym:s:users': 'Посетители'
}

export const yandexMetricsChartLine = (
  response: IYandexMetrikaResponse
): ChartData<chartJs.ChartData> => {
  const {
    query,
    data,
    time_intervals,
  } = response.GetYandexMetrics;

  // Подготовка временной шкалы
  let labels: string[];
  labels = time_intervals.map(t => t[0])
  labels = labels.map(s => moment(s).format('DD.MM'))

  const series = data.map((dt, index) => ({
    label: dt.dimensions.map(d => d.name).join(', ') || metricNames[query.metrics[0]],
    data: dt.metrics[0],
    borderColor: [chartColors[index]],
    backgroundColor: ['rgba(0, 0, 0, 0)']
  }));

  return {
    labels,
    datasets: series,
  }
}

const yandexMetricsChartPie = (
  response: IYandexMetrikaResponse,
): ChartData<chartJs.ChartData> => {
  const {
    data,
  } = response.GetYandexMetrics;
  return {
    labels: data
      .map(d => d.dimensions.map(dimension => dimension.name).join(', ')),
    datasets: [{
      data: data.map(d => d.metrics[0].reduce((x, y) => x + y)),
      backgroundColor: chartColors,
      borderColor: [whiteColor]
    }],
  }
}

export const yandexMetricsChart = (
  response: IYandexMetrikaResponse,
  graphType: TGraphType
) => {
  return graphType === "line"
    ? yandexMetricsChartLine(response)
    : yandexMetricsChartPie(response);
}

export const calcEmptyRows = (
  rowsPerPage: number,
  page: number,
  maxRows: number
): number => {
  return rowsPerPage - Math.min(
    rowsPerPage,
    maxRows - page * rowsPerPage
  )
}

export const getRegionIndexes = (
  topvisorProject: ITopVisorProject
): number[] => {
  let regions: number[] = []
  topvisorProject.searchers.forEach((s) => {
    s.regions.forEach((r) => regions.push(r.index))
  });
  return regions;
}

const positionTopNames: {[key: string]: string} = {
  'top3': '1-3',
  'top10': '1-10',
  'top11_30': '11-30',
  'top31_50': '31-50',
  'top51_100': '51-100',
  'all': 'Все',
  'top101_10000': '101-10000',
}

const positionsGraphDataLine = (
  summaryData: ITopvisorSummaryChart
): ChartData<chartJs.ChartData> => {
  const { tops: { __typename, ...tops }, dates } = summaryData;
  const series = Object.keys(tops).map((k, index) => {
    return {
      label: positionTopNames[k],
      data: tops[k],
      borderColor: [chartColors[index]],
      backgroundColor: ['rgba(0, 0, 0, 0)']
    }
  });
  return {
    labels: dates,
    datasets: series,
  }
}

const positionsGraphDataBar = (
  summaryData: ITopvisorSummaryChart
): ChartData<chartJs.ChartData> => {
  const { tops: { __typename, ...tops }, dates } = summaryData;
  const series = Object.keys(tops).map((k, index) => {
    return {
      label: positionTopNames[k],
      data: tops[k],
      borderColor: chartColors[index],
      backgroundColor: chartColors[index],
    }
  });
  return {
    labels: dates,
    datasets: series,
  }
}
export const positionsGraphData = (
  summaryData: ITopvisorSummaryChart,
  chartType: 'bar' | 'line',
): ChartData<chartJs.ChartData> => {
  switch (chartType) {
    case "bar":
      return positionsGraphDataBar(summaryData)
    case "line":
      return positionsGraphDataLine(summaryData)
  }
}
