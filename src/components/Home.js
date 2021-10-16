import React, { useState, useEffect } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import "../App.css";
import { Grid, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "../styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.grey.main,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Home = () => {
  const classes = useStyles();
  const [lastRaceData, setLastRaceData] = useState();
  const [championshipData, setChampionshipData] = useState();
  const [constructorData, setConstructorData] = useState();
  const [showLastRace, setShowLastRace] = useState(true);
  const [showDriverTable, setShowDriverTable] = useState(false);
  const [showConstructorTable, setShowConstructorTable] = useState(false);

  const getLastRace = () => {
    const lastRaceURL = `http://ergast.com/api/f1/2021/results.json?limit=1000`;
    axios.get(lastRaceURL).then((res) => {
      const lastRace = res.data.MRData.RaceTable.Races;
      setLastRaceData(lastRace);
    });
  };

  const getChampionshipData = () => {
    const championshipURL = `http://ergast.com/api/f1/current/driverStandings.json?limit=1000`;
    axios.get(championshipURL).then((res) => {
      const standings =
        res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      setChampionshipData(standings);
    });
    console.log(championshipData);
  };

  const getConstructorTable = () => {
    const ConstructorURL = `http://ergast.com/api/f1/current/constructorStandings.json?limit=1000`;
    axios.get(ConstructorURL).then((res) => {
      const standings =
        res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
      setConstructorData(standings);
      console.log(standings);
    });
  };

  useEffect(() => {
    getLastRace();
    getConstructorTable();
  }, []);

  useEffect(() => {
    getChampionshipData();
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

  return (
    <div>
      <Grid
        container
        spacing={0}
        align="center"
        justify="space-around"
        alignContent="flex-start"
        style={{ minHeight: "100vh", minWidth: "100vw" }}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ButtonGroup
            variant="text"
            size="large"
            className={classes.buttonGroup}>
            <Button
              onClick={changeLastRace}
              color={showLastRace ? "primary" : "secondary"}>
              Last Race
            </Button>
            <Button
              onClick={changeDriverTable}
              color={showDriverTable ? "primary" : "secondary"}>
              Driver Standings
            </Button>
            <Button
              onClick={changeConstructorTable}
              color={showConstructorTable ? "primary" : "secondary"}>
              Constructor Standings
            </Button>
          </ButtonGroup>
        </Grid>
        {lastRaceData && showLastRace && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TableContainer className={classes.paper} component={Paper}>
              <Typography component={"span"} variant="h5">{`${
                lastRaceData[lastRaceData.length - 1].Circuit.circuitName
              } Round: ${
                lastRaceData[lastRaceData.length - 1].round
              }`}</Typography>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Pos</StyledTableCell>
                    <StyledTableCell>Driver</StyledTableCell>
                    <StyledTableCell align="right">Team</StyledTableCell>
                    <StyledTableCell align="right">Time</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lastRaceData &&
                    lastRaceData[lastRaceData.length - 1].Results.map(
                      (driver) => {
                        const {
                          positionText,
                          Time,
                          Constructor,
                          Driver,
                          status,
                        } = driver;
                        return (
                          <StyledTableRow key={Driver.familyName}>
                            <StyledTableCell component="th" scope="row">
                              {positionText}
                            </StyledTableCell>
                            <StyledTableCell>
                              {Driver.givenName} {Driver.familyName}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {Constructor.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {Time ? Time.time : status}
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      }
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
        {lastRaceData && showDriverTable && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TableContainer className={classes.paper} component={Paper}>
              <Typography component={"span"} variant="h5">
                Current Championship Standings
              </Typography>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Pos</StyledTableCell>
                    <StyledTableCell>Driver</StyledTableCell>
                    <StyledTableCell align="right">Team</StyledTableCell>
                    <StyledTableCell align="right">Wins</StyledTableCell>
                    <StyledTableCell align="right">Points</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {championshipData &&
                    championshipData.map((driver) => {
                      const {
                        positionText,
                        points,
                        wins,
                        Constructors,
                        Driver,
                      } = driver;
                      return (
                        <StyledTableRow key={Driver.familyName}>
                          <StyledTableCell component="th" scope="row">
                            {positionText}
                          </StyledTableCell>
                          <StyledTableCell>
                            {Driver.givenName} {Driver.familyName}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {Constructors[0].name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {wins}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {points}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
        {lastRaceData && showConstructorTable && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TableContainer className={classes.paper} component={Paper}>
              <Typography component={"span"} variant="h5">
                Current Constructor Standings
              </Typography>
              <Table className={classes.constructorTable}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Pos</StyledTableCell>
                    <StyledTableCell>Team</StyledTableCell>
                    <StyledTableCell align="right">Wins</StyledTableCell>
                    <StyledTableCell align="right">Points</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {constructorData &&
                    constructorData.map((team) => {
                      const { positionText, points, wins, Constructor } = team;
                      return (
                        <StyledTableRow key={Constructor.name}>
                          <StyledTableCell component="th" scope="row">
                            {positionText}
                          </StyledTableCell>
                          <StyledTableCell>{Constructor.name}</StyledTableCell>
                          <StyledTableCell align="right">
                            {wins}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {points}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Grid>
      <Typography variant="h6" align="center">
        All info is sourced from https://ergast.com/mrd/.
      </Typography>
    </div>
  );
};

export default Home;
