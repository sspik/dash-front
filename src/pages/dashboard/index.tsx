import React, { Fragment, useState, ChangeEvent } from 'react';

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { Fade } from "@material-ui/core";

import { WorkGroupShort } from "components/workGroup/WorkGroupShort";
import { Pagination } from "components/pagination/Pagination";
import { GridContainer, GridItem } from "components/grid";
import { Loading } from "components/loading/Loading";

import { IWorkGroupsResponse } from "interfaces";
import { IDashboardState, IWorkGroupsVariables } from "./interfaces";

import styles from "assets/jss/layouts/dashboardStyle";

const useStyles = makeStyles(styles);


const initState: IDashboardState = {
  start: 0,
}

const GetWorkGroups = gql`
  query WorkGroups($start: Int!) {
    GetUserGroups(start: $start) {
      total
      next
      result {
        ID
        NAME
        DESCRIPTION
        NUMBER_OF_MEMBERS
      }
    }
  }
`

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [ state, setState ] = useState<IDashboardState>(initState);
  const { start } = state;
  const { data, error, loading } = useQuery<
    IWorkGroupsResponse,
    IWorkGroupsVariables
    >(
      GetWorkGroups,
    {
      variables: { start }
    }
  );
  if (!data && loading) return <Loading />;
  if (error) return <Fragment>{ error }</Fragment>;

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    setState({
      ...state,
      start: (page - 1) * 50
    })
  }

  return (
    <div>
      { loading && <Loading /> }
      <div className={classes.headPanel}>
        { data!.GetUserGroups.total > 50
          && <Pagination
            start={start}
            total={data!.GetUserGroups.total}
            changePage={handleChangePage}
          />
        }
      </div>
      <Fade in timeout={300}>
        <GridContainer>
          { data
            ? data.GetUserGroups.result.map(group => {
              return (
                <GridItem xs={12} sm={6} md={3} key={group.ID}>
                  <WorkGroupShort { ...group } />
                </GridItem>
              )
            })
            : <p>Нет групп с вашим участием</p>
          }
        </GridContainer>
      </Fade>
    </div>
  )
}
export default Dashboard;
