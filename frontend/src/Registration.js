import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link, useHistory} from "react-router-dom";
import {register} from "./Auth";

const useStyles = makeStyles(theme => ({
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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    backToLogin: {
        textAlign: "center"
    }
}));

export default function Registration() {
    const classes = useStyles();

    let history = useHistory();

    const [profileInfo, setProfileInfo] = React.useState({
        email: '',
        password: '',
        vorname: '',
        nachname: '',
        plz: '',
        ort: '',
        geburtsdatum: '',
        handynummer: '',
        profilbeschreibung: ''
    });

    const handleChange = key => event => {
        setProfileInfo({...profileInfo, [key]: event.target.value});
    };

    const [errorState, setErrorState] = React.useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        register(profileInfo,
            () => {
                history.replace({pathname: "/"});
            }, (err) => {
                setErrorState(true);
                setTimeout(() => setErrorState(false), 2000)
            }, (err) => {
                history.replace({from: {pathname: "/login"}});
            })
    };

    let textboxes = [
        {
            id: 'email',
            label: 'Email Address',
            type: 'email',
            autoComplete: 'email',
            autoFocus: true
        },
        {id: 'password', label: 'Password', type: 'password', autoComplete: 'current-password'},
        {id: 'vorname', label: 'Vorname', type: 'text'},
        {id: 'nachname', label: 'Nachname', type: 'text'},
        {id: 'plz', label: 'Postleitzahl', type: 'text', pattern: '\d+'},
        {id: 'ort', label: 'Ort', type: 'text'},
        {id: 'geburtsdatum', label: 'Geburtsdatum', type: 'text', pattern: '\d{4}-\d{2}-\d{2}'},
        {id: 'handynummer', label: 'Handynummer', type: 'tel'},
        {id: 'profilbeschreibung', label: 'Profilbeschreibung', type: 'text'}
    ]
        .map((data, index) =>
            <TextField key={index}
                       variant="outlined" margin="normal"
                       required fullWidth
                       name={data.id} label={data.label}
                       type={data.type} id={data.id}
                       onChange={handleChange(data.id)}
                       error={errorState}
                       pattern={data.pattern ? data.pattern : null}
                       autoComplete={data.autocomplete ? data.autocomplete : null}
                       autoFocus={data.autoFocus ? data.autoFocus : false}
            />);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    {textboxes}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Register
                    </Button>
                    <Grid container>
                        <Grid item xs={2}/>
                        <Grid item xs={8}>
                            <Button className={classes.backToLogin} variant="text" size="small" component={Link} to={"/login"}>
                                {"Already have an account? Sign In"}
                            </Button>
                        </Grid>
                        <Grid item xs={2}/>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}