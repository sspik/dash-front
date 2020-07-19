import React, { FC, Fragment, useState } from 'react';
import moment from 'moment';

import {
  makeStyles,
  Collapse,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@material-ui/icons";

import { BBCode } from "components/BBcode/BBcode";
import { GridContainer, GridItem } from "components/grid";
import { FileIcon } from "components/fileIcon/FileIcon";
import {
  Card,
  CardAvatar,
  CardBody,
  CardFooter,
  CardHeader
} from "components/card";
import { IFeed } from "./interfaces";

import styles from "assets/jss/components/feedItemStyle";

const useStyles = makeStyles(styles);

export const FeedItem: FC<IFeed> = (props) => {
  const [ state, setState ] = useState(false);
  const handleCollapse = () => setState(!state);
  const classes = useStyles();
  const {
    AUTHOR,
    DETAIL_TEXT,
    DATE_PUBLISH,
    FILES
  } = props;
  return (
    <Fragment>
      <GridItem xs={12} sm={7} md={7}>
        <Card className={classes.feedCard}>
          <CardHeader color="primary" className={classes.header}>
            { AUTHOR &&
              <CardAvatar profile className={classes.cardAvatar}>
                <img
                  alt={`${AUTHOR.NAME} ${AUTHOR.LAST_NAME}`}
                  src={AUTHOR.PERSONAL_PHOTO}
                  className={classes.cardAvatarImg}
                />
              </CardAvatar>
            }
            <h4 className={classes.cardTitleWhite}>
              { AUTHOR && AUTHOR.NAME
                ? `${AUTHOR.NAME} ${AUTHOR.LAST_NAME}`
                : 'Сотрудник компании' }
            </h4>
          </CardHeader>
          <CardBody profile>
            <Collapse in={state} collapsedHeight={150}>
              <div>
                  <BBCode content={ DETAIL_TEXT } />
              </div>
            </Collapse>
            <div
              className={classes.collapse}
              style={{
                display: DETAIL_TEXT
                  .split('\n')
                  .filter(chunk => chunk.length > 0)
                  .length > 5 ? "flex" : "none"
              }}
            >
              <Tooltip
                title={ state ? "Свернуть" : "Развернуть" }
              >
                <IconButton
                  size="small"
                  onClick={ handleCollapse }
                >
                  { state
                    ? <KeyboardArrowUp color="primary" />
                    : <KeyboardArrowDown color="primary" />
                  }
                </IconButton>
              </Tooltip>
            </div>
          </CardBody>
          <CardFooter className={classes.footer}>
            <div>
              Опубликованно { moment(DATE_PUBLISH).fromNow() }
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      { Array.isArray(FILES) && FILES.length > 0
        && <GridItem xs={12} sm={5} md={5}>
          <Card className={classes.fileCardBody}>
            <CardBody>
              <GridContainer>
                { FILES!.map(f => (
                  <GridItem
                    className={classes.feedItem}
                    key={f.ID}
                    md={4}
                  >
                    <FileIcon
                      { ...f }
                    />
                  </GridItem>
                )) }
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      }
    </Fragment>
  )
};
