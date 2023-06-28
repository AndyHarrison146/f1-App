import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  overrides: {
    MuiFocused: {
      borderRadius: '5px'
    },
    MuiCard: {
      root: {
        marginTop: "10px",
        borderRadius: "8px",
        "@media(max-width:600px)": {
          marginTop: "5px",
        },
        "@media(min-width:600px)": {
          borderRadius: "8px",
          marginTop: "5px",
        },
        "@media(min-width:960px)": {
          marginTop: "5px",
        },
        "@media(min-width:1280px)": {
          borderRadius: "8px",
        },
      },
    },
    MuiDrawer: {
      paper: {
        width: 200,
      },
    },
    MuiTableCell: {
      root: {
        fontSize: 14,
        padding: "1px",
        paddingLeft: "10px",
        paddingRight: "10px",
        "@media(min-width:600px)": {
          fontSize: 17,
        },
        "@media(min-width:960px)": {
          fontSize: 19,
        },
      },
    },
    MuiButton: {
      textSizeLarge: {
        fontSize: "1.5em",
        fontWeight: 600,
        textTransform: "none",
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: "10px",
        "@media(min-width:600px)": {
          borderRadius: "30px",
        },
        "@media(min-width:960px)": {
          borderRadius: "60px",
        },
      },
    },
  },
  typography: {
    fontWeightRegular: "bold",
    fontFamily: "Arial",
    h6: {
      fontSize: 12,
      "@media(min-width:600px)": {
        fontSize: 14,
      },
      "@media(min-width:960px)": {
        fontSize: 16,
      },
      "@media(min-width:1280px)": {
        fontSize: 18,
      },
    },
    h5: {
      fontSize: 12,
      "@media(min-width:600px)": {
        fontSize: 14,
      },
      "@media(min-width:960px)": {
        fontSize: 16,
      },
      "@media(min-width:1280px)": {
        fontSize: 18,
      },
    },
    h4: {
      fontSize: 13,
      "@media(min-width:600px)": {
        fontSize: 16,
      },
      "@media(min-width:960px)": {
        fontSize: 18,
      },
      "@media(min-width:1280px)": {
        fontSize: 21,
      },
    },
    h3: {
      fontSize: 16,
      "@media(min-width:600px)": {
        fontSize: 18,
      },
      "@media(min-width:960px)": {
        fontSize: 21,
      },
      "@media(min-width:1280px)": {
        fontSize: 24,
      },
    },
    h2: {
      fontSize: 18,
      "@media(min-width:600px)": {
        fontSize: 21,
      },
      "@media(min-width:960px)": {
        fontSize: 24,
      },
      "@media(min-width:1280px)": {
        fontSize: 28,
      },
    },
    h1: {
      fontSize: 24,
      "@media(min-width:600px)": {
        fontSize: 24,
      },
      "@media(min-width:960px)": {
        fontSize: 28,
      },
      "@media(min-width:1280px)": {
        fontSize: 32,
      },
    },
  },
  palette: {
    primary: {
      main: "#801313",
    },
    secondary: {
      main: "#edf2f4",
    },
    black: {
      main: "#0b090a",
    },
    grey: {
      main: "#fafafa",
    },
    pale: {
      main: "#FCF4D9",
      contrastText: "#383838",
    },
    background: {
      paper: "#fafafa",
    },
  },
  zIndex: {
    appBar: 1400,
    drawer: 1100,
  },
});

export default theme;
