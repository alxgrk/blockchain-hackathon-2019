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
  iconDiv: {
    width: '30%',
    textAlign: 'center',
  },
  icon: {
    fontSize: '70px',
    color: '#cecece',
  },
  iconGold: {
    fontSize: '70px',
    color: '#d4af37',
  },
  iconSilver: {
    fontSize: '70px',
    color: '#8a9597',
  },
  iconBronze: {
    fontSize: '70px',
    color: '#cc8e34',
  },
  container: {
    width: '100%',
    display: 'flex'
  },
  iconTitle: {
    textAlign: 'left',
    fontSize: '30px',
    color: '#148b37',
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
  titlebar: {
    textAlign: 'center',
    padding: '15px',
    fontSize: '32px',
   }
}));

export default function Auszeichnungen() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>

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

        <div className={classes.titlebar}>Auszeichnungen</div>
        <div className={classes.iconTitle}>Kinder</div>
          <div className={classes.container}>
            <div className={classes.iconDiv}><ChildCareIcon className={classes.iconBronze}/></div>
            <div className={classes.iconDiv}><ChildCareIcon className={classes.iconSilver}/></div>
            <div className={classes.iconDiv}><ChildCareIcon className={classes.iconGold}/></div>
          </div>
        <div className={classes.iconTitle}>Organisation</div>
          <div className={classes.container}>
            <div className={classes.iconDiv}><BorderColorIcon className={classes.iconBronze}/></div>
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
            <div className={classes.iconDiv}><PetsIcon className={classes.iconBronze}/></div>
            <div className={classes.iconDiv}><PetsIcon className={classes.iconSilver}/></div>
            <div className={classes.iconDiv}><PetsIcon className={classes.iconGold}/></div>
          </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}