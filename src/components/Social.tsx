import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import HomeIcon from "@material-ui/icons/Home";
import React from "react";

const useStyles = makeStyles((theme) => ({
  snsWrapper: {
    width: "40px",
    height: "40px",
    marginRight: "20px",
  },
  snsIcon: {
    width: "30px",
    height: "30px",
    color: "white",
    cursor: "pointer",
    transition: "0.1s ease-in",

    [theme.breakpoints.down("xs")]: {
      width: "25px",
      height: "25px",
    },
    "&:hover": {
      width: "35px",
      height: "35px",

      borderRadius: "100px",
    },
  },
}));

const Social: React.FC<{ color: string }> = (props) => {
  const classes = useStyles();
  return (
    <Grid item container spacing={2} justifyContent="center">
      <Grid
        className={classes.snsWrapper}
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
      >
        <HomeIcon className={classes.snsIcon} />
      </Grid>
      <Grid
        className={classes.snsWrapper}
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
      >
        <FacebookIcon className={classes.snsIcon} />
      </Grid>
      <Grid
        className={classes.snsWrapper}
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
      >
        <InstagramIcon className={classes.snsIcon} />
      </Grid>
      <Grid
        className={classes.snsWrapper}
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
      >
        <GitHubIcon className={classes.snsIcon} />
      </Grid>
    </Grid>
  );
};

export default Social;
