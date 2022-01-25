import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Drawer as MUIDrawer,
  ListItem,
  ListItemText,
  List,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useStyles } from "../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendarAlt,
  faTrophy,
  faFlagCheckered,
  faPortrait,
  faUsers,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const Header = () => {
  const classes = useStyles();
  const navList = [
    {
      name: "Home",
      icon: faHome,
    },
    {
      name: "Schedule",
      icon: faCalendarAlt,
    },
    {
      name: "Year",
      icon: faTrophy,
    },
    {
      name: "Race",
      icon: faFlagCheckered,
    },
    {
      name: "Driver",
      icon: faPortrait,
    },
    {
      name: "Team",
      icon: faUsers,
    },
    {
      name: "About",
      icon: faQuestion,
    },
  ];
  const history = useHistory();
  const [navState, setNavState] = useState(false);
  const [lastRound, setLastRound] = useState();
  const [nextRound, setNextRound] = useState("");
  const [time, setTime] = useState();

  const toggleDrawer = (open) => {
    return function (event) {
      return setNavState(open);
    };
  };

  const getLastRound = () => {
    axios
      .get("http://ergast.com/api/f1/current/last/results.json")
      .then((res) => {
        const _lastRound = res.data.MRData.RaceTable.round;
        setLastRound(_lastRound);
        console.log(res.data.MRData.RaceTable);
      });
  };

  // const getNextRound = () => {
  //   axios.get("http://ergast.com/api/f1/current.json").then((res) => {
  //     if (res.data.MRData.RaceTable.Races.length == lastRound) {
  //       console.log("here");
  //       getNextYearRound();
  //     }
  //     setNextRound(res.data.MRData.RaceTable.Races[lastRound]);
  //   });
  // };

  const getNextRound = () => {
    const currentYear = moment().format("YYYY");
    console.log(currentYear);
    axios.get(`https://ergast.com/api/f1/${currentYear}.json`).then((res) => {
      setNextRound(res.data.MRData.RaceTable.Races[0]);
    });
  };

  // useEffect(() => {
  //   getLastRound();
  // }, []);

  useEffect(() => {
    getNextRound();
  }, []);

  useEffect(() => {
    if (!nextRound) {
      return;
    }
    let countdownDate = new Date(
      `${nextRound.date} ${nextRound.time}`
    ).getTime();
    let x = setInterval(function () {
      let now = new Date().getTime();
      let distance = countdownDate - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTime(days + "d " + hours + "h " + minutes + "m " + seconds + "s");

      if (distance < 0) {
        clearInterval(x);
        setTime("Race Time");
      }
    }, 1000);
  }, [nextRound]);

  return (
    <Grid container spacing={0} align="center">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <AppBar position="relative" color="primary" className={classes.appBar}>
          <Toolbar>
            <Grid item xs={2} sm={4} md={4} lg={4} align="left">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={navState ? toggleDrawer(false) : toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} align="center">
              <Typography variant="h1">F1 Grid Check</Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={4} lg={4} align="right">
              {nextRound ? (
                <div>
                  <Typography variant="h6">
                    {`Next Race: Round ${nextRound.round} ${nextRound.raceName} `}
                  </Typography>
                  <Typography variant="h4">{time}</Typography>
                </div>
              ) : (
                <div>
                  <Typography variant="h4">Loading...</Typography>
                </div>
              )}
            </Grid>
          </Toolbar>
          <MUIDrawer open={navState} onClose={toggleDrawer(false)}>
            <div className={classes.toolbar} />
            <List>
              {navList.map((route) => {
                return (
                  <ListItem
                    divider={true}
                    button
                    key={`${route.name}`}
                    onClick={() => {
                      history.push(`/${route.name}`);
                      setNavState(false);
                    }}
                    styles={{ fontSize: 10 }}>
                    <FontAwesomeIcon
                      icon={route.icon}
                      style={{ margin: "10px" }}
                    />
                    <ListItemText
                      classes={{ primary: classes.listItemText }}
                      primary={`${route.name}`}
                    />
                  </ListItem>
                );
              })}
            </List>
          </MUIDrawer>
        </AppBar>
      </Grid>
    </Grid>
  );
};

export default Header;
