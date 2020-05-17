import React from 'react';
import Cookies from 'js-cookie';
import { Redirect, Route } from "react-router";
import {IDashboardRoute} from "./interfaces";
import { List, Person, Dashboard as Dash } from "@material-ui/icons";
import { Dashboard } from "./pages/dashboard";
import { Search } from "./pages/search";
import { Profile } from "./pages/profile";
import { Feed } from "./pages/feed";
import { Group } from "./pages/group";

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
    path: "/feed",
    name: "Живая лента",
    icon: List,
    component: Feed,
    isPrivate: true,
    layout: '/dashboard',
    sidebar: true
  },
  {
    path: "/groups",
    name: "Рабочие группы",
    icon: Dash,
    component: Dashboard,
    isPrivate: true,
    layout: '/dashboard',
    sidebar: true
  },
  {
    path: "/group/:groupId",
    name: "Рабочие группы",
    icon: Dash,
    component: Group,
    isPrivate: true,
    layout: '/dashboard',
    sidebar: false
  },
  {
    path: "/search",
    name: "Поиск",
    component: Search,
    isPrivate: true,
    layout: '/dashboard',
    sidebar: false
  },
  {
    path: "/profile",
    name: "Профиль",
    icon: Person,
    component: Profile,
    isPrivate: true,
    layout: '/dashboard',
    sidebar: true
  }
]
