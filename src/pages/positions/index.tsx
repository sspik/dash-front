import React, { FC, useState } from 'react';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import { makeStyles, Card, Fade } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { GridContainer, GridItem } from "components/grid";
import { TablePositions } from "components/table/TablePositions";
import { CustomTabs } from "components/customTabs/CustomTabs";
import { Loading } from "components/loading/Loading";
import { PositionChart } from "./PositionsChart";

import { getRegionIndexes } from "utils";

import styles from "assets/jss/pages/topvisorStyle";
import MomentUtils from "@date-io/moment";

import { ITopVisorProject } from "interfaces";
import {
  IPositionsVariables,
  IPositionsResponse,
  IPositionProps,
} from './interfaces'

const useStyles = makeStyles(styles);


const getProject = gql`
  query GetProject($bitrixGroupId: ID!) {
    GetTopvisorProject(bitrixGroupId: $bitrixGroupId) {
      id
      name
      site
      searchers {
        id
        project_id
        searcher
        enabled
        name
        regions {
          name
          areaName
          index
          id
        }
      }
    }
  }
`

const getPositions = gql`
  query GetPositions(
    $bitrixGroupId: ID!
    $projectId: ID!
    $regionIndexes: [ID!]!
    $date1: String!
    $date2: String!
  ) {
    GetTopvisorPositions(
      bitrixGroupId: $bitrixGroupId
      projectId: $projectId
      regionIndexes: $regionIndexes
      date1: $date1
      date2: $date2
    ) {
      result {
        keywords {
          name
          positionsData {
            data
            position
            regionIndex
          }
        }
      }
    }
  }
`

interface IPositionsState {
  date1: string;
  date2: string;
}

const initState: IPositionsState = {
  date1: moment().subtract(30, 'days').format('YYYY-MM-DD'),
  date2: moment().format('YYYY-MM-DD'),
}


const Positions: FC<IPositionProps> = (props) => {
  const classes = useStyles();
  const bitrixGroupId = props.match.params.groupId;
  const [state, setState] = useState(initState);
  const {
    loading: projectLoading,
    data: projectData,
    error: projectError,
  } = useQuery<{ GetTopvisorProject: ITopVisorProject }, { bitrixGroupId: string }>(
    getProject,
    {variables: {bitrixGroupId}}
  );
  const {
    loading: keywordsLoading,
    data: keywordsData,
    error: keywordsError,
  } = useQuery<IPositionsResponse, IPositionsVariables>(getPositions, {
    skip: !projectData,
    variables: {
      bitrixGroupId,
      projectId: projectData && projectData!.GetTopvisorProject.id,
      regionIndexes: projectData && getRegionIndexes(projectData!.GetTopvisorProject),
      date1: state.date1,
      date2: state.date2,
    }
  });
  if (projectError) return <p>{projectError.message}</p>;
  if (keywordsError) return <p>{keywordsError.message}</p>;
  if (!projectData && projectLoading) return <Loading/>;
  if (!keywordsData && keywordsLoading) return <Loading/>;
  const project = projectData!.GetTopvisorProject;
  const positions = keywordsData!.GetTopvisorPositions;
  const dates: Set<string> = new Set();
  positions.result.keywords.forEach((keyword) => {
    keyword.positionsData
    && keyword.positionsData.forEach((position) => dates.add(position.data))
  });
  const datesArr = Array.from(dates);
  return (
    <div>
      {projectLoading && <Loading/>}
      {keywordsLoading && <Loading/>}
      <Fade in timeout={400}>
        <GridContainer>
          <GridItem xs={12} lg={12} md={12}>
            <GridContainer alignItems="center">
              <GridItem xs={8} lg={8} md={8}>
                <h2>{project.name}</h2>
              </GridItem>
              <GridContainer>
                <GridItem>
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
                      onChange={(date) => setState({
                        ...state,
                        date1: moment(date!).format('YYYY-MM-DD')
                      })}
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>
                <GridItem>
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
                      onChange={(date) => setState({
                        ...state,
                        date2: moment(date!).format('YYYY-MM-DD')
                      })}
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>
              </GridContainer>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} lg={12} md={12}>
            <Card className={classes.card}>
              <CustomTabs
                plainTabs
                headerColor="info"
                fullWidth
                tabs={project.searchers.map((searcher) => ({
                  tabName: searcher.name,
                  tabContent: (
                    <CustomTabs
                      plainTabs
                      headerColor="primary"
                      fullWidth
                      tabs={searcher.regions.map((region) => {
                        const keywords = positions.result.keywords.map((keyword) => ({
                          ...keyword,
                          positionsData: keyword.positionsData
                            ? keyword.positionsData
                              .filter((position) => region.index === position.regionIndex)
                            : []
                        }))
                        return (
                          {
                            tabName: `${region.name}`,
                            tabContent: (
                              <GridContainer>
                                <GridItem xs={12} lg={12} md={12}>
                                  <PositionChart
                                    dates={datesArr}
                                    projectId={project.id}
                                    bitrixGroupId={bitrixGroupId}
                                    regionIndex={region.index}
                                  />
                                </GridItem>
                                <GridItem xs={12} lg={12} md={12} className={classes.tableContainer}>
                                  <TablePositions
                                    keywords={keywords}
                                    dates={datesArr}
                                  />
                                </GridItem>
                              </GridContainer>
                            )
                          }
                        )
                      })}
                    />
                  )
                }))}
              />
            </Card>
          </GridItem>
        </GridContainer>
      </Fade>
    </div>
  )
}
export default Positions;
