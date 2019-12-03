import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import Title from './Title';
import { useTheme } from '@material-ui/core/styles';
import Copyright from "./Copyright";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import PetsIcon from '@material-ui/icons/Pets';



const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
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
  title: {
    textAlign: 'center',
    padding: '15px',
    fontSize: '32px',
  },
  iconDiv: {
    width: '30%',
    textAlign: 'center',
  },
  icon: {
    fontSize: '70px',
  },
  container: {
    width: '100%',
    display: 'flex'
  },
  iconTitle: {
    textAlign: 'left',
    fontSize: '30px',
    color: '#148b37',
  }
}));

export default function Auszeichnungen() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <div className={classes.title}>Auszeichnungen</div>
        <div className={classes.iconTitle}>Kinder</div>
          <div className={classes.container}>
            <div className={classes.iconDiv}><ChildCareIcon className={classes.icon}/></div>
            <div className={classes.iconDiv}><ChildCareIcon className={classes.icon}/></div>
            <div className={classes.iconDiv}><ChildCareIcon className={classes.icon}/></div>
          </div>
        <div className={classes.iconTitle}>Organisation</div>
          <div className={classes.container}>
            <div className={classes.iconDiv}><BorderColorIcon className={classes.icon}/></div>
            <div className={classes.iconDiv}><BorderColorIcon className={classes.icon}/></div>
            <div className={classes.iconDiv}><BorderColorIcon className={classes.icon}/></div>
          </div>
        <div className={classes.iconTitle}>Sport</div>
          <div className={classes.container}>
            <div className={classes.iconDiv}><SportsSoccerIcon className={classes.icon}/></div>
            <div className={classes.iconDiv}><SportsSoccerIcon className={classes.icon}/></div>
            <div className={classes.iconDiv}><SportsSoccerIcon className={classes.icon}/></div>
          </div>
          <div className={classes.iconTitle}>Tiere</div>
          <div className={classes.container}>
            <div className={classes.iconDiv}><PetsIcon className={classes.icon}/></div>
            <div className={classes.iconDiv}><PetsIcon className={classes.icon}/></div>
            <div className={classes.iconDiv}><PetsIcon className={classes.icon}/></div>
          </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}