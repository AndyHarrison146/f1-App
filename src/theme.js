import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

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
    }
  },
});

export default theme;