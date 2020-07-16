import React, { FC, useState } from 'react';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import _ from 'lodash';

import {
  ShowChart,
  BarChart,
} from "@material-ui/icons"

import { Line, Pie, Bar } from 'react-chartjs-2';
import { Loading } from "components/loading/Loading";
import { Card } from "components/card";
import { GridContainer, GridItem } from "components/grid";
import { RegularButton } from "components/button/Button";
import { positionsGraphData } from "utils";

import {
  IPositionChartProps,
  IPositionsChartVariables,
  IPositionsChartResponse,
  IPositionsChartState,
} from './interfaces';

import { grayColor } from "assets/jss/all";


const getSummaryChart = gql`
  query GetSummaryChart(
    $bitrixGroupId: ID!
    $projectId: ID!
    $regionIndex: ID!
    $date1: String!
    $date2: String!
  ) {
    GetTopvisorSummaryChart(
      bitrixGroupId: $bitrixGroupId
      projectId: $projectId
      regionIndex: $regionIndex
      date1: $date1
      date2: $date2
    ) {
      result {
        tops {
          top3
          top10
          top11_30
          top31_50
          top51_100
        }
        dates
      }
    }
  }
`

const initState: IPositionsChartState = {
  chartType: 'line',
}

export const PositionChart: FC<IPositionChartProps> = (props) => {
  const {
    dates,
    projectId,
    bitrixGroupId,
    regionIndex,
  } = props;
  const [ state, setState ] = useState<IPositionsChartState>(initState);
  const {
    data,
    error,
    loading
  } = useQuery<
    IPositionsChartResponse,
    IPositionsChartVariables
    >(getSummaryChart, {
    variables: {
      projectId,
      bitrixGroupId,
      date1: _.first(dates)!,
      date2: _.last(dates)!,
      regionIndex,
    }
  });
  if (error) return <p>{ error.message }</p>;
  if (!data && loading) return <Loading />;
  const chartData = positionsGraphData(
    data!.GetTopvisorSummaryChart.result,
    state.chartType,
  );
  return (
    <div>
      <Card>
        <GridContainer justify="center">
          <GridItem xs={3} lg={3} md={3}>
            <GridContainer>
              <GridItem xs={6} lg={6} md={6}>
                <RegularButton
                  justIcon
                  round
                  color={state.chartType === 'line' ? 'primary' : 'white'}
                  onClick={() => setState({ ...state, chartType: 'line' })}
                >
                  <ShowChart />
                </RegularButton>
              </GridItem>
              <GridItem xs={6} lg={6} md={6}>
                <RegularButton
                  justIcon
                  round
                  color={state.chartType === 'bar' ? 'primary' : 'white'}
                  onClick={() => setState({ ...state, chartType: 'bar' })}
                >
                  <BarChart />
                </RegularButton>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} lg={12} md={12}>
            { state.chartType === 'line'
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
              : state.chartType === 'bar'
                ? <Bar
                  data={chartData}
                  height={75}
                />
                : <Pie
                  data={chartData}
                  height={75}
                />
            }
          </GridItem>
        </GridContainer>
      </Card>
    </div>
  )
}