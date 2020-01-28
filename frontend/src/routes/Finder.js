import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import Copyright from "../ui-components/Copyright";
import {getAuthInfo} from "../auth/service";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import CssBaseline from "@material-ui/core/CssBaseline";
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import PetsIcon from '@material-ui/icons/Pets';
import uuid from "uuid/v4";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from '@material-ui/core/MenuItem';
import Select from "@material-ui/core/Select";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import Snackbar from '@material-ui/core/Snackbar';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9876/'
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
        fontSize: 14,
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
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    addBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    fixedHeight: {
        height: 240,
    },
    card: {
        minWidth: 275,
        marginBottom: 30
    },
    button: {
        marginBottom: 50
    },
    kategorieSelect: {
        margin: theme.spacing(1),
        minWidth: 120
    }
}));

export default function Finder() {
    const classes = useStyles();

    const [newActivity, setNewActivity] = useState({
        name: '',
        beschreibung: '',
        kategorie: 'Kategorie'
    });
    const [activities, setActivities] = useState([]);
    const [buttonText, setButtonText] = useState("Hinzufügen");
    const [messageShownInSnackbar, setSnackbarMessage] = useState("");

    const actorId = getAuthInfo().id;
    useEffect(() => {

        const getActivities = (filter) => {
            let queryParam = "";
            if (filter) queryParam = "?filter=" + encodeURIComponent(JSON.stringify(filter));
            axiosInstance.get("api/Aktivitaet" + queryParam)
                .then(response => setActivities(response.data))
        };

        const getVerein = () => {
            return axiosInstance.get("api/Verein/" + actorId)
                .then(_ => {
                    const filter = {where: {anbieter: "resource:org.uni.leipzig.aktivist.Verein#org.uni.leipzig.aktivist.Verein$" + actorId}};
                    getActivities(filter);
                });
        };

        getAuthInfo().isVerein
            ? getVerein()
                .catch(err => {
                    if (err.response && err.response.status === 404) {
                        axiosInstance.post("api/Verein",
                            {
                                $class: "org.uni.leipzig.aktivist.Verein",
                                akteurId: actorId
                            })
                            .then(_ => getVerein())
                    }
                })
            : getActivities();
    }, []);

    const handleTextFieldChange = key => event => {
        setNewActivity({...newActivity, [key]: event.target.value});
    };

    const textboxes = [
        {id: 'name', label: 'Titel', type: 'text', autoFocus: true},
        {id: 'beschreibung', label: 'Beschreibung', type: 'text'}
    ]
        .map((data, index) =>
            <TextField key={index}
                       variant="outlined" margin="normal"
                       required fullWidth
                       value={newActivity[data.id]}
                       name={data.id} label={data.label}
                       type={data.type} id={data.id}
                       onChange={handleTextFieldChange(data.id)}
                       autoFocus={data.autoFocus ? data.autoFocus : false}
            />);

    const updateSingleActivity = (id, key, value) => {
        let index = activities.findIndex(it => it.id === id);
        if (index === -1) return;
        let activity = activities[index];
        let updated = {...activity, [key]: value};
        return axiosInstance.put("api/Aktivitaet/" + activity.id, updated)
            .then(() => {
                setActivities(Object.assign([], activities, {[index]: updated}))
            });
    };

    const onMarkAsDone = (id) => () => {
        updateSingleActivity(id, "erledigt", true)
            .then(() => {
                let index = activities.findIndex(it => it.id === id);
                if (index === -1) return;
                let benutzer = activities[index].benutzer;
                let benutzerId = benutzer.substring(benutzer.lastIndexOf('$') + 1);
                if (benutzerId === '') return;
                axiosInstance.get("api/Benutzer/" + benutzerId)
                    .then(response => {
                        let data = Object.assign({}, response.data, {
                            ehrentaler: response.data.ehrentaler + 100,
                            ehrenpunkte: response.data.ehrenpunkte + 100,
                            aktivitaeten: ["resource:org.uni.leipzig.aktivist.Aktivitaet#" + id]
                        });
                        if (response.data.aktivitaeten)
                            data.aktivitaeten = [...data.aktivitaeten, ...response.data.aktivitaeten];
                        delete data.akteurId;
                        axiosInstance.put("api/Benutzer/" + benutzerId, data)
                            .then(_ => {
                                let index = activities.findIndex(it => it.id === id);
                                if (index === -1) return;
                                setSnackbarMessage(activities[index].name + " erledigt.")
                            })
                    });
            });
    };

    const onDelete = (id) => () => {
        let index = activities.findIndex(it => it.id === id);
        if (index === -1) return;
        axiosInstance.delete("api/Aktivitaet/" + activities[index].id)
            .then(_ => {
                const updated = activities.slice()
                    .sort((a, b) => new Date(b.date) - new Date(a.date));
                updated.splice(index, 1);
                setActivities(updated)
            })
    };

    const vereinCardActions = (data) =>
        data.erledigt === false
            ? <CardActions>
                {data.benutzer ?
                    <Grid container>
                        <Grid item xs={1} md={1} lg={1}/>
                        <Grid item xs={3} md={3} lg={3}>
                            <IconButton onClick={onMarkAsDone(data.id)}
                                        size="small">
                                <CheckIcon/>
                                <Typography color="textPrimary">
                                    Erledigt?
                                </Typography>
                            </IconButton>
                        </Grid>
                        <Grid item xs={4} md={4} lg={4}/>
                        <Grid item xs={1} md={1} lg={1}>
                            <IconButton onClick={onDelete(data.id)}
                                        size="small">
                                <ClearIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={3} md={3} lg={3}/>
                    </Grid>
                    : <Grid container>
                        <Grid item xs={9} md={9} lg={9}/>
                        <Grid item xs={1} md={1} lg={1}>
                            <IconButton onClick={onDelete(data.id)}
                                        size="small">
                                <ClearIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={2} md={2} lg={2}/>
                    </Grid>
                }
            </CardActions>
            : <Grid container>
                <Grid item xs={5} md={5} lg={5}/>
                <Grid item xs={2} md={2} lg={2}>
                    <CheckCircleIcon color="primary"/>
                </Grid>
                <Grid item xs={5} md={5} lg={5}/>
            </Grid>;

    const onAccept = (id) => () => {
        updateSingleActivity(id, "benutzer", "org.uni.leipzig.aktivist.Benutzer$" + actorId);
    };

    const benutzerCardActions = (data) => {
        if (data.erledigt === false && !data.benutzer)
            return <CardActions>
                <Grid container>
                    <Grid item xs={3} md={3} lg={3}/>
                    <Grid item xs={6} md={6} lg={6}>
                        <IconButton onClick={onAccept(data.id)}
                                    size="small">
                            <CheckIcon/>
                            <Typography color="textPrimary">
                                Akzeptieren
                            </Typography>
                        </IconButton>
                    </Grid>
                    <Grid item xs={3} md={3} lg={3}/>
                </Grid>
            </CardActions>;

        if (data.erledigt === false && data.benutzer)
            return <Grid container>
                <Grid item xs={3} md={3} lg={3}/>
                <Grid item xs={1} md={1} lg={1}>
                    <HourglassEmptyIcon color="primary"/>
                </Grid>
                <Grid item xs={3} md={3} lg={3}>
                    <Typography color="textPrimary">
                        Ausstehend
                    </Typography>
                </Grid>
                <Grid item xs={5} md={5} lg={5}/>
            </Grid>;

        if (data.erledigt === true)
            return <Grid container>
                <Grid item xs={4} md={4} lg={4}/>
                <Grid item xs={3} md={3} lg={3}>
                    <Typography color="textPrimary">
                        Erledigt
                    </Typography>
                </Grid>
                <Grid item xs={1} md={1} lg={1}>
                    <CheckCircleIcon color="primary"/>
                </Grid>
                <Grid item xs={4} md={4} lg={4}/>
            </Grid>;

        return <p/>;
    };

    const kategorieIcon = (kategorie) => {
        switch (kategorie.toLowerCase()) {
            case "kinder": return <ChildCareIcon style={{ height: "100%" }} color="secondary" />;
            case "organisation": return <BorderColorIcon style={{ height: "100%" }} color="secondary" />;
            case "sport": return <SportsSoccerIcon style={{ height: "100%" }} color="secondary" />;
            case "tiere": return <PetsIcon style={{ height: "100%" }} color="secondary" />;
            default: return <p/>;
        }
    };

    const cards = activities
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .filter(data => !data.benutzer || data.benutzer.endsWith(actorId) || getAuthInfo().isVerein)
        .map((data, index) =>
            <Card key={index} className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {data.date}
                    </Typography>
                    <Grid container>
                        <Grid item xs={11} md={11} lg={11}>
                            <Typography variant="h5" component="h2">
                                {data.name}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {data.beschreibung}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} md={1} lg={1}>
                            {kategorieIcon(data.kategorie)}
                        </Grid>
                    </Grid>
                </CardContent>
                {getAuthInfo().isVerein
                    ? vereinCardActions(data)
                    : benutzerCardActions(data)}
            </Card>
        );

    const handleAdd = () => {
        let id = actorId + '_' + uuid();
        let now = new Date(Date.now()).toLocaleString();
        setButtonText("•••");
        let body = {
            $class: "org.uni.leipzig.aktivist.Aktivitaet",
            id: id,
            name: newActivity.name,
            beschreibung: newActivity.beschreibung,
            date: now,
            kategorie: newActivity.kategorie,
            erledigt: false,
            anbieter: "org.uni.leipzig.aktivist.Verein$" + actorId
        };
        axiosInstance.post("api/Aktivitaet/", body)
            .then(_ => {
                setActivities([body, ...activities]);
                setButtonText("Hinzufügen");
                setNewActivity({
                    name: '',
                    beschreibung: '',
                    kategorie: 'Kategorie'
                });
            });
    };

    const handleKategorieChange = (event) => {
        setNewActivity(Object.assign({}, newActivity, {kategorie: event.target.value}));
    };

    const content = <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <DirectionsRunIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Aktivitäten
            </Typography>
        {
            getAuthInfo().isVerein
                ? <div className={classes.addBlock}>
                    {textboxes}
                    <Select
                        className={classes.kategorieSelect}
                        labelId="select-helper-label"
                        id="select-helper"
                        value={newActivity.kategorie}
                        onChange={handleKategorieChange}
                        displayEmpty>
                        <MenuItem value="Kategorie" disabled>
                            Kategorie
                        </MenuItem>
                        <MenuItem value="Kinder">Kinder</MenuItem>
                        <MenuItem value="Organisation">Organisation</MenuItem>
                        <MenuItem value="Sport">Sport</MenuItem>
                        <MenuItem value="Tiere">Tiere</MenuItem>
                    </Select>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={handleAdd}>
                        {buttonText}
                    </Button>
                    <Divider/>
                </div>
                : <p/>
        }
            {cards.length === 0 ? <Typography component="h1" variant="h5">Keine Aktivitäten
                erstellt.</Typography> : cards}
    </div>;

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container maxWidth="lg" className={classes.container}>
                <CssBaseline/>
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        {content}
                    </Grid>
                </Grid>
                <Box pt={4}>
                    <Copyright/>
                </Box>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={messageShownInSnackbar !== ""}
                    autoHideDuration={2000}
                    onClose={() => { setSnackbarMessage("") }}
                    message={messageShownInSnackbar} />
            </Container>
        </main>
    )
}