import React from 'react';
import Cookies from 'js-cookie';
import { Redirect, Route } from "react-router";
import { IDashboardRoute } from "./interfaces";
import { List, Dashboard as Dash, Build } from "@material-ui/icons";
import * as Pages from "pages";

export const PrivateRouter = ({ component, ...rest }: any ): any => {
  const token = Cookies.get('token')
  const routeComponent = (props: any) => (
    token
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: '/login' }} />
  );
  return <Route {...rest} render={ routeComponent } />
}


export const routes: Array<IDashboardRoute> = [
  {
    path: "/admin",
    name: "Админка",
    icon: Build,
    component: Pages.Admin,
    isPrivate: true,
    layout: '/dashboard',
    sidebar: true,
    isAdmin: true,
  },
  {
    path: "/feed",
    name: "Живая лента",
    icon: List,
    component: Pages.Feed,
    isPrivate: true,
    layout: '/dashboard',
    sidebar: true,
    isAdmin: false
  },
  {
    path: "/groups",
    name: "Рабочие группы",
    icon: Dash,
    component: Pages.Dashboard,
    isPrivate: true,
    layout: '/dashboard',
    sidebar: true,
    isAdmin: false
  },
  {
    path: "/group/:groupId",
    name: "Группа",
    icon: Dash,
    component: Pages.Group,
    isPrivate: true,
    layout: '/dashboard',
    sidebar: false,
    exact: true,
    isAdmin: false
  },
  {
    path: "/group/:groupId/positions",
    name: "Позиции сайта",
    icon: Dash,
    component: Pages.Positions,
    isPrivate: true,
    layout: '/dashboard',
    sidebar: false,
    exact: true,
    isAdmin: false
  },
  {
    path: "/group/:groupId/metrics",
    name: "Посещаемость сайта",
    icon: Dash,
    component: Pages.Metrics,
    isPrivate: true,
    layout: '/dashboard',
    sidebar: false,
    exact: true,
    isAdmin: false
  },
  {
    path: "/task/:taskId",
    name: "Задача",
    icon: Dash,
    component: Pages.Task,
    isPrivate: true,
    layout: '/dashboard',
    sidebar: false,
    isAdmin: false
  },
  {
    path: "/search",
    name: "Поиск",
    component: Pages.Search,
    isPrivate: true,
    layout: '/dashboard',
    sidebar: false,
    isAdmin: false
  }
]
