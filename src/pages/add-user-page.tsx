import { Fragment } from "react";
import AddUserForm from "../components/users/AddUserForm";
import * as React from "react";
import { Button } from "@mui/material";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { showForm } from "../store/users-slice";
const AddUserPage = () => {
  const formShowing = useSelector((state: RootState) => state.userForm.showing);
  const dispatch = useDispatch();
  const toggleFormHandler = (e: any) => {
    e.preventDefault();
    dispatch(showForm());
  };
  return (
    <Fragment>
      {/*@ts-ignore*/}
      <h2>Add New User</h2>
      <br />
      {!formShowing && (
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={toggleFormHandler}
        >
          Add user
        </Button>
      )}
      {formShowing && <AddUserForm />}
    </Fragment>
  );
};

export default AddUserPage;
