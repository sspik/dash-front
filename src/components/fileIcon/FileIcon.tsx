import React, { FC } from 'react';
import _ from 'lodash';
import { Link, Tooltip } from "@material-ui/core";
import { formatBytes } from "utils";

import { IAttachment } from "interfaces";
import { Icon } from "./Icon";
import { makeStyles } from "@material-ui/core/styles";
import styles from 'assets/jss/components/fileIcon';

const useStyles = makeStyles(styles);

export const FileIcon: FC<IAttachment> = (props) => {
  const classes = useStyles();
  const { NAME, DOWNLOAD_URL, SIZE } = props;
  const fileType = _.last<string>(NAME.toLowerCase().split('.')) || 'file';
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
          {NAME}
        </div>
      </Link>
    </Tooltip>
  )
}
