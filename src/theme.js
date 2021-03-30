// import { createMuiTheme } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { SportsRugbySharp } from '@material-ui/icons';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#d32f2f',
    },
    secondary: {
      main: green[500],
    },
    pale: {
     main: '#FCF4D9',
     contrastText: '#383838',
    },
    background: {
      paper: '#b71c1c'
    },
  },
  zIndex: {
    appBar: 1400,
    drawer: 1100,
  },
 

});

export default theme;