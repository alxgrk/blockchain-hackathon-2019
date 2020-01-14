import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link, useHistory, useLocation} from "react-router-dom";
import {login} from "../auth/Auth";

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
  belowButtons: {
    textAlign: "center"
  }
}));

export default function Login() {
  const classes = useStyles();

  let history = useHistory();
  let location = useLocation();

  const [basicAuth, setBasicAuth] = React.useState({
    email: '',
    base64Hash: ''
  });

  const handleEmailChange = event => {
    setBasicAuth({...basicAuth, email: event.target.value});
  };
  const handlePasswordChange = event => {
    setBasicAuth({...basicAuth, base64Hash: btoa(basicAuth.email + ':' + event.target.value)});
  };

  const [errorState, setErrorState] = React.useState(false);
  let {from} = location.state || {from: {pathname: "/"}};
  let handleClick = () => {
    login(basicAuth.base64Hash,
        () => {
          history.replace(from);
        }, (err) => {
          setErrorState(true);
          setTimeout(() => setErrorState(false), 2000)
        });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/*<form className={classes.form} noValidate>*/}
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleEmailChange}
              error={errorState}
              autoComplete="email"
              autoFocus
          />
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handlePasswordChange}
              error={errorState}
              autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleClick}
          >
            Sign In
          </Button>
          <Grid className={classes.belowButtons} container spacing={1}>
            <Grid item xs={6}>
              <Button variant="text" size="small" component={Link} to={"#"}>
                Forgot password?
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="text" size="small" component={Link} to={"/register"}>
                {"Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        {/*</form>*/}
      </div>
    </Container>
  );
}