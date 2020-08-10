import React, { FC } from 'react';
import gql from "graphql-tag";
import { Helmet } from "react-helmet";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { IconButton } from "@material-ui/core"
import { Delete } from "@material-ui/icons"

import { Loading } from "components/loading/Loading";
import { CustomTabs } from "components/customTabs/CustomTabs";
import { CustomTable } from "components/table/Table";

import { IAdminResponse } from "./interfaces";

const getAdminData = gql`
  query GetAdminData {
    GetAdminData {
      result {
        user {
          _id
          userId
          expires
          isAdmin
        }
        yandexMetrika {
          _id
          counter
          bitrixGroupId
        }
        topvisor {
          _id
          bitrixGroupId
          projectId
        }
      }
    }
  }
`

const deleteUser = gql`
  mutation DeleteUser($id: ID!) {
    DeleteUser(id: $id)
  }
`

const Admin: FC = (props) => {
  const {
    data,
    loading,
    error,
    refetch
  } = useQuery<IAdminResponse>(getAdminData, {
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true
  })
  const [ DeleteUser ] = useMutation(deleteUser);
  if (error) return <p>{ error.message }</p>;
  if (!data && loading) return <Loading />;
  const adminData = data!.GetAdminData.result;
  const handleDeleteUser = async (id: string) => {
    try {
      await DeleteUser({ variables: {id} });
      refetch();
    } catch (e) {}
  }
  const users = {
    labels: [
      "ID",
      "ID в Bitrix24",
      "Время жизни токена",
      "Тип пользователя",
      ""
    ],
    data: adminData.user.map((user) => {
      return [
        user._id.toString(),
        user.userId.toString(),
        user.expires.toString(),
        user.isAdmin ? "Админ" : "Пользователь",
        (<IconButton
          onClick={() => handleDeleteUser(user._id)}
        >
          <Delete color="primary" />
        </IconButton>)
      ]
    })
  };
  const topvisor = {
    labels: ["ID", "ID группы Bitrix24", "ID проекта в сервисе"],
    data: adminData.topvisor.map((t) => {
      return [
        t._id,
        t.bitrixGroupId,
        t.projectId
      ]
    })
  };
  const yandexMetrika = {
    labels: ["ID", "ID группы Bitrix24", "ID счётчика"],
    data: adminData.yandexMetrika.map((y) => {
      return [
        y._id,
        y.bitrixGroupId,
        y.counter
      ]
    })
  }
  return (
    <div>
      <Helmet>
        <title>Админка</title>
      </Helmet>
      <CustomTabs
        headerColor="primary"
        fullWidth
        tabs={
          [{
              tabName: "Пользователи",
              tabContent: (
                <CustomTable
                  tableHeaderColor="warning"
                  tableHead={users.labels}
                  tableData={users.data}
                />
                )
            },
            {
              tabName: "Topvisor",
              tabContent: (
                <CustomTable
                  tableHeaderColor="warning"
                  tableHead={topvisor.labels}
                  tableData={topvisor.data}
                />
              )
            },
            {
            tabName: "Я.Метрика",
            tabContent: (
              <CustomTable
                tableHeaderColor="warning"
                tableHead={yandexMetrika.labels}
                tableData={yandexMetrika.data}
              />
            )
          }]
        }
      />
    </div>
  )
}

export default Admin;