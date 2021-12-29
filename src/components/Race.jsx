import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, Grid, Typography, Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Selector from "./Selector";
import { useStyles } from "../styles";

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

const Race = () => {
  const classes = useStyles();
  const [round, setRound] = useState();
  const [season, setSeason] = useState();
  const [races, setRaces] = useState();
  const [raceData, setRaceData] = useState();

  const getLastRace = () => {
    const lastRaceURL = `http://ergast.com/api/f1/current/last/results.json?limit=1000`;
    axios.get(lastRaceURL).then((res) => {
      const lastRace = res.data.MRData.RaceTable.Races[0];
      if (!season) {
        setSeason(lastRace.season);
      }
      setRaceData(lastRace);
    });
  };

  const getRounds = () => {
    season &&
      axios
        .get(`http://ergast.com/api/f1/${season}.json?limit=1000`)
        .then((res) => {
          const rounds = res.data.MRData.RaceTable.Races;
          setRaces(rounds);
        });
  };

  const getRoundData = () => {
    season &&
      round &&
      axios
        .get(
          `http://ergast.com/api/f1/${season}/${round}/results.json?limit=1000`
        )
        .then((res) => {
          const raceRes = res.data.MRData.RaceTable.Races[0];
          setRaceData(raceRes);
        });
  };
  useEffect(() => {
    getLastRace();
  }, []);

  useEffect(() => {
    getRounds();
  }, [season]);

  useEffect(() => {
    getRoundData();
  }, [round]);

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      align="center"
      style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Selector
          season={season}
          changeSeason={setSeason}
          races={races}
          changeRound={setRound}
          changeRaceData={setRaceData}
        />
        {raceData ? (
          <div className={classes.root} style={{ marginTop: "20px" }}>
            <Card className="title-card">
              <Typography
                component={"span"}
                variant="h4">{`${season} ${raceData.raceName} Results`}</Typography>
            </Card>
            <TableContainer className={classes.paper} component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Pos</StyledTableCell>
                    <StyledTableCell>Grid Pos</StyledTableCell>
                    <StyledTableCell>Driver</StyledTableCell>
                    <StyledTableCell align="right">Driver No.</StyledTableCell>
                    <StyledTableCell align="right">Team</StyledTableCell>
                    <StyledTableCell align="right">Time</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {raceData &&
                    raceData.Results.map((driver) => {
                      const {
                        positionText,
                        Time,
                        Constructor,
                        number,
                        Driver,
                        grid,
                        status,
                      } = driver;
                      return (
                        <StyledTableRow key={Driver.familyName}>
                          <StyledTableCell component="th" scope="row">
                            {positionText}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {grid}
                          </StyledTableCell>
                          <StyledTableCell>
                            {Driver.givenName} {Driver.familyName}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {number}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {Constructor.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {Time ? Time.time : status}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <CircularProgress className={classes.circle} />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant="h6" align="center">
          All info is sourced from https://ergast.com/mrd/.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Race;
