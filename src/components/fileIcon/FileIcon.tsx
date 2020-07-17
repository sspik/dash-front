import React, { FC } from 'react';
import _ from 'lodash';
import { Link, Tooltip } from "@material-ui/core";
import { formatBytes } from "utils";

import { Icon } from "./Icon";
import { makeStyles } from "@material-ui/core/styles";
import styles from 'assets/jss/components/fileIcon';
import iconsName from "./iconsName";

import { IAttachment } from "./interfaces";

const useStyles = makeStyles(styles);

export const FileIcon: FC<IAttachment> = (props) => {
  const classes = useStyles();
  const { NAME, DOWNLOAD_URL, SIZE } = props;
  let fileType = _.last<string>(NAME.toLowerCase().split('.')) || 'file';
  if (!iconsName.includes(fileType)) fileType = 'file';
  return (
    <Tooltip
      title={formatBytes(SIZE)}
      placement="top-end"
    >
      <Link
        href={DOWNLOAD_URL}
        className={classes.iconContainer}
      >
        <div className={classes.iconIcon}>
          <Icon
            fileType={fileType}
            downloadUrl={DOWNLOAD_URL}
            name={NAME}
          />
        </div>
        <div className={classes.iconText}>
          { NAME.length > 20
            ? `${NAME.slice(0, 20)}...`
            : NAME
          }
        </div>
      </Link>
    </Tooltip>
  )
}
