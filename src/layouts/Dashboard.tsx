import React, { FC, createRef, useState, Suspense } from "react";
import { v4 as uuid4 } from "uuid";
import { Switch, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { Header } from "components/navbars/Navbar";
import { Footer } from "components/footer/Footer";
import { Sidebar } from "components/sidebar/Sidebar";
import { Loading } from "components/loading/Loading";

import { routes } from "routes";
import styles from "assets/jss/layouts/dashboardStyle";
import sidebarImage from "assets/img/sidebar.jpg";
import logo from "assets/img/akiwa.svg";
import { client, GET_PROFILE } from "../index";
import {ScrollButton} from "./ScrollButton";

const useStyles = makeStyles(styles);
const SwitchRoutes: FC = () => {
  const data = client.readQuery({query: GET_PROFILE});
  const isAdmin = data.GetProfile.ADMIN;
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        { routes
          .filter((prop) => isAdmin ? true : !prop.isAdmin)
          .map((prop) => {
            if (prop.layout === "/dashboard") {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={uuid4()}
                  exact={prop.exact}
                />
              );
            }
            return null;
          }) }
      </Switch>
    </Suspense>
  )
};



export const Dashboard: FC = ({ ...rest }) => {
  const classes = useStyles();
  const mainPanel = createRef<any>();
  const color = "purple";

  const data = client.readQuery({query: GET_PROFILE});
  const isAdmin = data.GetProfile.ADMIN;

  const [ mobileOpen, setMobileOpen ] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes.filter((prop) => isAdmin ? true : !prop.isAdmin)}
        logoText={"Акива"}
        logo={logo}
        image={sidebarImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        bgColor={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Header
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}><SwitchRoutes /></div>
        </div>
        <ScrollButton contentRef={mainPanel}/>
        <Footer />
      </div>
    </div>
  )
}
