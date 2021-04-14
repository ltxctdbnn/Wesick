import { makeStyles } from "@material-ui/core/styles";
import { Router, Switch, Route } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import React from 'react';
import SignIn from '../component/SignIn';
import SignUp from '../component/SignUp';
import Profile from '../component/Profile';

export default function Init() {
    const useStyles = makeStyles((theme) => ({
        root: {
            "& > *": {
            flexGrow: 1,
            background: "#f1f3f5",
            },
        },

        paper: {
        padding: theme.spacing(12),
        textAlign: "center",
        },

        paperBody: {
            height: 350,
            padding: theme.spacing(2),
        },

        paperLogo: {
            marginBottom: "3vh",
            textAlign: "center",
            color: theme.palette.text.secondary,
        },

        paperSlogan: {
            fontSize: "1.5vw",
            fontFamily: "Spoqa Han Sans Neo",
        },

        paperFooter: {
            zIndex: "-1",
            marginTop: "10vh",
            padding: theme.spacing(0),
            background: "#f1f3f5",
        },
    }));

    const classes = useStyles();
    
    return (
        <Router>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <div className={classes.paper}></div>
                    </Grid>
                    <Grid item xs={2}>
                    <div className={classes.paperBody}></div>
                    </Grid>
                    <Grid item xs={3}>
                    <Grid item xs={12}>
                        <div className={classes.paperLogo}>
                        <img
                            src="./images/todak_logo.png"
                            width="100%"
                            alt="Todak Logo"
                        />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.paperSlogan}>
                        토닥토닥에서 우리 동네에 나와 같은 아픔을 가진 사람들과 따뜻한
                        이야기를 나눠보세요.
                        </div>
                    </Grid>
                    </Grid>
                    <Grid item xs={1}>
                    <div className={classes.paperBody}></div>
                    </Grid>
                    <Grid item xs={4}>
                        <Switch>
                            <Route exact path='/'>
                                <SignIn />
                            </Route>
                            <Route exact path='/sign-up'>
                                <SignUp />
                            </Route>
                            <Route exact path='/profile'>
                                <Profile />
                            </Route>
                        </Switch>
                    </Grid>
                    <Grid item xs={2}>
                    <div className={classes.paperBody}></div>
                    </Grid>
                    <Grid item xs={12}>
                    <div className={classes.paperFooter}>
                        <img src="./images/grass.png" width="100%" alt="Todak Logo" />
                    </div>
                    </Grid>
                </Grid>
                </div>
        </Router>
    )
}