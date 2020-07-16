import { ReactNode } from "react";
import { InputLabelProps } from "@material-ui/core/InputLabel";
import { InputProps } from "@material-ui/core/Input";
import { FormControlProps } from "@material-ui/core/FormControl";

export interface ICustomInputProps {
  labelText?: ReactNode;
  labelProps?: InputLabelProps;
  id?: string;
  inputProps?: InputProps;
  formControlProps?: FormControlProps;
  error?: boolean;
  success?: boolean;
}