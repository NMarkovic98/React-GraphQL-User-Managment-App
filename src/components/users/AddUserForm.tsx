import { Button, TextField } from "@mui/material";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { hideForm } from "../../store/users-slice";
import { addUserStyleHook } from "../../styles/syleHooks";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";

import CircularStatic from "../UI/ProgressCircle";
import { INSERT_USER } from "../../queries/queries";
import { ErrorMessage } from "@hookform/error-message";
import { useToasts } from "react-toast-notifications";

const AddUserForm = () => {
  const classes = addUserStyleHook({
    marginRight: 50,
    marginTop: 10,
    color: "red",
  });
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const closeFormHandler = () => {
    dispatch(hideForm());
  };

  type Inputs = {
    id: string;
    username: string;
    rocket: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const [addUser, { loading, error }] = useMutation(INSERT_USER);

  const createUuid = () => {
    /*@ts-ignore*/
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };

  const onSubmit: SubmitHandler<Inputs> = (dataSubmit) => {
    const randUuid = createUuid();
    try {
      addUser({
        variables: {
          id: randUuid,
          name: dataSubmit.username,
          rocket: dataSubmit.rocket,
        },
      });

      addToast(`user ${dataSubmit.username} added successfully`, {
        autoDismiss: true,
        autoDismissTimeout: 5000,
        appearance: "success",
      });
    } catch (errorMessage: any) {
      console.log(errorMessage);
    }
    reset();
  };

  if (loading) {
    return <CircularStatic />;
  }

  if (error) {
    return <p className={classes.error}>Something went wrong</p>;
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="username"
          /*@ts-ignore*/
          name="username"
          variant="outlined"
          {...register("username", { required: "This is required." })}
        />
        <br />
        <ErrorMessage errors={errors} name="username" />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="rocket"
          variant="outlined"
          /*@ts-ignore*/
          name="rocket"
          {...register("rocket", { required: "This is required." })}
        />
        <br />
        <ErrorMessage errors={errors} name="rocket" />
        <br />
        <Button
          className={classes.root}
          type="submit"
          variant="contained"
          color="primary"
        >
          save
        </Button>
        <Button
          className={classes.close}
          onClick={closeFormHandler}
          variant="contained"
          color="primary"
        >
          close
        </Button>
      </form>
    </Fragment>
  );
};

export default AddUserForm;
