import React, { FC } from 'react';
import { IBitrixGroup } from "../../interfaces";
import { Card, CardBody, CardFooter, CardHeader } from "components/card";
import { Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core";
import { People } from '@material-ui/icons';
import { warningColor } from 'assets/jss/all';
import { RegularButton } from "../button/Button";
import {Link} from "react-router-dom";

const useStyles = makeStyles(createStyles({
  footer: {
    justifyContent: "space-between"
  },
  footerSide: {
    display: 'flex'
  }
}));

export const WorkGroupShort: FC<IBitrixGroup> = (props) => {
  const classes = useStyles();
  const description_length = 200;

  const description = props.DESCRIPTION.length > description_length
    ? props.DESCRIPTION.slice(0, description_length) + '...'
    : props.DESCRIPTION

  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <Typography>
            { props.NAME }
          </Typography>
        </CardHeader>
        <CardBody>
          { description || "Нет описания" }
        </CardBody>
        <CardFooter className={classes.footer}>
          <div className={classes.footerSide}>
            <People style={{color: warningColor[1]}} /> <b>{ props.NUMBER_OF_MEMBERS }</b>
          </div>
          <div className={classes.footerSide}>
            <Link
              to={`/dashboard/group/${props.ID}`}
            >
              <RegularButton
                color="info"
                size="sm"
              >
                Подробней
              </RegularButton>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
