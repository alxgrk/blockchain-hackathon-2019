import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "../ui-components/Chart";
import Box from "@material-ui/core/Box";
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles} from "@material-ui/core";
import clsx from "clsx";
import Copyright from "../ui-components/Copyright";
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {basicAuthHeader, getAuthInfo} from "../auth/service";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8091/'
});

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

export default function Profile() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    let history = useHistory();

    const [profileInfo, setProfileInfo] = useState({
        fullname: '',
        email: '',
        geburtsdatum: '',
        plz: '',
        ort: '',
        handynummer: '',
        beschreibung: ''
    });

    useEffect(() => {
        const getInfo = () => {
            if (getAuthInfo().isVerein) {
                return axiosInstance
                    .get("verein/" + getAuthInfo().id, {
                        headers: basicAuthHeader()
                    })
            } else {
                return axiosInstance
                    .get("profil/" + getAuthInfo().id, {
                        headers: basicAuthHeader()
                    })
            }
        };

        getInfo()
            .then((response) => {
                setProfileInfo({
                    fullname: getAuthInfo().isVerein ? response.data.vereinsname : response.data.vorname + ' ' + response.data.nachname,
                    email: response.data.email,
                    geburtsdatum: response.data.geburtsdatum,
                    plz: response.data.plz,
                    ort: response.data.ort,
                    handynummer: response.data.handynummer,
                    beschreibung: getAuthInfo().isVerein ? response.data.beschreibung : response.data.profilbeschreibung
                })
            })
            .catch((err) => {
                console.error("Profil error: " + JSON.stringify(err))
            });
    }, []);

    let rows = [
        {title: "E-Mail:", value: profileInfo.email},
        {title: "Postleitzahl:", value: profileInfo.plz},
        {title: "Ort:", value: profileInfo.ort},
        {title: "Handynummer:", value: profileInfo.handynummer},
        {title: "Beschreibung:", value: profileInfo.beschreibung}
    ];
    if (!getAuthInfo().isVerein)
        rows.splice(1, 0, {title: "Geburtsdatum:", value: profileInfo.geburtsdatum});
    rows = rows.map((data, index) =>
        <div className={classes.flex}>
            <div className={classes.marginLeft}>{data.title}</div>
            <div className={classes.marginRight}>{data.value}</div>
        </div>);

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <div className={classes.titlebar}>Ehrenprofil</div>
            <div className={classes.mainInformation + ", " + classes.flex}>
                <PersonIcon  className={classes.profileIcon}/>
                <div className={classes.marginRight}>{profileInfo.fullname}</div>
            </div>
            <div>
                {rows}
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
                <div className={classes.flexDiv}>
                    <Button className={classes.button}
                            onClick={() => {
                                history.push({pathname: "/auszeichnungen"})
                            }}>Auszeichnungen</Button>
                </div>
                <Box pt={4}>
                    <Copyright/>
                </Box>
            </Container>
        </main>
    )
}
