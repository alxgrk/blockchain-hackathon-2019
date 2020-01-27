import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../ui-components/Copyright";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import PetsIcon from '@material-ui/icons/Pets';
import axios from "axios";
import {getAuthInfo} from "../auth/service";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9876/'
});

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

  const [ehrentaler, setEhrentaler] = useState(0);
  const [ehrenpunkte, setEhrenpunkte] = useState(0);
  const [auszeichnungen, setAuszeichnungen] = useState([]);

  const userId = getAuthInfo().id;
  useEffect(() => {

    function getUser() {
      return axiosInstance.get("api/Benutzer/" + userId)
          .then(response => {
            setEhrentaler(response.data.ehrentaler);
            setEhrenpunkte(response.data.ehrenpunkte);
            setAuszeichnungen(response.data.zertifikate)
          });
    }

    if (!getAuthInfo().isVerein)
      getUser()
          .catch(err => {
            if (err.response.status === 404) {
              axiosInstance.post("api/Benutzer",
                  {
                    $class: "org.uni.leipzig.aktivist.Benutzer",
                    akteurId: userId
                  })
                  .then(_ => getUser())
            }
          })
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>

        <div className={classes.titlebar}>Rang</div>
          <div>
            <div className={classes.flex}>
              <div className={classes.marginLeft}>Ehrentaler:</div>
              <div className={classes.marginRight}>{ehrentaler}</div>
            </div>
            <div className={classes.flex}>
              <div className={classes.marginLeft}>Ehrenpunkte:</div>
              <div className={classes.marginRight}>{ehrenpunkte}</div>
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