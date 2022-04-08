import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { login, hideLoginForm } from "../../store/login-slice";
import { useHistory } from "react-router";

type Inputs = {
  username: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const hideFormHandler = () => {
    dispatch(hideLoginForm());
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(login(data));

    const location = localStorage.getItem("token") ? "/home" : "/login";
    history.push(`${location}`);
  };

  return (
    <form
      data-testid="form"
      style={{ marginTop: "100px" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("username", { required: true })}
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="username"
        variant="outlined"
        data-testid="username"
      />
      <div data-testid="loginError">
        {errors.username && "This field is required"}
      </div>

      <br />
      <TextField
        {...register("password", { required: true })}
        style={{ width: "200px", margin: "5px" }}
        type="password"
        label="password"
        variant="outlined"
        data-testid="password"
        data-cy="password"
      />
      <div data-testid="loginError">
        {errors.username && "This field is required"}
      </div>
      <div>
        <Button
          data-testid="cancel"
          style={{
            marginRight: "10px",
            marginTop: "10px",
          }}
          variant="contained"
          onClick={hideFormHandler}
        >
          Cancel
        </Button>
        <Button
          data-testid="login"
          style={{
            marginTop: "10px",
          }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </div>
    </form>
  );
};
export default LoginForm;
