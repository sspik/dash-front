import React, {FC, useState} from 'react';
import { RouteComponentProps } from "react-router";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import { Loading } from "components/loading/Loading";
import { GridContainer, GridItem } from "components/grid";

import { makeStyles } from "@material-ui/core";
import { ITopvisorPositions, ITopVisorProject } from "interfaces";
import { PositionsTable } from "./PositionsTable";
import { getRegionIndexes } from "utils";

import styles from "assets/jss/pages/topvisorStyle";


const useStyles = makeStyles(styles);

type iRouterParams = {
  groupId: string
}

interface IPositionProps extends RouteComponentProps<iRouterParams>{}
interface IPositionsResponse {
  GetTopvisorPositions: ITopvisorPositions
}
interface IPositionsVariables {
  bitrixGroupId: string;
  projectId?: string;
  regionIndexes?: number[];
  date1: string;
  date2: string;
}

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
    $regionIndexes: [Int]!
    $date1: String
    $date2: String
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
            searcher
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


export const Positions: FC<IPositionProps> = (props) => {
  const classes = useStyles();
  const bitrixGroupId = props.match.params.groupId;
  const [ state, setState ] = useState(initState);
  const {
    loading: projectLoading,
    data: projectData,
    error: projectError,
  } = useQuery<{ GetTopvisorProject: ITopVisorProject }, { bitrixGroupId: string }>(
    getProject,
    { variables: { bitrixGroupId }}
  );
  const {
    loading: positionsLoading,
    data: positionsData,
    error: positionsError,
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
  if (projectError) return <p>{ projectError.message }</p>;
  if (!projectData && projectLoading) return <Loading />;
  if (!positionsData && positionsLoading) return <Loading />;
  const project = projectData!.GetTopvisorProject;
  const positions = positionsData!.GetTopvisorPositions;
  const dates: Set<string> = new Set();
  positions.result.keywords.forEach((keyword) => {
    keyword.positionsData.forEach((position) => dates.add(position.data))
  })
  return (
    <div>
      { projectLoading || positionsLoading && <Loading /> }
      <GridContainer>
        <GridItem xs={12} lg={12} md={12}>
          <h2>{ project.name }</h2>
        </GridItem>
        <GridItem xs={12} lg={12} md={12}>
          { positionsError
            ? <p>{ positionsError.message }</p>
            : <PositionsTable />
          }
        </GridItem>
      </GridContainer>
    </div>
  )
}
