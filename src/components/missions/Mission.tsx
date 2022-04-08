import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";

const Mission: React.FC<{
  data: {
    name: string;
    website: string;
    manufacturers: string[];
    payloads: [
      {
        orbit: string;
        nationality: string;
        manufacturer: string;
      },
      {
        orbit: string;
        nationality: string;
        manufacturer: string;
      }
    ];
  };
}> = (props) => {
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
                Manufacturer:{props.data.manufacturers[0]}
              </Typography>
              <Typography variant="h5" component="div">
                Mission {props.data.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Orbit: {props.data.payloads[0]?.orbit || "No specific orbit"}
              </Typography>
              <Typography variant="body2">
                <b>nationality:</b>
                {props.data.payloads[0]?.nationality || "No specific orbit"}
              </Typography>
            </CardContent>
            <CardActions>
              visit:<Button size="small"> {props.data.website}</Button>
            </CardActions>
          </React.Fragment>
        </Card>
      </Box>
      <br />
    </Fragment>
  );
};

export default Mission;
