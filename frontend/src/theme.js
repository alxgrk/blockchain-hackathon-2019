import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#148b37',
    },
    secondary: {
      main: '#2da738',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    title: {
      textAlign: 'center',
      padding: '15px',
      fontSize: '32px',
    },
  },
});

export default theme;
