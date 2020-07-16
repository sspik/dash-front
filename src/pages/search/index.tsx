import React, { FC } from 'react';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { GridContainer, GridItem } from "components/grid";
import { WorkGroupShort } from "components/workGroup/WorkGroupShort";
import { Loading } from "components/loading/Loading";

import { ISearchProps, ISearchGroupResponse } from "./interfaces";

const searchGroupByNameQuery = gql`
  query searchGroup($name: String!){
    SearchGroupByName(name: $name){
      ID
      NAME
      DESCRIPTION
      NUMBER_OF_MEMBERS
    }
  }
`

const Search: FC<ISearchProps> = (props) => {
  const search = props.location.state ? props.location.state.search.value : ""
  const { data, loading, error } = useQuery<ISearchGroupResponse>(searchGroupByNameQuery, {
    variables: {name: search}
  });
  if (!data && loading) return <Loading />;
  if (error) return <p>{ error }</p>
  return (
    <div>
      <h2>Результаты поиска</h2>
      <GridContainer>
        { data ? data.SearchGroupByName.map(group => {
          return (
            <GridItem xs={12} sm={6} md={3} key={group.ID}>
              <WorkGroupShort { ...group } />
            </GridItem>
          )
        }) : <p>Нет групп с вашим участием</p> }
      </GridContainer>
    </div>
  )
}
export default Search;