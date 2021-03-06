import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import Social from "../../components/Social";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.info.dark,
    width: `100%`,
    position: "fixed",
    bottom: "0",
    overflow: "hidden",
    marginTop: "6em",
    padding: "2em 0 ",
  },
  link: {
    fontSize: "1.25em",
    color: "#fff",
    "&:hover": {
      color: theme.palette.info.main,
    },
  },
  copylight: {
    color: "#fff",
    fontSize: "1em",
    "&:hover": {
      //   color: theme.palette.info.main,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container direction="column" style={{ margin: "1.2em 0" }}>
          {/* ts-ignore */}
          <Social color={"white"} />
        </Grid>
        <Grid
          item
          container
          component={"a"}
          target="_blank"
          rel="noreferrer noopener"
          href="https://satoruakiyama.com"
          justifyContent="center"
          style={{
            textDecoration: "none",
          }}
        >
          <Typography className={classes.copylight}>
            &copy;Nikola Markovic
          </Typography>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
