import React, { FC, Fragment } from 'react';
import moment from 'moment';
import { IFeed } from "interfaces";
import { BBCode } from "components/BBcode/BBcode";
import {GridContainer, GridItem} from "components/grid";
import {FileIcon} from "components/fileIcon/FileIcon";

import {
  Card,
  CardAvatar,
  CardBody,
  CardFooter,
  CardHeader
} from "components/card";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import styles from "assets/jss/components/feedItemStyle";

const useStyles = makeStyles(styles);


export const FeedItem: FC<IFeed> = (props) => {
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
            { AUTHOR ?
              <CardAvatar profile className={classes.cardAvatar}>
                <img
                  alt={`${AUTHOR.NAME} ${AUTHOR.LAST_NAME}`}
                  src={AUTHOR.PERSONAL_PHOTO}
                  className={classes.cardAvatarImg}
                />
              </CardAvatar> : null
            }
            <h4 className={classes.cardTitleWhite}>
              { AUTHOR && AUTHOR.NAME
                ? `${AUTHOR.NAME} ${AUTHOR.LAST_NAME}`
                : 'Сотрудник компании' }
            </h4>
          </CardHeader>
          <CardBody profile>
            <Typography variant="body2">
              <BBCode content={ DETAIL_TEXT } />
            </Typography>
          </CardBody>
          <CardFooter className={classes.footer}>
            <div>
              Опубликованно { moment(DATE_PUBLISH).fromNow() }
            </div>
          </CardFooter>
        </Card>
      </GridItem>
      { Array.isArray(FILES) && FILES.length > 0
        ? <GridItem xs={12} sm={5} md={5}>
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
        : null
      }
    </Fragment>
  )
};
