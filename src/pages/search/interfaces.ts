import { RouteComponentProps } from "react-router";
import { IBitrixGroup } from "interfaces";

export interface ISearchGroupResponse {
  SearchGroupByName: IBitrixGroup[];
}

interface ISearchParams {
  search: {
    value: string
  }
}

export interface ISearchProps extends RouteComponentProps<{},{}, ISearchParams> {}