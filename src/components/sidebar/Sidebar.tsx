import React from 'react';
import { iBgColor, IDashboardRoute } from "interfaces";
import { v4 as uuid4 } from "uuid";
import styles from 'assets/jss/components/sidebarStyle';
import classNames from 'classnames';

import {Link, NavLink} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Drawer from '@material-ui/core/Drawer';
import { AdminNavbarLinks } from "components/navbars/AdminNavbarLinks";


const useStyles = makeStyles(styles);

interface ISidebarProps {
  handleDrawerToggle: () => void;
  bgColor: iBgColor;
  color: iBgColor;
  logo: string;
  image?: string;
  logoText: string;
  routes: Array<IDashboardRoute>;
  open: boolean;
}

export const Sidebar: React.FC<ISidebarProps> = (props) => {
  const classes = useStyles();
  const { color, logo, image, logoText, routes } = props;

  const activeRoute = (routeName: IDashboardRoute['name']): boolean => {
    return window.location.href.indexOf(routeName) > -1;
  }

  const links = (
    <List className={classes.list}>
      { routes.filter(prop => prop.sidebar).map((prop) => {
        const listItemClasses = classNames({
          [" " + classes[color]]: activeRoute(prop.layout + prop.path)
        });
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={classes.item}
            activeClassName="active"
            key={uuid4()}
          >
            <ListItem
              button
              className={classes.itemLink + listItemClasses}
            >
              { prop.icon
                ? <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses)}
                />
                : null
              }
              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, whiteFontClasses)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        )
      }) }
    </List>
  );

  const brand = (
    <div className={classes.logo}>
      <Link
        to="/dashboard/feed"
        className={classes.logoLink}
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        { logoText }
      </Link>
    </div>
  )

  return (
    <div>
      <Hidden
        mdUp
        implementation="css"
      >
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
          </div>
          {image ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="right"
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  )
}
