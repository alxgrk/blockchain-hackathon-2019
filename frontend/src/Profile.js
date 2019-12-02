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
        margin: '4px',
    },
    test: {
        justifySelf: 'center',
    }
}));

export default function Profile() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <div className={classes.titlebar}>Heldenprofil</div>
            <div className={classes.mainInformation, classes.flex}>
                <PersonIcon/>
                <div>Name</div>
            </div>
            <div>
                <div className={classes.flex}>
                    <div>Heldenlevel:</div>
                    <div>Zahl</div>
                </div>
                <div className={classes.flex}>
                    <div>Stunden diese Woche:</div>
                    <div>Stundenzahl</div>
                </div>
                <dvi className={classes.flex}>
                    <div>Stunden Insgesamt:</div>
                    <div>Stundenzahl</div>
                </dvi>
            </div>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            <Chart/>
                        </Paper>
                    </Grid>
                </Grid>
                <Box pt={4}>
                    <Copyright/>
                </Box>
            </Container>
            <Button className={classes.test}>Auszeichnungen</Button>
        </main>
    )
}