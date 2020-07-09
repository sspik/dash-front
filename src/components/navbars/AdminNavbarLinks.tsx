import React, { ChangeEvent, FC, useState } from 'react';
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";

import { CustomInput } from "components/input/CustomInput";
import { RegularButton } from "components/button/Button";

import styles from 'assets/jss/components/headerLinkStyle';


const useStyles = makeStyles(styles);

export const AdminNavbarLinks: FC = () => {

  const classes = useStyles();
  const [search, changeSearch] = useState<{value: string}>({value: ""})
  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    changeSearch({value: event.target.value})
  }
  return (
    <div>
      <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          inputProps={{
            placeholder: "Поиск группы",
            inputProps: {
              "aria-label": "Search"
            },
            onChange: handleChangeSearch,
            value: search.value
          }}
        />
        <Link
          to={{
            pathname: "/dashboard/search",
            state: { search }
          }}
        >
          <RegularButton
            color="white"
            aria-label="edit"
            justIcon
            round
          >
            <Search />
          </RegularButton>
        </Link>
      </div>
    </div>
  )
}
