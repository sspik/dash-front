import React, { FC } from "react";
import gql from "graphql-tag";
import { Link, RouteComponentProps } from "react-router-dom";

import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { Done, Reorder, Cancel, Work } from "@material-ui/icons";
import { Fade } from "@material-ui/core";

import { Loading } from "components/loading/Loading";
import { GridContainer, GridItem } from "components/grid";
import { Card, CardBody, CardHeader, CardIcon } from "components/card";
import { CustomTabs } from "components/customTabs/CustomTabs";
import { TableTask } from "components/table/TableTask";
import { RegularButton } from "components/button/Button";
import { FeedContainer } from "components/feed/FeedContainer";
import { GroupTaskGraph } from './groupTaskGraph';
import { tasksTimeChart } from "utils";

import { iRouterParams, IQuery } from "./interfaces";

import styles from "assets/jss/pages/workGroupStyle";

const useStyles = makeStyles(styles);

const getWorkGroup = gql`
  query GetWorkGroup (
    $groupId: ID!,
  ) {
    GetGroupById(groupId: $groupId) {
      NAME
      DESCRIPTION
      DATE_CREATE
      DATE_ACTIVITY
    }
    GetGroupsTasks(groupId: $groupId) {
      ID
      TITLE
      DESCRIPTION
      DEADLINE
      CREATED_DATE
      CREATED_BY_NAME
      CREATED_BY_LAST_NAME
      STATUS
      DURATION_FACT
      CLOSED_DATE
    }
  }
`;

interface IGroupProps extends RouteComponentProps<iRouterParams>{}

const Group: FC<IGroupProps> = (props) => {
  const classes = useStyles();
  const { groupId } = props.match.params;
  const { data, loading, error } = useQuery<
    IQuery,
    iRouterParams
    >(getWorkGroup, {
      variables: { groupId }
    }
  );
  if (!data && loading) return <Loading />
  if (error) return <p>{ error }</p>
  const group = data?.GetGroupById;
  const tasks = data?.GetGroupsTasks || [];
  if (!group) return <p>Группа не найдена</p>

  const tasksLength = tasks.length;
  const completeTasks = tasks.filter(t => (
    parseInt(t.STATUS) > 4
  ));
  const expiredTasks = tasks.filter(t => (
    parseInt(t.STATUS) === -1
  ));
  const inProgressTasks = tasks.filter(t => (
    parseInt(t.STATUS) < 5
  ));
  const tasksTimeData = tasksTimeChart(tasks, group);
  return (
    <Fade in timeout={400}>
      <div>
        <GridContainer alignItems="center">
          <GridItem xs={12} sm={8} md={8}>
            <h2>
              { group.NAME }
            </h2>
          </GridItem>
          <GridItem xs={6} sm={2} md={2}>
            <Link to={`/dashboard/group/${groupId}/metrics`}>
              <RegularButton
                color="info"
                className={classes.headButton}
              >
                Посещаемость
              </RegularButton>
            </Link>
          </GridItem>
          <GridItem xs={6} sm={2} md={2}>
            <Link to={`/dashboard/group/${groupId}/positions`}>
              <RegularButton
                color="success"
                className={classes.headButton}
              >
                Позиции
              </RegularButton>
            </Link>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <h3>Задачи</h3>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="primary" stats icon>
                <CardIcon color="primary">
                  <Reorder />
                </CardIcon>
                <p className={classes.cardCategory}>
                  Всего
                </p>
                <h3 className={classes.cardTitle}>
                  { tasksLength }
                </h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Done />
                </CardIcon>
                <p className={classes.cardCategory}>
                  Выполнено
                </p>
                <h3 className={classes.cardTitle}>
                  { completeTasks.length}
                </h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Work />
                </CardIcon>
                <p className={classes.cardCategory}>
                  В работе
                </p>
                <h3 className={classes.cardTitle}>
                  { inProgressTasks.length}
                </h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Cancel />
                </CardIcon>
                <p className={classes.cardCategory}>
                  Просрочены
                </p>
                <h3 className={classes.cardTitle}>
                  { expiredTasks.length}
                </h3>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart>
              <CardHeader color="warning">
                <GroupTaskGraph
                  data={tasksTimeData}
                />
              </CardHeader>
              <CardBody className={classes.cardBody}>
                <p className={classes.cardCategory}>
                  Временная шкала выполнения задач
                </p>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              headerColor="primary"
              tabs={[
                {
                  tabName: "В работе",
                  tabIcon: Work,
                  tabContent: (
                    <TableTask
                      tasks={inProgressTasks}
                    />
                  )
                },
                {
                  tabName: "Просрочены",
                  tabIcon: Cancel,
                  tabContent: (
                    <TableTask
                      tasks={expiredTasks}
                    />
                  )

                },
                {
                  tabName: "Завершенные",
                  tabIcon: Done,
                  tabContent: (
                    <TableTask
                      tasks={completeTasks}
                    />
                  )

                },
                {
                  tabName: "Все",
                  tabIcon: Reorder,
                  tabContent: (
                    <TableTask
                      tasks={tasks}
                    />
                  )

                }
              ]}
            >
            </CustomTabs>
          </GridItem>
        </GridContainer>
        <h2>
          Сообщения в группе
        </h2>
        <FeedContainer
          filter={[`SG${groupId}`]}
          showMessageFor={[`SG${groupId}`]}
        />
      </div>
    </Fade>
  );
}

export default Group;
