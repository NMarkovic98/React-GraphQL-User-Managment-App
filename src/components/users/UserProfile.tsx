import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader, CircularProgress,
  Divider,
  Grid,
  TextField,
} from '@mui/material';
import { useParams } from "react-router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "../../queries/queries";
import { SubmitHandler, useForm } from "react-hook-form";
import { userProfileStyleHook } from "../../styles/syleHooks";
import { useHistory } from "react-router-dom";
import Container from "@mui/material/Container";
import CircularStatic from "../UI/ProgressCircle";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";

export const AccountProfileDetails = () => {
  const classes = userProfileStyleHook({});
  const history = useHistory();
  const userId: { userId: string } = useParams();

  const FIND_USER = gql`
    query {
      users(where: { id: { _eq: "${userId.userId}" } }) {
        id
       name
       rocket
      }
    }
  `;
  const { loading, error, data } = useQuery(FIND_USER);

  const [
    updateUser,
    { error: updateError, loading: updateLoading, data: updateData },
  ] = useMutation(UPDATE_USER);

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

  const onSubmit: SubmitHandler<Inputs> = (dataSubmit) => {
    updateUser({
      variables: {
        id: userId.userId,
        name: dataSubmit.username,
        rocket: dataSubmit.rocket,
      },
    });
    history.push("/users-overview");
    reset();
  };

  if (data || updateData) {
    console.log(data);
  }
  if (error || updateError) {
    console.log("error");
  }
  if (loading || updateLoading) {
     return <CircularProgress/>;
  }

  // @ts-ignore
  return (
    <Container className={classes.editProfileContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  /*@ts-ignore*/
                  name="username"
                  variant="outlined"
                  {...register("username", {
                    required: "Username is required.",
                  })}
                />
                <br />
                <ErrorMessage errors={errors} name="username" />
                <br />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Rocket"
                  /*@ts-ignore*/
                  name="rocket"
                  variant="outlined"
                  {...register("rocket", { required: "Rocket is required." })}
                />
                <br />
                <ErrorMessage errors={errors} name="rocket" />
                <br />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button type="submit" color="primary" variant="contained">
              Save
            </Button>
          </Box>
        </Card>
      </form>
    </Container>
  );
};
