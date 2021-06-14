// import { createMuiTheme } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        fontSize: 10,
        padding: '6px',
        '@media(min-width:600px)' : {
          fontSize: 12,
          padding: '12px',
        },
        '@media(min-width:960px)' : {
          fontSize: 15,
        }
      }
    },
    MuiButton: {
      textSizeLarge: {
        fontSize: '1.5em',
        fontWeight: 600,
        textTransform: 'none'
      }
    },
    MuiPaper: {
      rounded: {
        borderRadius: '20px',
      }
    }
  },
  typography: {
    fontWeightRegular: 'bold', 
    fontFamily: 'Segoe UI',
    h6: {
      fontSize: 10,
      '@media(min-width:600px)' : {
        fontSize: 14,
      },
      '@media(min-width:960px)' : {
        fontSize: 16,
      },
      '@media(min-width:1280px)' : {
        fontSize: 20,
      }
    },
    h5: {
      fontSize: 13,
      '@media(min-width:600px)' : {
        fontSize: 18,
      },
      '@media(min-width:960px)' : {
        fontSize: 20,
      },
      '@media(min-width:1280px)' : {
        fontSize: 25,
      }
    },
    h4: {
      fontSize: 12,
      '@media(min-width:600px)' : {
        fontSize: 17,
      },
      '@media(min-width:960px)' : {
        fontSize: 21,
      },
      '@media(min-width:1280px)' : {
        fontSize: 25,
      }
    },
    h3: {
      fontSize: 19,
      '@media(min-width:600px)' : {
        fontSize: 22,
      },
      '@media(min-width:960px)' : {
        fontSize: 25,
      },
      '@media(min-width:1280px)' : {
        fontSize: 29,
      }
    }
  },
  palette: {
    primary: {
      main: '#801313',
    },
    secondary: {
      main: '#212121',
      
    },
    grey: {
      main: '#fafafa',
    },
    pale: {
     main: '#FCF4D9',
     contrastText: '#383838',
    },
    background: {
      paper: '#fafafa',
    },
  },
  zIndex: {
    appBar: 1400,
    drawer: 1100,
  },
});

export default theme;