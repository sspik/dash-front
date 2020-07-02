import React, {FC, useState} from 'react';
import moment from "moment";
import gql from "graphql-tag";

import { useQuery } from "@apollo/react-hooks";
import { Loading } from "components/loading/Loading";
import { GridContainer, GridItem } from "components/grid";
import { Card, CardBody, CardHeader } from "components/card";
import { CounterStatus } from "./CounterStatus";
import { RegularButton } from "components/button/Button";

import { makeStyles } from "@material-ui/core";
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';

import { MetricsGraph } from "./metricsGraph";

import { ICounter, IYandexMetrikaResponse, TGraphType } from "interfaces";
import { RouteComponentProps } from "react-router";

import styles from "assets/jss/pages/metricStyle"

const useStyles = makeStyles(styles);

const GetYandexMetrikaCounter = gql`
  query GetYandexMetrikaCounter($bitrixGroupId: ID!) {
    GetCounter(bitrixGroupId: $bitrixGroupId) {
      id
      status
      owner_login
      name
      mirrors
      errors {
        errors {
          message
        }
      }
      create_time
      permission
      code
      code_status
      site
      filter_robots
      time_zone_name
    }
  }
`;

const GetYandexMetrics = gql`
  query GetYandexMetrics(
    $bitrixGroupId: ID!
    $metrics: String
    $dimensions: String
    $date1: String
    $date2: String
    $preset: String
  ) {
    GetYandexMetrics(
      bitrixGroupId: $bitrixGroupId
      metrics: $metrics
      dimensions: $dimensions
      date1: $date1
      date2: $date2
      preset: $preset
    ) {
      data {
        dimensions {
          name
          id
        }
        metrics
      }
      query {
        date1
        date2
        dimensions
        metrics
      }
      time_intervals
      totals
    }
  }
`;

type iRouterParams = {
  groupId: string
}
interface IMetricsProps extends RouteComponentProps<iRouterParams>{}

interface IMetricsState {
  metrics?: string;
  dimensions?: string;
  preset?: string;
  date1: string;
  date2: string;
  graphType: TGraphType;
}

const initState: IMetricsState = {
  date1: moment().subtract(14, 'days').format('YYYY-MM-DD'),
  date2: moment().subtract(1, 'days').format('YYYY-MM-DD'),
  metrics: "ym:s:visits,ym:s:pageviews,ym:s:users",
  graphType: "line"
}

export const Metrics: FC<IMetricsProps> = (props) => {
  const classes = useStyles();
  const bitrixGroupId = props.match.params.groupId;
  const [ state, setState ] = useState<IMetricsState>(initState);
  const {
    data: counterData,
    loading: counterLoading,
    error: counterError
  } = useQuery<{ GetCounter: ICounter }, { bitrixGroupId: string }>(
      GetYandexMetrikaCounter,
    { variables: { bitrixGroupId } }
  )
  const { graphType, ...metricsQuery } = state;
  const {
    data: metricsData,
    error: metricsError,
    loading: metricsLoading
  } = useQuery<IYandexMetrikaResponse>(
    GetYandexMetrics,
    { variables: { bitrixGroupId, ...metricsQuery } }
  )

  if (
    !metricsData && metricsLoading
  ) return <Loading />;
  if (
    !counterData && counterLoading
  ) return <Loading />;
  if (counterError) return <p>{ counterError.message }</p>;
  const counter = counterData!.GetCounter;
  console.log(metricsData);
  return (
    <GridContainer>
      { metricsLoading && <Loading /> }
      <GridItem xs={12} sm={12} md={12}>
        <h2>Сайт {counter.site}</h2>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <CounterStatus { ...counter } />
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card hovered chart>
          <CardHeader color="primary">
            <MetricsGraph
              error={metricsError}
              data={metricsData}
              graphType={graphType}
            />
          </CardHeader>
          <CardBody
            underHover={(
              <div className={classes.chartControl}>
                <div className={classes.chartPresets}>
                  <RegularButton
                    size="sm"
                    color="white"
                    onClick={() => setState({
                      date1: state.date1,
                      date2: state.date2,
                      metrics: "ym:s:visits,ym:s:pageviews,ym:s:users",
                      graphType: "line",
                    })}
                  >
                    Источники
                  </RegularButton>
                  <RegularButton
                    size="sm"
                    data-preset="tech_platforms"
                    data-dimensions="ym:s:browser"
                    color="white"
                    onClick={() => setState({
                      date1: state.date1,
                      date2: state.date2,
                      dimensions: "ym:s:browser",
                      metrics: "ym:s:visits",
                      graphType: "pie"
                    })}
                  >
                    Браузеры
                  </RegularButton>
                </div>
                <div className={classes.datePicker}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                      disableFuture
                      autoOk
                      variant="inline"
                      format="DD-MM-YYYY"
                      margin="none"
                      id="date-picker-inline"
                      label="Начало"
                      value={state.date1}
                      onChange={( date ) => setState({
                        ...state,
                        date1: moment(date!).format('YYYY-MM-DD')
                      })}
                    />
                  </MuiPickersUtilsProvider>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                      disableFuture
                      autoOk
                      variant="inline"
                      format="DD-MM-YYYY"
                      margin="none"
                      id="date-picker-inline"
                      label="Конец"
                      value={state.date2}
                      onChange={( date ) => setState({
                        ...state,
                        date2: moment(date!).format('YYYY-MM-DD')
                      })}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </div>
            )}
          >
            <div>

            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}
