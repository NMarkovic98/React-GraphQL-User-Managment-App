import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { gql, useLazyQuery } from "@apollo/client";
import { logout } from "../../store/login-slice";
import { Alert, CircularProgress } from "@mui/material";
import classes from "../home/Home.module.css";
import Mission from "./Mission";

const MissionsList: React.FC = (props) => {
  const dispatch = useDispatch();
  const GET_MISSIONS = gql`
    query Missions {
      missions(limit: 10) {
        name
        website
        manufacturers
        payloads {
          orbit
          nationality
          manufacturer
        }
      }
    }
  `;

  const [getMissions, { loading, error, data }] = useLazyQuery(GET_MISSIONS);
  const getMissionsData = () => {
    try {
      getMissions();
    } catch (err: any) {
      if (err.message === "Authentication Error") {
        dispatch(logout());
      }
    }
  };

  if (loading) {
    // @ts-ignore
    return <CircularProgress />;
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
      <button onClick={getMissionsData} className={classes.btn}>
        Get Missions
      </button>
      <CssBaseline />
      <Container maxWidth="sm">
        {data?.missions.map((mission: {}) => {
          let id = Math.round(Math.random() * 1000);
          // @ts-ignore
          return <Mission key={id} data={mission} />;
        })}
      </Container>
    </React.Fragment>
  );
};
export default MissionsList;
