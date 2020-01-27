import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import Copyright from "../ui-components/Copyright";
import Iframe from "react-iframe";
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
import uuid from "uuid/v4";
import IconButton from "@material-ui/core/IconButton";

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
    }
}));

export default function Finder() {
    const classes = useStyles();

    const [newActivity, setNewActivity] = useState({});
    const [activities, setActivities] = useState([]);
    const [buttonText, setButtonText] = useState("Hinzufügen");

    const actorId = getAuthInfo().id;
    useEffect(() => {

        function getVerein() {
            return axiosInstance.get("api/Verein/" + actorId)
                .then(response => {
                    const filter = {where: {anbieter: "resource:org.uni.leipzig.aktivist.Verein#org.uni.leipzig.aktivist.Verein$" + actorId}};

                    axiosInstance.get("api/Aktivitaet?filter=" + encodeURIComponent(JSON.stringify(filter)))
                        .then(response => setActivities(response.data))
                });
        }

        if (getAuthInfo().isVerein)
            getVerein()
                .catch(err => {
                    if (err.response.status === 404) {
                        axiosInstance.post("api/Verein",
                            {
                                $class: "org.uni.leipzig.aktivist.Verein",
                                akteurId: actorId
                            })
                            .then(_ => getVerein())
                    }
                })
    }, []);

    const handleChange = key => event => {
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
                       onChange={handleChange(data.id)}
                       autoFocus={data.autoFocus ? data.autoFocus : false}
            />);

    const onDelete = (id) => () => {
        let index = activities.findIndex(it => it.id === id);
        if (id === -1) return;
        axiosInstance.delete("api/Aktivitaet/" + activities[index].id)
            .then(_ => {
                const updated = activities.slice()
                    .sort((a, b) => new Date(b.date) - new Date(a.date));
                updated.splice(index, 1);
                setActivities(updated)
            })
    };

    const cards = activities
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((data, index) =>
            <Card key={index} className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {data.date}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {data.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {data.beschreibung}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={onDelete(data.id)}
                                size="small">
                        <ClearIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        );

    const handleClick = () => {
        let id = actorId + '_' + uuid();
        let now = new Date(Date.now()).toLocaleString();
        setButtonText("•••");
        let body = {
            $class: "org.uni.leipzig.aktivist.Aktivitaet",
            id: id,
            name: newActivity.name,
            beschreibung: newActivity.beschreibung,
            date: now,
            anbieter: "org.uni.leipzig.aktivist.Verein$" + actorId
        };
        axiosInstance.post("api/Aktivitaet/", body)
            .then(_ => {
                setActivities(
                    Array.of(body, ...activities));
                setButtonText("Hinzufügen");
                setNewActivity({
                    name: '',
                    beschreibung: ''
                });
            });
    };

    const content = getAuthInfo().isVerein
        ? <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <DirectionsRunIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Aktivitäten
            </Typography>
            {textboxes}
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleClick}>
                {buttonText}
            </Button>
            <Divider/>
            {cards.length === 0 ? <Typography component="h1" variant="h5">Keine Aktivitäten
                erstellt.</Typography> : cards}
        </div>
        : <Iframe
            url="https://www.aktion-mensch.de/was-du-tun-kannst/deine-moeglichkeiten/ehrenamt-finden.html"
            width="95%"
            height="500px"
            id="myId"
        />;

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
            </Container>
        </main>
    )
}