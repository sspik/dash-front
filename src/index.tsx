import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { HttpLink } from 'apollo-link-http';
import {
  Route,
  Switch,
  BrowserRouter,
  Redirect
} from "react-router-dom";

import { LoginPage } from "./pages/login";
import { Dashboard } from "./layouts/Dashboard";

import gql from "graphql-tag";
import { IProfile } from "./interfaces";
import { PrivateRouter } from "./routes";
import { Query } from "@apollo/react-components";

import 'normalize.css';
import 'assets/css/style.css';
import 'assets/css/icon.css';
import {
  primaryColor,
  successColor,
  warningColor,
  roseColor,
} from 'assets/jss/all';

import { ruRU } from "@material-ui/core/locale"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import moment from "moment";
import 'moment/locale/ru';

moment.locale('ru');

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor[0]
    },
    warning: {
      main: warningColor[0]
    },
    success: {
      main: successColor[0]
    },
    secondary: {
      main: roseColor[0]
    }
  }
}, ruRU);

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: '/graphql',
    credentials: 'include',
  }),
  connectToDevTools: true,
});

export const GET_PROFILE = gql`
  {
    GetProfile {
      ID
      NAME
      LAST_NAME
      PERSONAL_PHOTO
    }
  }
`
ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Switch>
          <Route exact path="/login" component={ LoginPage } />
          <PrivateRouter exact path="/">
            <Redirect to="/dashboard/feed" />
          </PrivateRouter>
          <Fragment>
            <Query<IProfile> query={GET_PROFILE}>
              {({ loading, data, client }) => {
                if (loading) return <Fragment />;
                if (data) {
                  client.writeQuery({
                    query: GET_PROFILE,
                    data
                  })
                }
                return (
                  <Fragment>
                    <PrivateRouter path="/dashboard" component={ Dashboard } />
                    {/*TODO Разобраться с редиректом*/}
                  </Fragment>
                )
              }}
            </Query>
          </Fragment>
        </Switch>
      </ApolloProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
