import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/home.css";
import "../styles/teamColors.css";
import { Card, CircularProgress, Grid, Typography } from "@material-ui/core";
import { useStyles } from "../styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Teams } from "../assets/Teams";

const Home = () => {
  const classes = useStyles();
  const [lastRaceData, setLastRaceData] = useState();
  const [championshipData, setChampionshipData] = useState();
  const [constructorData, setConstructorData] = useState();
  const [showLastRace, setShowLastRace] = useState(true);
  const [showDriverTable, setShowDriverTable] = useState(false);
  const [showConstructorTable, setShowConstructorTable] = useState(false);
  const [currentChampion, setCurrentChampiom] = useState();

  const getLastRace = () => {
    const lastRaceURL = `http://ergast.com/api/f1/current/last/results.json?limit=1000`;
    axios.get(lastRaceURL).then((res) => {
      const lastRace = res.data.MRData.RaceTable.Races;
      setLastRaceData(lastRace);
    });
  };

  const getChampion = () => {
    const url = `http://ergast.com/api/f1/last/driverStandings.json?limit=1000`;
    axios.get(url).then((res) => {
      console.log(res);
    });
  };

  const getChampionshipData = () => {
    const championshipURL = `http://ergast.com/api/f1/current/driverStandings.json?limit=1000`;
    axios.get(championshipURL).then((res) => {
      const standings =
        res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      setChampionshipData(standings);
    });
  };

  // const getConstructorTable = () => {
  //   const ConstructorURL = `http://ergast.com/api/f1/current/constructorStandings.json?limit=1000`;
  //   axios.get(ConstructorURL).then((res) => {
  //     const standings =
  //       res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
  //     setConstructorData(standings);
  //   });
  // };

  useEffect(() => {
    getLastRace();
    // getConstructorTable();
  }, []);

  useEffect(() => {
    getChampionshipData();
    getChampion();
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

  console.log(Teams[0].url);

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
        justify="space-between"
        alignContent="flex-start"
        style={{ minHeight: "100vh", minWidth: "100vw" }}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ButtonGroup
            variant="text"
            size="large"
            className={classes.buttonGroup}>
            <Button
              onClick={changeLastRace}
              color={showLastRace ? "primary" : "black"}>
              Last Race
            </Button>
            <Button
              onClick={changeDriverTable}
              color={showDriverTable ? "primary" : "black"}>
              Driver Standings
            </Button>
            <Button
              onClick={changeConstructorTable}
              color={showConstructorTable ? "primary" : "black"}>
              Constructor Standings
            </Button>
          </ButtonGroup>
        </Grid>
        {showLastRace && !lastRaceData && loadingCircle()}
        {showLastRace && lastRaceData && (
          <Grid
            container
            spacing={0}
            align="center"
            justify="space-between"
            alignContent="flex-start"
            style={{ minHeight: "100vh", minWidth: "100vw" }}>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <Card className="title-card">
                <Typography component={"span"} variant="h4">{`${
                  lastRaceData[lastRaceData.length - 1].Circuit.circuitName
                } Round: ${
                  lastRaceData[lastRaceData.length - 1].round
                }`}</Typography>
              </Card>
              {lastRaceData[lastRaceData.length - 1].Results.map((driver) => {
                const {
                  positionText,
                  Time,
                  Constructor,
                  Driver,
                  status,
                } = driver;
                const teamColor = driverTeamInfo(driver.Constructor.name)
                  .primary;
                const teamImg = driverTeamInfo(driver.Constructor.name).url;
                return (
                  <div>
                    <Card className="position-card">
                      <div key={Driver.familyName}>
                        <div className={`color-${teamColor}`}>
                          <Typography
                            component={"span"}
                            variant="h1"
                            className={textColor(driver.Constructor.name)}>
                            {positionText}
                          </Typography>
                        </div>
                        <div className="position">
                          <div className="driver">
                            <Typography
                              component={"span"}
                              variant="h4"
                              className="driver-number">
                              #{driver.number}. {Driver.givenName}{" "}
                              {Driver.familyName}
                            </Typography>
                          </div>
                          <div className="points-text">
                            <Typography component={"span"} variant="h6">
                              {/* {driver.points} */}
                              Points
                            </Typography>
                          </div>
                          <div className="time-text">
                            <Typography component={"span"} variant="h6">
                              {/* {Time ? Time.time : status} */}
                              Time
                            </Typography>
                          </div>
                        </div>
                        <div className="position-bottom">
                          <div className="team">
                            {window.innerWidth < 600 ? (
                              <Typography
                                component={"span"}
                                variant="h5"
                                className="team-name">
                                {Constructor.name}
                              </Typography>
                            ) : (
                              <img
                                src={teamImg}
                                alt={Constructor.name}
                                className={`team-img-${Constructor.constructorId}`}
                              />
                            )}
                          </div>
                          <div className="points">
                            <Typography component={"span"} variant="h5">
                              {driver.points}
                            </Typography>
                          </div>
                          <div className="time">
                            <Typography component={"span"} variant="h5">
                              {Time ? Time.time : status}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </Grid>
            <Grid item xs={0} sm={4} md={4} lg={4}>
              <div>
                {championshipData &&
                  championshipData.map((driver) => {
                    console.log(driver);
                    return (
                      <Card className="side-card-champion">
                        <div className="driver-champion">
                          <Typography
                            component={"span"}
                            variant="h5"></Typography>
                        </div>
                      </Card>
                    );
                  })}
              </div>
            </Grid>
          </Grid>
        )}
        {showDriverTable && !championshipData && loadingCircle()}
        {showDriverTable && championshipData && (
          <Grid
            container
            spacing={0}
            align="center"
            justify="space-between"
            alignContent="flex-start"
            style={{ minHeight: "100vh", minWidth: "100vw" }}>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <Card className="title-card">
                <Typography
                  component={"span"}
                  variant="h4"
                  className="title-text">
                  Current Championship Standings
                </Typography>
              </Card>
              {championshipData.map((driver) => {
                const {
                  positionText,
                  points,
                  wins,
                  Constructors,
                  Driver,
                } = driver;
                console.log(driver);
                const teamColor = driverTeamInfo(driver.Constructors[0].name)
                  .primary;
                const teamImg = driverTeamInfo(driver.Constructors[0].name).url;
                console.log(driver);
                return (
                  <div>
                    <Card className="position-card">
                      <div key={Driver.familyName}>
                        <div className={`color-${teamColor}`}>
                          <Typography
                            component={"span"}
                            variant="h1"
                            className={textColor(driver.Constructors[0].name)}>
                            {positionText}
                          </Typography>
                        </div>
                        <div className="position">
                          <div className="driver">
                            <Typography
                              component={"span"}
                              variant="h4"
                              className="driver-number">
                              #{Driver.permanentNumber}. {Driver.givenName}{" "}
                              {Driver.familyName}
                            </Typography>
                          </div>
                          <div className="wins-text">
                            <Typography component={"span"} variant="h6">
                              Wins
                            </Typography>
                          </div>
                          <div className="points-text-standings">
                            <Typography component={"span"} variant="h6">
                              Points
                            </Typography>
                          </div>
                        </div>
                        <div className="position-bottom">
                          <div className="team">
                            {window.innerWidth < 600 ? (
                              <Typography
                                component={"span"}
                                variant="h5"
                                className="team-name">
                                {Constructors[0].name}
                              </Typography>
                            ) : (
                              <img
                                src={teamImg}
                                alt={Constructors[0].name}
                                className="team-img"
                              />
                            )}
                          </div>
                          <div className="wins">
                            <Typography component={"span"} variant="h5">
                              {wins}
                            </Typography>
                          </div>
                          <div className="points-standings">
                            <Typography component={"span"} variant="h5">
                              {points}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </Grid>
            <Grid item xs={0} sm={4} md={4} lg={4}>
              <p>haskhfksahdfkahksfhasdkjfhks</p>
            </Grid>
          </Grid>
        )}
        {showConstructorTable && !constructorData && loadingCircle()}
        {showConstructorTable && constructorData && (
          <Grid
            container
            spacing={0}
            align="center"
            justify="space-between"
            alignContent="flex-start"
            style={{ minHeight: "100vh", minWidth: "100vw" }}>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <Card className="title-card">
                <Typography
                  component={"span"}
                  variant="h4"
                  className="title-text">
                  Current Constructor Standings
                </Typography>
              </Card>
              {constructorData.map((team) => {
                console.log(team);
                const { positionText, points, wins, Constructor } = team;
                console.log(Constructor.name);
                const teamColor = driverTeamInfo(Constructor.name).primary;
                const teamImg = driverTeamInfo(Constructor.name).url;
                return (
                  <div>
                    <Card className="position-card">
                      <div key={Constructor.name}>
                        <div className={`color-${teamColor}`}>
                          <Typography
                            component={"span"}
                            variant="h1"
                            className={textColor(Constructor.name)}>
                            {positionText}
                          </Typography>
                        </div>
                        <div className="position">
                          <div className="driver">
                            <Typography
                              component={"span"}
                              variant="h5"
                              className="team-name">
                              {Constructor.name}
                            </Typography>
                          </div>
                          <div className="wins-text">
                            <Typography component={"span"} variant="h6">
                              Wins
                            </Typography>
                          </div>
                          <div className="points-text-standings">
                            <Typography component={"span"} variant="h6">
                              Points
                            </Typography>
                          </div>
                        </div>
                        <div className="position-bottom">
                          <div className="team-img-constructor">
                            <img
                              src={teamImg}
                              alt={Constructor.name}
                              className={`team-img-${Constructor.constructorId}`}
                            />
                          </div>
                          <div className="wins-constructor">
                            <Typography component={"span"} variant="h5">
                              {wins}
                            </Typography>
                          </div>
                          <div className="points-standings">
                            <Typography component={"span"} variant="h5">
                              {points}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </Grid>
            <Grid item xs={0} sm={4} md={4} lg={4}>
              <p>haskhfksahdfkahksfhasdkjfhks</p>
            </Grid>
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
