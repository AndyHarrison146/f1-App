import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/home.css";
import "../styles/teamColors.css";
import { Card, CircularProgress, Grid, Typography } from "@material-ui/core";
import { useStyles } from "../styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Teams } from "../assets/Teams";
import {
  getServiceLastRace,
  getChampion,
  getChampionship,
  getContructors,
} from "../services/DataService";
import LastRace from "./LastRace";
import DriverStandings from "./DriverStandings";
import ConstructorStandins from "./ConstructorStandins";

const Home = () => {
  const classes = useStyles();
  const [lastRaceData, setLastRaceData] = useState();
  const [championshipData, setChampionshipData] = useState();
  const [constructorData, setConstructorData] = useState();
  const [showLastRace, setShowLastRace] = useState(true);
  const [showDriverTable, setShowDriverTable] = useState(false);
  const [showConstructorTable, setShowConstructorTable] = useState(false);
  const [currentChampion, setCurrentChampion] = useState();

  const getLastRaceData = () => {
    getServiceLastRace().then((res) =>
      setLastRaceData(res.data.MRData.RaceTable.Races)
    );
  };

  const getChampionData = () => {
    getChampion().then((res) => {
      setCurrentChampion(res);
    });
  };

  const getChampionshipData = () => {
    getChampionship().then((res) => {
      setChampionshipData(
        res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
      );
    });
  };

  // const getConstructorTable = () => {
  // getContructors().then((res) => {
  //     setConstructorData(res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
  //   });
  // };

  useEffect(() => {
    // getLastRace();
    getLastRaceData();
    // getConstructorTable();
  }, []);

  useEffect(() => {
    getChampionshipData();
    // getChampion();
  }, [lastRaceData]);

  const changeLastRace = () => {
    setShowLastRace(true);
    setShowDriverTable(false);
    setShowConstructorTable(false);
  };

  const changeDriverTable = () => {
    setShowDriverTable(true);
    setShowLastRace(false);
    setShowConstructorTable(false);
  };

  const changeConstructorTable = () => {
    setShowLastRace(false);
    setShowDriverTable(false);
    setShowConstructorTable(true);
  };

  const loadingCircle = () => {
    return (
      <div>
        <CircularProgress className={classes.circle} size="3.5rem" />
        <h3>Loading...</h3>
      </div>
    );
  };

  const driverTeamInfo = (team) => {
    switch (team) {
      case "Mercedes":
        return {
          primary: "lightBlue",
          secondary: "white-number",
          url: Teams[0].url,
        };
      case "Red Bull":
        return {
          primary: "purple",
          secondary: "white-number",
          url: Teams[1].url,
        };
      case "Ferrari":
        return {
          primary: "red",
          secondary: "white-number",
          url: Teams[3].url,
        };
      case "AlphaTauri":
        return {
          primary: "darkerBlue",
          secondary: "white-number",
          url: Teams[5].url,
        };
      case "Alpine F1 Team":
        return {
          primary: "blue",
          secondary: "white-number",
          url: Teams[4].url,
        };
      case "McLaren":
        return {
          primary: "orange",
          secondary: "white-number",
          url: Teams[2].url,
        };
      case "Aston Martin":
        return {
          primary: "green",
          secondary: "white-number",
          url: Teams[6].url,
        };
      case "Williams":
        return {
          primary: "darkBlue",
          secondary: "white-number",
          url: Teams[8].url,
        };
      case "Alfa Romeo":
        return {
          primary: "darkRed",
          secondary: "white-number",
          url: Teams[7].url,
        };
      case "Haas F1 Team":
        return {
          primary: "white",
          secondary: "black-number",
          url: Teams[9].url,
        };
      default:
        return;
    }
  };

  // console.log(Teams[0].url);

  const textColor = (team) => {
    if (team === "Haas F1 Team") {
      return "black-number";
    }
    return "white-number";
  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        align="center"
        justifyContent="space-between"
        alignContent="flex-start"
        style={{ minHeight: "100vh", minWidth: "100vw" }}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ButtonGroup
            variant="text"
            size="large"
            className={classes.buttonGroup}>
            <Button
              onClick={changeLastRace}
              color={showLastRace ? "primary" : "default"}>
              Last Race
            </Button>
            <Button
              onClick={changeDriverTable}
              color={showDriverTable ? "primary" : "default"}>
              Driver Standings
            </Button>
            <Button
              onClick={changeConstructorTable}
              color={showConstructorTable ? "primary" : "default"}>
              Constructor Standings
            </Button>
          </ButtonGroup>
        </Grid>
        {showLastRace && !lastRaceData && loadingCircle()}
        {showLastRace && lastRaceData && (
          <LastRace
            lastRaceData={lastRaceData}
            driverTeamInfo={driverTeamInfo}
            textColor={textColor}
          />
        )}
        {showDriverTable && !championshipData && loadingCircle()}
        {showDriverTable && championshipData && (
          <DriverStandings
            championshipData={championshipData}
            driverTeamInfo={driverTeamInfo}
            textColor={textColor}
          />
        )}
        {showConstructorTable && !constructorData && loadingCircle()}
        {showConstructorTable && constructorData && (
          <ConstructorStandins
            constructorData={constructorData}
            driverTeamInfo={driverTeamInfo}
            textColor={textColor}
          />
        )}
      </Grid>
      <Typography variant="h6" align="center">
        All info is sourced from https://ergast.com/mrd/.
      </Typography>
    </div>
  );
};

export default Home;
