import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

import styles from 'assets/jss/components/footerStyle';


const useStyles = makeStyles(styles);

export const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://akiwa.ru/"
                className={classes.block}
                target="_blank"
                rel="noopener noreferrer"
              >
                Сайт
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://akiwa.ru/services/"
                className={classes.block}
                target="_blank"
                rel="noopener noreferrer"
              >
                Услуги
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://akiwa.ru/nashi-dostizheniya/"
                className={classes.block}
                target="_blank"
                rel="noopener noreferrer"
              >
                Портфолио
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://akiwa.ru/blog/"
                className={classes.block}
                target="_blank"
                rel="noopener noreferrer"
              >
                Блог
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://akiwa.ru/contact/"
                className={classes.block}
                target="_blank"
                rel="noopener noreferrer"
              >
                Контакты
              </a>
            </ListItem>
          </List>
        </div>
      </div>
    </footer>
  )
}
