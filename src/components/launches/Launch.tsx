
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import classes from "./Launch.module.css";

const Launch: React.FC<{
  data: {
    id: string;
    launch_year: string;
    launch_site: {
      site_id: string;
      site_name_long: string;
      site_name: string;
    };
    mission_name: string;
    rocket: {
      rocket_name: string;
      rocket_type: string;
    };
    details: string;
  };
}> = (props) => {
  console.log(props);
  return (
    <Fragment>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <React.Fragment>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Launch:id{props.data.id}
              </Typography>
              <Typography variant="h5" component="div">
                Mission {props.data.mission_name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Rocket {props.data.rocket.rocket_name}
              </Typography>
              <Typography variant="body2" className={classes.details}>
                <b className={classes.detailTitle}>Details:</b>{" "}
                {props.data.details || "There no details about launch"}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
                Launch site: {props.data.launch_site.site_name_long}
              </Button>
            </CardActions>
          </React.Fragment>
        </Card>
      </Box>
      <br />
    </Fragment>
  );
};

export default Launch;
