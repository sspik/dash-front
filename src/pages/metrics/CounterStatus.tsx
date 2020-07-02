import React, { FC } from 'react';
import moment from "moment";
import { Card, CardBody, CardHeader } from "components/card";
import { GridContainer, GridItem } from "components/grid";

import { ICounter } from "interfaces";

import { makeStyles } from "@material-ui/core";
import styles from "assets/jss/pages/metricCounterStatusStyle";

const useStyles = makeStyles(styles);

const statusText = {
  Active: "Счетчик активен",
  Deleted: "Счетчик удален"
}

const codeStatusText = {
  CS_ERR_INFECTED: "не удалось проверить (сайт, на котором " +
    "установлен счетчик или одно из его зеркал находится в " +
    "списке зараженных сайтов)",
  CS_ERR_OTHER_HTML_CODE: "установлен другой счетчик",
  CS_NOT_FOUND: "Не установлен",
  CS_ERR_CONNECT: "Не удалось проверить (ошибка соединения)",
  CS_ERR_TIMEOUT: "Не удалось проверить (превышено время ожидания)",
  CS_OK: "Корректно установлен"
}

const permissionText = {
  view: "Гостевой счетчик с уровнем доступа «только просмотр»;",
  edit: "гостевой счетчик с уровнем доступа «полный доступ»",
  own: "Принадлежит пользователю"
}

const filterRobotsText = {
  0: "Учитывает визиты всех роботов",
  1: "Фильтрует роботов только по строгим правилам",
  2: "Фильтрует роботов по строгим правилам и по поведению",
}


export const CounterStatus: FC<ICounter> = (props) => {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>
          Информация о счётчике
        </h4>
      </CardHeader>
      <CardBody>
        <GridContainer>

          <GridItem xs={6} sm={4} md={2}>
            <Card className={classes.counterCard}>
              <CardHeader color="info" className={classes.counterCardHeader}>
                Имя
              </CardHeader>
              <CardBody className={classes.counterCardBody}>
                { props.name }
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={6} sm={4} md={2}>
            <Card className={classes.counterCard}>
              <CardHeader color="info" className={classes.counterCardHeader}>
                Сайт
              </CardHeader>
              <CardBody className={classes.counterCardBody}>
                { props.site }
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={6} sm={4} md={2}>
            <Card className={classes.counterCard}>
              <CardHeader color="info" className={classes.counterCardHeader}>
                Дата создания
              </CardHeader>
              <CardBody className={classes.counterCardBody}>
                { moment(props.create_time).format("DD.MM.YYYY") }
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={6} sm={4} md={2}>
            <Card className={classes.counterCard}>
              <CardHeader color="info" className={classes.counterCardHeader}>
                Номер
              </CardHeader>
              <CardBody className={classes.counterCardBody}>
                { props.id }
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={6} sm={4} md={2}>
            <Card className={classes.counterCard}>
              <CardHeader
                color={props.status === "Active" ? "info" : "danger"}
                className={classes.counterCardHeader}
              >
                Статус
              </CardHeader>
              <CardBody className={classes.counterCardBody}>
                { statusText[props.status] }
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={6} sm={4} md={2}>
            <Card className={classes.counterCard}>
              <CardHeader
                color={props.code_status === "CS_OK" ? "info" : "danger"}
                className={classes.counterCardHeader}
              >
                Статус счётчика
              </CardHeader>
              <CardBody className={classes.counterCardBody}>
                { codeStatusText[props.code_status] }
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={6} sm={4} md={2}>
            <Card className={classes.counterCard}>
              <CardHeader color="info" className={classes.counterCardHeader}>
                Владелец
              </CardHeader>
              <CardBody className={classes.counterCardBody}>
                { props.owner_login }
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={6} sm={4} md={2}>
            <Card className={classes.counterCard}>
              <CardHeader color="info" className={classes.counterCardHeader}>
                Права
              </CardHeader>
              <CardBody className={classes.counterCardBody}>
                { permissionText[props.permission] }
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={6} sm={4} md={2}>
            <Card className={classes.counterCard}>
              <CardHeader color="info" className={classes.counterCardHeader}>
                Зеркала
              </CardHeader>
              <CardBody className={classes.counterCardBody}>
                { props.mirrors ? props.mirrors.join(', ') : "Зеркала отсуствуют" }
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={6} sm={4} md={2}>
            <Card className={classes.counterCard}>
              <CardHeader color="info" className={classes.counterCardHeader}>
                Роботы
              </CardHeader>
              <CardBody className={classes.counterCardBody}>
                { filterRobotsText[props.filter_robots] }
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={6} sm={4} md={2}>
            <Card className={classes.counterCard}>
              <CardHeader color="info" className={classes.counterCardHeader}>
                Временная зона
              </CardHeader>
              <CardBody className={classes.counterCardBody}>
                { props.time_zone_name }
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={6} sm={4} md={2}>
            <Card className={classes.counterCard}>
              <CardHeader
                color={props.errors && props.errors.length ? "danger" : "info" }
                className={classes.counterCardHeader}
              >
                Ошибки
              </CardHeader>
              <CardBody className={classes.counterCardBody}>
                { props.errors ? props.errors.map(e => e.message).join(', ') : "Ошибок не найдено" }
              </CardBody>
            </Card>
          </GridItem>

        </GridContainer>
      </CardBody>
    </Card>
  )
}
