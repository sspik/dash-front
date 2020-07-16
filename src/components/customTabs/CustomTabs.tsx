import React, { ChangeEvent, FC, useState } from 'react';
import { v4 as uuid4 } from "uuid";

import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { Tab, Tabs } from "@material-ui/core"

import { Card, CardBody, CardHeader } from "components/card";
import styles from "assets/jss/components/customTabsStyle";

import { ICustomTabsProps } from "./interfaces";

const useStyles = makeStyles(styles);


export const CustomTabs: FC<ICustomTabsProps> = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleTabChange = (event: ChangeEvent<{}>, value: number) => {
    setValue(value);
  };
  const {
    headerColor,
    title,
    plainTabs,
    tabs,
    fullWidth
  } = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
  });
  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs}>
        { title
          ? <div className={cardTitle}>{ title }</div>
          : null
        }
        <Tabs
          value={value}
          onChange={ handleTabChange }
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone,
            // scrollButtons: classes.displayNone
          }}
          variant={ fullWidth ? "fullWidth" : "scrollable" }
          scrollButtons="auto"
        >
          { tabs.map((prop) => {
            let icon = prop.tabIcon ? { icon: <prop.tabIcon /> } : {}
            return (
              <Tab
                classes={{
                  root: classes.tabRootButton,
                  selected: classes.tabSelected,
                  wrapper: classes.tabWrapper
                }}
                key={uuid4()}
                label={prop.tabName}
                {...icon}
              />
            )
          }) }
        </Tabs>
      </CardHeader>
      <CardBody>
        { tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>;
          }
          return null;
        }) }
      </CardBody>
    </Card>
  )
}
