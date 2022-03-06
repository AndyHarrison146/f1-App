import { makeStyles } from "@material-ui/core/styles";
import theme from "./theme";

export const useStyles = makeStyles(() => ({
  toolbar: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  listItemText: {
    color: "#212121",
    padding: theme.spacing(1),
    textAlign: "center",
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.3em",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "1.1em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8em",
      padding: theme.spacing(1),
    },
  },
  formControl: {
    margin: "2%",
    [theme.breakpoints.up("lg")]: {
      width: "280px",
      height: "220px",
    },
    [theme.breakpoints.down("md")]: {
      width: "260px",
      height: "190px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "220px",
      height: "180px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "190px",
      height: "150px",
    },
  },
  container: {
    display: "flex",
  },
  paper: {
    position: "relative",
    width: "65%",
    overflowX: "auto",
    margin: theme.spacing(5),
    background: "#ffffff",
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  card: {
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(2),
      maxWidth: "fitContent",
      maxHeight: "fitContent",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(2),
      maxWidth: "fitContent",
      maxHeight: "fitContent",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
      maxWidth: "fitContent",
      maxHeight: "fitContent",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
      maxWidth: "fitContent",
      maxHeight: "fitContent",
    },
  },
  driverImg: {
    position: "relative",
    borderRadius: "30px",
    padding: "3%",
    margin: "30px",
    [theme.breakpoints.up("lg")]: {
      height: 300,
    },
    [theme.breakpoints.down("md")]: {
      height: 270,
    },
    [theme.breakpoints.down("sm")]: {
      height: 240,
    },
    [theme.breakpoints.down("xs")]: {
      height: 170,
    },
  },
  teamCard: {
    display: "flex",
    float: "left",
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      width: "45%",
    },
    [theme.breakpoints.down("md")]: {
      width: "45%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  },
  teamImg: {
    width: "70%",
  },
  buttonGroup: {
    marginTop: theme.spacing(3),
    maxHeight: "90%",
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.2em",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "1em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8em",
      padding: theme.spacing(1),
    },
  },
  cardInfo: {
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(1),
  },
  about: {
    margin: theme.spacing(3),
  },
  aboutText: {
    width: "70%",
    margin: theme.spacing(2),
  },
}));
