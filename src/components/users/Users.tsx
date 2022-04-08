import { DataGrid } from '@mui/x-data-grid';
import { useMutation, useQuery } from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, CircularProgress } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import CircularStatic from '../UI/ProgressCircle';
import React, { Fragment, useEffect, useState } from 'react';
import { DELETE_USER, GET_USERS } from '../../queries/queries';
import { userOverviewStyleHook } from '../../styles/syleHooks';
import BasicMenu from '../layout/PopupMenu';
import RefreshIcon from '@mui/icons-material/Refresh';
import { AppearanceTypes, useToasts } from 'react-toast-notifications';

interface User {
  __typename: string;
  name: string;
  rocket: string;
  id: string;
}
interface ToastOptions {
  autoDismiss: boolean;
  autoDismissTimeout: number;
  appearance: AppearanceTypes;
}
const Users = () => {
  const { addToast } = useToasts();
  const classes = userOverviewStyleHook({
    marginRight: 50,
    marginTop: 10,
    color: 'red',
  });
  const [selectionModel, setSelectionModel] = useState([]);
  const [disabledButton, setDisabledButton] = useState(true);

  const { loading, error, data, refetch } = useQuery(GET_USERS);

  const [deleteUser, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_USER);

  let tableData = {
    columns: [
      {
        field: 'id',
        headerName: 'id',
        width: '300',
      },
      {
        field: 'name',
        headerName: 'Name',
        width: 200,
      },
      {
        field: 'rocket',
        headerName: 'Rocket',
        width: 200,
        editable: false,
      },
      {
        disableColumnMenu: true,
        field: 'action',
        headerName: 'Action',
        sortable: false,
        width: 1500,
        headerAlign: 'right',
        align: 'right',
        // PopupMenu
        renderCell: (params: any) => {
          const stopPropagation = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
          };

          return (
            <BasicMenu
              selectionModel={selectionModel}
              deleteUser={deleteUserHandler}
              stopPropagation={stopPropagation}
              userId={params.id}
            />
          );
        },
      },
      {
        disableColumnMenu: true,
        headerName: 'refresh',
        headerAlign: 'right',
        sortable: false,
        field: 'refresh',
        // Refresh button
        renderHeader: (params: any) => {
          return (
            <RefreshIcon
              className={classes.refreshButton}
              onClick={() => refetch()}
            />
          );
        },
      },
    ],
    rows: [],
    initialState: {
      columns: {
        columnVisibilityModel: {
          id: false,
        },
      },
    },
  };

  // Disable delete button if nothing selected
  useEffect(() => {
    setDisabledButton(selectionModel.length === 0);
  }, [selectionModel]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const findUser = (): User => {
    // @ts-ignore
    return tableData.rows.find(
      (user: { id: string }) => user.id === selectionModel[0]
    );
  };

  const setupToast = (user: User) => {
    const toastMessage = `${
      selectionModel.length === 1 ? user.name : selectionModel.length + ' users'
    } deleted successfully`;
    const options: ToastOptions = {
      autoDismiss: true,
      autoDismissTimeout: 5000,
      appearance: 'success',
    };
    return { toastMessage, options };
  };

  const deleteUserHandler = () => {
    if (selectionModel.length === 0) {
      const options: ToastOptions = {
        autoDismiss: true,
        autoDismissTimeout: 3000,
        appearance: 'warning',
      };
      addToast('Please select user!', options);
      return;
    }
    const userToDelete: User = findUser();

    const { toastMessage, options } = setupToast(userToDelete);

    addToast(toastMessage, options);

    selectionModel.forEach((id: any) => {
      deleteUser({
        variables: {
          id: id,
        },
      });
    });

    setSelectionModel([]);
    refetch();
  };

  if (data) {
    tableData.rows = data.users;
  }

  if (error || deleteError) {
    return <p>Something went wrong</p>;
  }

  if (loading || deleteLoading) {
    return <CircularProgress />;
  }

  return (
    <Fragment>
      <div className={classes.userActionsContainer}>
        <div className={classes.tableContainer}>
          <div style={{ height: 650, width: '100%' }}>
            <div style={{ height: 650, width: '100%' }}>
              {(loading || deleteLoading) && <CircularStatic />}
              {data && (
                <DataGrid
                  {...tableData}
                  checkboxSelection
                  /*@ts-ignore*/
                  onSelectionModelChange={setSelectionModel}
                  selectionModel={selectionModel}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.buttonsContainer}>
        <Button
          className={classes.root}
          onClick={deleteUserHandler}
          variant="outlined"
          startIcon={<DeleteIcon />}
          disabled={disabledButton}
        >
          Delete
        </Button>
      </div>
    </Fragment>
  );
};
export default Users;
