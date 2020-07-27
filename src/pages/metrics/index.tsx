import React, { ChangeEvent, FC, useState } from 'react';
import moment from "moment";
import gql from "graphql-tag";
import { v4 as uuid4 } from "uuid";

import { Fade } from "@material-ui/core";

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
  Tooltip,
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

import { IYandexMetrikaResponse } from 'interfaces';
import {
  IYandexMetrikaCounterResponse,
  IYandexMetrikaCounterVariables,
  IMetricsVariables,
  IMetricsState,
  IMetricsProps,
} from "./interfaces";
import { metricsVariables } from "./metricVariables";

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
      code_status
      site
      filter_robots
      time_zone_name
      goals {
        id
        name
      }
    }
  }
`;


const initState: IMetricsState = {
  date1: moment().subtract(14, 'days').format('YYYY-MM-DD'),
  date2: moment().subtract(1, 'days').format('YYYY-MM-DD'),
  metrics: "ym:s:visits",
  graphType: "line",
  metricType: "search",
}

const Metrics: FC<IMetricsProps> = (props) => {
  const classes = useStyles();
  const bitrixGroupId = props.match.params.groupId;
  const [ state, setState ] = useState<IMetricsState>(initState);
  const handleChangeMetric = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      metrics: e.target.value
    })
  }
  const { graphType, metricType, ...metricsQuery } = state;
  const {
    data: counterData,
    loading: counterLoading,
    error: counterError,
  } = useQuery<
    IYandexMetrikaCounterResponse,
    IYandexMetrikaCounterVariables
    >(
    GetYandexMetrikaCounter,
    { variables: { bitrixGroupId } }
  )
  const {
    data: metricsData,
    error: metricsError,
    loading: metricsLoading
  } = useQuery<
    IYandexMetrikaResponse,
    IMetricsVariables
    >(
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
      { counterError
        ? <p>{ counterError.message }</p>
        : <CounterStatus
          { ...counter }
        />
      }
      <Fade in timeout={800}>
        <GridItem xs={12} sm={12} md={12}>
          <Card hovered chart>
            <CardHeader color="white">
              <GridContainer justify="flex-end" alignItems="center">
                <GridItem className={classes.settingsMetricType}>
                  <RadioGroup
                    row
                    onChange={(e) => handleChangeMetric(e)}
                    value={state.metrics}
                  >
                    { Object.keys(metricsVariables.metrics)
                      .map<JSX.Element>((key) => {
                        const value = metricsVariables.metrics[key];
                        return (
                          <Tooltip
                            key={uuid4()}
                            title={ value.tooltip }
                            placement="top-end"
                          >
                            <FormControlLabel
                              value={ value.name }
                              control={ <Radio size="small" color="primary" /> }
                              label={<div className={classes.cardHeaderFont}>{ value.display }</div>}
                            />
                          </Tooltip>
                        )
                      })
                    }
                  </RadioGroup>
                </GridItem>
                <GridItem xs={1} sm={1} md={1}>
                  <GridContainer spacing={1}>
                    <GridItem xs={5} sm={5} md={5}>
                      <RegularButton
                        color={ state.graphType === "line" ? "primary" : "white" }
                        justIcon
                        round
                        onClick={() => setState({ ...state, graphType: "line" })}
                      >
                        <ShowChart />
                      </RegularButton>
                    </GridItem>
                    <GridItem xs={5} sm={5} md={5}>
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
                    { Object.keys(metricsVariables.dimensions)
                      .map<JSX.Element>((key) => {
                        const value = metricsVariables.dimensions[key];
                        return (
                          value.name.length
                            ? (
                              <Tooltip
                                key={uuid4()}
                                title={ value.tooltip }
                                placement="top-end"
                              >
                                <span>
                                  <RegularButton
                                    size="sm"
                                    color={state.dimensions === value.name ? "primary" : "white"}
                                    onClick={() => setState({
                                      ...state,
                                      dimensions: value.name,
                                    })}
                                  >
                                    { value.display }
                                  </RegularButton>
                                </span>
                              </Tooltip>
                            )
                            : (
                              <Tooltip
                                key={uuid4()}
                                title={ value.tooltip }
                                placement="top-end"
                                interactive
                              >
                                <span>
                                  <RegularButton
                                    size="sm"
                                    color={!state.dimensions ? "primary" : "white"}
                                    onClick={() => setState({
                                      date1: state.date1,
                                      date2: state.date2,
                                      metrics: state.metrics,
                                      graphType: state.graphType,
                                      metricType: state.metricType,
                                    })}
                                  >
                                    Источники
                                  </RegularButton>
                                </span>
                              </Tooltip>
                            )
                        )
                      }) }
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
      </Fade>
    </GridContainer>
  )
}

export default Metrics;
