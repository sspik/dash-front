import React, { ChangeEvent, FC, useState } from 'react';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import gql from "graphql-tag";

import { GridItem, GridContainer } from "components/grid";
import { CustomInput } from "components/input/CustomInput";
import { RegularButton } from "components/button/Button";
import { FeedList } from "components/feed/FeedList";
import { Loading } from "components/loading/Loading";

import {
  CardHeader,
  CardBody,
  Card,
  CardFooter,
} from "components/card";
import { useQuery } from "@apollo/react-hooks";
import {IFeedResponse} from "../../interfaces";
import {Spinner} from "../../components/loading/Spinner";

const styles = createStyles({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: 300,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
});

const getFeed = gql`
  query getFeed($start: Int = 0) {
    GetFeed(start: $start) {
      next
      total
      result {
        ID
        DATE_PUBLISH
        DETAIL_TEXT
        AUTHOR {
          ID
          NAME
          LAST_NAME
          PERSONAL_PHOTO
        }
        FILES {
          NAME
          DOWNLOAD_URL
          SIZE
          ID
        }
      }
    }
  }
`;

interface IFeedState {
  start: number;
  userMessage: string;
}

const initState: IFeedState = {
  start: 0,
  userMessage: "",
}

const useStyles = makeStyles(styles);

export const Feed: FC = () => {
  const [ state, setState ] = useState<IFeedState>(initState)
  const classes = useStyles();
  const { data, loading, error, fetchMore } = useQuery<
    IFeedResponse,
    {start: number}
    >(getFeed, {
      variables: { start: state.start }
  });
  if (!data && loading) return <Loading />;
  if (error) return <p>{ error }</p>;
  const handleFetchMore = (next: number) => {
    fetchMore({
      variables: { start: next },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          ...previousResult,
          GetFeed: {
            ...previousResult.GetFeed,
            next: fetchMoreResult!.GetFeed.next,
            result: [
              ...previousResult.GetFeed.result,
              ...fetchMoreResult!.GetFeed.result
            ]
          }

        }
      }
    })
  }
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Сообщение в живую ленту</h4>
            </CardHeader>
            <CardBody>
              <CustomInput
                labelText="Введите сообщение"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  multiline: true,
                  rows: 2,
                  value: state.userMessage,
                  onChange: (event: ChangeEvent<HTMLTextAreaElement>) =>
                    setState({
                      ...state,
                      userMessage: event.target.value
                    })
                }}
              />
            </CardBody>
            <CardFooter>
              <RegularButton
                color="info"
                disabled={!!loading}
              >
                Отправить
              </RegularButton>
              { loading ? <Spinner /> : null }
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <FeedList
          { ...data!.GetFeed }
        />
      </GridContainer>
      { data!.GetFeed.next
        ? <div>
          <RegularButton
            color="primary"
            onClick={() => handleFetchMore(data!.GetFeed.next!)}
          >
            Больше сообщений
          </RegularButton>
        </div>
        : null
      }
    </div>

  )
};
