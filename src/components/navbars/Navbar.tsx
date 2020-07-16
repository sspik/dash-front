import React, { FC } from "react";
import classNames from "classnames";
import _ from "lodash";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/icons/Menu";

import { AdminNavbarLinks } from "./AdminNavbarLinks";
import { RegularButton } from "components/button/Button";

import { IHeaderProps } from './interfaces';

import styles from "assets/jss/components/headerStyle";


const useStyles = makeStyles(styles);

export const Header: FC<IHeaderProps> = (props) => {
  const classes = useStyles();
  const { color } = props;
  const makeBrand = (): string => {
    let name = '';
    props.routes.forEach((prop) => {
      if (_.endsWith(
        window.location.pathname
          .replace(/\d+\/?/g, '')
          .replace(/\/$/, ''),
        prop.layout + prop.path.replace(/\/:[^/]+/g, '')
      )) name = prop.name
    })
    return name;
  }
  const appBarClasses = classNames({
    [" " + classes[color!]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <RegularButton color="transparent" className={classes.title}>
            { makeBrand() }
          </RegularButton>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}
