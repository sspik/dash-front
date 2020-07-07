import React, {
  ChangeEvent,
  FC,
  ReactNode,
  useState
} from 'react';

import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { SvgIconTypeMap, Tab, Tabs } from "@material-ui/core"
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

import { Card, CardBody, CardHeader } from "components/card";
import styles from "assets/jss/components/customTabsStyle";
import { iHeaderColor } from "interfaces";

const useStyles = makeStyles(styles);

interface ICustomTabsProps {
  headerColor: iHeaderColor;
  title?: string;
  tabs: Array<{
    tabName: string;
    tabIcon?: OverridableComponent<SvgIconTypeMap>;
    tabContent: ReactNode;
  }>;
  plainTabs?: boolean;
  fullWidth?: boolean;
}

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
          { tabs.map((prop, key) => {
            let icon = prop.tabIcon ? { icon: <prop.tabIcon /> } : {}
            return (
              <Tab
                classes={{
                  root: classes.tabRootButton,
                  selected: classes.tabSelected,
                  wrapper: classes.tabWrapper
                }}
                key={key}
                label={prop.tabName}
                {...icon}
              />
            )
          }) }
        </Tabs>
      </CardHeader>
      <CardBody>
        {tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>;
          }
          return null;
        })}
      </CardBody>
    </Card>
  )
}
