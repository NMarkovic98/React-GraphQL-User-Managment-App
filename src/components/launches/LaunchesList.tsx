import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Launch from "./Launch";
import { useDispatch } from "react-redux";
import { gql, useLazyQuery } from "@apollo/client";
import { logout } from "../../store/login-slice";
import { Alert } from "@mui/material";
import classes from "../home/Home.module.css";
import { useHistory } from "react-router-dom";
import CircularStatic from "../UI/ProgressCircle";
const LaunchesList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const GET_CEO = gql`
    query {
      launches(limit: 10) {
        id
        launch_year
        launch_site {
          site_id
          site_name_long
          site_name
        }
        mission_name
        rocket {
          rocket_name
          rocket_type
        }
        details
      }
    }
  `;

  const [getLaunches, { loading, error, data }] = useLazyQuery(GET_CEO);

  const getLaunchesData = () => {
    try {
      getLaunches();
    } catch (err: any) {
      if (err.message === "Authentication Error") {
        dispatch(logout());
        history.push("/login");
      }
    }
  };

  if (loading) {
    return <CircularStatic />;
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Alert severity="error">An error occurred!</Alert>
      </Container>
    );
  }

  return (
    <React.Fragment>
      <button onClick={getLaunchesData} className={classes.btn}>
        Get Launches
      </button>
      <CssBaseline />
      <Container maxWidth="sm">
        {data?.launches.map((launch: {}) => {
          // @ts-ignore
          return <Launch key={launch.id} data={launch} />;
        })}
      </Container>
    </React.Fragment>
  );
};
export default LaunchesList;
