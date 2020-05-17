import { IGroup, IGroupTask } from "./interfaces";
import moment from 'moment';
import _ from 'lodash';
import { ChartitGraphLineProps } from 'react-chartist';
import Chartist from 'chartist';

export const formatBytes = (bytes: number, dec: number = 2): string => {
  if (bytes === 0) return '0 Байт';
  const k = 1024;
  const dm = dec < 0 ? 0 : dec;
  const sizes = ['Байт', 'Кб', 'Мб', 'Гб', 'Тб', 'Пб', 'Еб', 'Зб', 'Уб', 'Йб'];
  const index = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, index)).toFixed(dm)) + ' ' + sizes[index];
}

const drawChart = (data: any) => {
  const delays = 80;
  const durations = 500;
  if (data.type === "line" || data.type === "area") {
    data.element.animate({
      d: {
        begin: 600,
        dur: 700,
        from: data.path
          .clone()
          .scale(1, 0)
          .translate(0, data.chartRect.height())
          .stringify(),
        to: data.path.clone().stringify(),
        easing: Chartist.Svg.Easing.easeOutQuint
      }
    });
  } else if (data.type === "point") {
    data.element.animate({
      opacity: {
        begin: (data.index + 1) * delays,
        dur: durations,
        from: 0,
        to: 1,
        easing: "ease"
      }
    });
  }
}


export const tasksTimeChart = (
  tasks: IGroupTask[],
  group: IGroup,
  seriesCount: number = 30,
): ChartitGraphLineProps => {
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
  const maxTasks = [ ...series]
    .sort((a, b) => a > b ? 0 : 1)[0];
  return {
    data: {
      labels: steps.map(s => moment(s).format('DD-MM')),
      series: [series]
    },
    type: "Line",
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: maxTasks + 5,
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    listener: {
      draw: drawChart
    }
  }
}
