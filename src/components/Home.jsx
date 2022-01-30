import React, { useState } from "react";
import "../styles/home.css";
import "../styles/teamColors.css";
import "../styles/re-usedStyles.css";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "../styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import LastRace from "./LastRace";
import DriverStandings from "./DriverStandings";
import ConstructorStandins from "./ConstructorStandings";

const Home = () => {
  const classes = useStyles();
  const [showLastRace, setShowLastRace] = useState(true);
  const [showDriverTable, setShowDriverTable] = useState(false);
  const [showConstructorTable, setShowConstructorTable] = useState(false);

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
        {showLastRace && <LastRace />}
        {showDriverTable && <DriverStandings />}
        {showConstructorTable && <ConstructorStandins />}
      </Grid>
      <Typography variant="h6" align="center">
        All info is sourced from https://ergast.com/mrd/.
      </Typography>
    </div>
  );
};

export default Home;
