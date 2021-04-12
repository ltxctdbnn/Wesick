import React from "react";
import SignIn from "routes/SignIn";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(10),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paperBody: {
    height: 500,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const SignInPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={3}>
            <div style={{ textAlign: "center" }}>
              <img
                src="./images/todak_logo.png"
                width="100%"
                alt="Todak Logo"
              />
              <div>
                토닥토닥에서 우리에 동네에 나와 같은 아픔을 가진 사람들과 따뜻한
                이야기를 나눠보세요.
              </div>
            </div>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.paper}>xs=1</Paper>
          </Grid>
          <Grid item xs={4}>
            <div style={{ textAlign: "center" }}>
              <SignIn />
            </div>
            <Paper className={classes.paper}>xs=4</Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
        </Grid> */}
      {/* <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paperBody}>xs=1</Paper>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.paperBody} style={{ textAlign: "center" }}>
            <img src="./images/todak_logo.png" width="100%" alt="Todak Logo" />
            <div>
              토닥토닥에서 우리에 동네에 나와 같은 아픔을 가진 사람들과 따뜻한
              이야기를 나눠보세요.
            </div>
          </div>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paperBody}>xs=1</Paper>
        </Grid>
        <Grid item xs={4}>
          <SignIn className={classes.paperBody} />
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paperBody}>xs=2</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
      </Grid> */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paperBody}>xs=1</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paperBody}>
            {/* <img src="./images/todak_logo.png" width="100%" alt="Todak Logo" /> */}
            <Grid item xs={1}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paperBody}>xs=1</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paperBody}>
            <SignIn />
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paperBody}>xs=2</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignInPage;
