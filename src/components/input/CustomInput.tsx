import React, { FC } from "react";
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";

import { ICustomInputProps } from "./interfaces";

import styles from 'assets/jss/components/inputStyle';


const useStyles = makeStyles(styles);

export const CustomInput: FC<ICustomInputProps> = (props) => {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success
  } = props;
  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  });
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps?.className + " " + classes.formControl}
    >
      { labelText ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          { ...labelProps }
        >
          { labelText }
        </InputLabel>
      ) : null }
      <Input
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses
        }}
        id={id}
        {...inputProps}
      />
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  )
};

