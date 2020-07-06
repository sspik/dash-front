import React, { ChangeEvent, FC, useState } from 'react';
import moment from "moment";
import gql from "graphql-tag";
import { RouteComponentProps } from "react-router";

import { useQuery } from "@apollo/react-hooks";
import { Loading } from "components/loading/Loading";
import { GridContainer, GridItem } from "components/grid";
import { Card, CardBody, CardHeader } from "components/card";
import { RegularButton } from "components/button/Button";
import { TableYandexMetrics } from "components/table/TableYandexMetrics";

import {
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Tooltip
} from "@material-ui/core";
import {
  ShowChart,
  PieChart,
} from "@material-ui/icons"


import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';

import { MetricsGraph } from "./MetricsGraph";
import { CounterStatus } from "./CounterStatus";

import { ICounter, IYandexMetrikaResponse, TGraphType } from "interfaces";

import styles from "assets/jss/pages/metricStyle"

const useStyles = makeStyles(styles);

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
  metrics: "ym:s:visits",
  graphType: "line"
}

export const Metrics: FC<IMetricsProps> = (props) => {
  const classes = useStyles();
  const bitrixGroupId = props.match.params.groupId;
  const [ state, setState ] = useState<IMetricsState>(initState);
  const handleChangeMetric = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      metrics: e.target.value
    })
  }
  const { graphType, ...metricsQuery } = state;
  const {
    data: counterData,
    loading: counterLoading,
    error: counterError
  } = useQuery<{ GetCounter: ICounter }, { bitrixGroupId: string }>(
    GetYandexMetrikaCounter,
    { variables: { bitrixGroupId } }
  )
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
  if (metricsError) return <p>{ metricsError.message }</p>
  if (
    !counterData && counterLoading
  ) return <Loading />;
  const counter = counterData!.GetCounter;
  return (
    <GridContainer>
      { metricsLoading && <Loading /> }
      <CounterStatus
        { ...counter }
      />
      <GridItem xs={12} sm={12} md={12}>
        <Card hovered chart>
          <CardHeader color="white">
            <GridContainer>
              <GridItem xs={11} sm={11} md={11}>
                <RadioGroup
                  row
                  onChange={(e) => handleChangeMetric(e)}
                  value={state.metrics}
                >
                  <Tooltip
                    title="Суммарное количество визитов"
                    placement="top-end"
                  >
                    <FormControlLabel
                      value="ym:s:visits"
                      control={<Radio size="small" color="primary" />}
                      label={<div className={classes.cardHeaderFont}>Визиты</div>}
                    />
                  </Tooltip>
                  <Tooltip
                    title="Количество уникальных посетителей"
                    placement="top-end"
                  >
                    <FormControlLabel
                      value="ym:s:users"
                      control={<Radio size="small" color="primary" />}
                      label={<div className={classes.cardHeaderFont}>Посетители</div>}
                    />
                  </Tooltip>
                  <Tooltip
                    title="Доля визитов, в рамках которых состоялся лишь один просмотр страницы,
                    продолжавшийся менее 15 секунд."
                    placement="top-end"
                    >
                    <FormControlLabel
                      value="ym:s:bounceRate"
                      control={<Radio size="small" color="primary" />}
                      label={<div className={classes.cardHeaderFont}>% отказов</div>}
                    />
                  </Tooltip>
                </RadioGroup>
              </GridItem>
              <GridItem xs={1} sm={1} md={1}>
                <RegularButton
                  color={ state.graphType === "line" ? "primary" : "white" }
                  justIcon
                  round
                  onClick={() => setState({ ...state, graphType: "line" })}
                >
                  <ShowChart />
                </RegularButton>
                <RegularButton
                  color={ state.graphType === "pie" ? "primary" : "white" }
                  justIcon
                  round
                  onClick={() => setState({ ...state, graphType: "pie" })}
                >
                  <PieChart />
                </RegularButton>
              </GridItem>
            </GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <MetricsGraph
                error={metricsError}
                data={metricsData}
                graphType={graphType}
              />
            </GridItem>
          </CardHeader>
          <CardBody
            underHover={(
              <div className={classes.chartControl}>
                <div className={classes.chartPresets}>
                  <RegularButton
                    size="sm"
                    color={!state.dimensions ? "primary" : "white"}
                    onClick={() => setState({
                      date1: state.date1,
                      date2: state.date2,
                      metrics: state.metrics,
                      graphType: state.graphType,
                    })}
                  >
                    Источники
                  </RegularButton>
                  <RegularButton
                    size="sm"
                    color={state.dimensions === "ym:s:browser" ? "primary" : "white"}
                    onClick={() => setState({
                      ...state,
                      dimensions: "ym:s:browser",
                    })}
                  >
                    Браузеры
                  </RegularButton>
                  <RegularButton
                    size="sm"
                    color={state.dimensions === "ym:s:searchEngine" ? "primary" : "white"}
                    onClick={() => setState({
                      ...state,
                      dimensions: "ym:s:searchEngine",
                    })}
                  >
                    Поисковые системы
                  </RegularButton>
                  <RegularButton
                    size="sm"
                    color={state.dimensions === "ym:s:regionCity" ? "primary" : "white"}
                    onClick={() => setState({
                      ...state,
                      dimensions: "ym:s:regionCity",
                    })}
                  >
                    География
                  </RegularButton>
                </div>
                <div>
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
            <TableYandexMetrics
              GetYandexMetrics={metricsData!.GetYandexMetrics}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}
