import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Cookies from 'js-cookie';
import { Redirect } from "react-router";

import { makeStyles, createStyles } from "@material-ui/core";

import { RegularButton } from "components/button/Button";

import { Logo } from 'components/logo/Logo';
import logoImage from 'assets/img/logo-dark.svg';

const useStyles = makeStyles( createStyles({
  loginForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "calc(100vh - 100px)",
    maxWidth: 408,
    margin: "0 auto",
    padding: 10
  },
  loginForm__Button: {
    maxWidth: 408,
    alignSelf: "center",
  }
}))


const LoginPage: React.FC = () => {

  const classes = useStyles();
  const [ ,setState ] = useState({
    rerender: false
  })

  async function handleClick() {
    window.open(
      '/auth/client',
      '_blank',
    );
    let checkToken = await setInterval(() => {
      if (Cookies.get('token')) {
        clearInterval(checkToken);
        setState({rerender: true})
      }
    }, 1000);
  }

  return Cookies.get('token')
    ? <Redirect to="/" />
    : (
      <div className={classes.loginForm}>
        <Helmet>
          <title>Войти</title>
        </Helmet>
        <Logo
          image={logoImage}
          width={408}
          height={152}
        />
        <RegularButton
          onClick={handleClick}
          color="rose"
          className={classes.loginForm__Button}
        >
          Авторизоваться
        </RegularButton>
      </div>
    )
}
export default LoginPage;