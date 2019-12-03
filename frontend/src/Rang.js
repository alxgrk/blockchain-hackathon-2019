import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";
import Box from "@material-ui/core/Box";
import React from "react";
import {makeStyles} from "@material-ui/core";
import clsx from "clsx";
import Copyright from "./Copyright";
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    titlebar: {
        textAlign: 'center',
        padding: '15px',
        fontSize: '32px',
    },
    mainInformation: {
        display: 'flex',
        width: '100%',
    },
    profilePicture: {
        width: '30%'
    },
    profileName: {
        width: '50%'
    },
    flex: {
        display: 'flex',
        padding: ' 10px 0',
        justifyContent: 'space-between',
        borderBottom: '1px solid #000',
        margin: '2%',
    },
    marginRight: {
        marginRight: '2%',
    },
    marginLeft: {
        marginLeft: '2%',
    },
    middle: {
        justifySelf: 'center',
    },
    profileIcon: {
        fontSize: '30px',
        marginLeft: '2%',
        color: '#148b37',
    },
    button: {
        backgroundColor: '#148b37',
    },
    flexDiv: {
        display: 'flex',
        padding: ' 10px 0',
        justifyContent: 'center',
        margin: '2%',
    }
}));

async function getDataAxios(){
    const response =
      await axios.get("http://localhost:8080/profil/2")
    return response.data
}

export default function Rang() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    let userData = getDataAxios();
    const fullName = userData['vorname'] + ' ' + userData['nachname'];

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <div className={classes.titlebar}>Rang</div>
            <div>
                <div className={classes.flex}>
                    <div className={classes.marginLeft}>Ehrenlevel:</div>
                    <div className={classes.marginRight}>Level</div>
                </div>
                <div className={classes.flex}>
                    <div className={classes.marginLeft}>Ehrenpunkte:</div>
                    <div className={classes.marginRight}>Punkte</div>
                </div>
            </div>
            <Container maxWidth="lg" className={classes.container}>
                <Box pt={4}>
                    <Copyright/>
                </Box>
            </Container>
        </main>
    )
}