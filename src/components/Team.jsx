import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
} from "@material-ui/core";
import { useStyles } from "../styles";
import { Teams } from "../assets/Teams";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import "../styles/team.css";
import { getAllDriversChampionships, getTeam, getTeamChampionships, getTeamWins } from "../services/DataService";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Team = () => {
  const classes = useStyles();
  const [cardData, setCardData] = useState();
  const [cardChampionships, setCardChampionships] = useState();
  const [cardWins, setCardWins] = useState();
  const [driversChampionships, setDriversChampionships] = useState(0);
  const [showCard, setShowCard] = useState(false);
  let driverChampionshipsCount = 0;
  const teamArr = [];

  const getCardTeam = (teamName) => {
      getTeam(teamName).then((res) => {
        const teamRes = res.data.MRData.ConstructorTable.Constructors[0];
        setCardData(teamRes);
      });
  };

  const getCardWins = (teamName) => {
      getTeamWins(teamName).then((res) => {
        const winRes = res.data.MRData.RaceTable.Races;
        setCardWins(winRes.length);
      });
  };

  const getCardChampionships = (teamName) => {
      getTeamChampionships(teamName).then((res) => {
        const champRes = res.data.MRData.StandingsTable.StandingsLists;
        setCardChampionships(champRes.length);
      });
  };

  const getDriversChampionships = () => {
      getAllDriversChampionships().then((res) => {
        const driverChampRes = res.data.MRData.StandingsTable.StandingsLists;
        setDriversChampionships(driverChampRes);
      });
  };

  const handleCardClose = () => {
    setDriversChampionships(0);
    setCardChampionships();
    setCardData();
    setShowCard(!showCard);
    setCardWins();
  };

  useEffect(() => {
    Teams.map((team) => {
      teamArr.push(team.name);
    });
  }, []);

  const handleCardClick = (event) => {
    const teamName = event.target.parentElement.parentElement.id
      .replace(/\s/g, "_")
      .toLowerCase();
    getCardTeam(teamName);
    getCardWins(teamName);
    getCardChampionships(teamName);
    getDriversChampionships(teamName);
    setShowCard(!showCard);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      align="center"
      justifyContent="space-around"
      alignContent="flex-start"
      style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {Teams.map((team) => {
          return (
            <Grid id={team.id} key={team.id} item xs={6} sm={6} md={6} lg={6}>
              <Card
                key={team.name}
                id={team.id}
                className={classes.teamCard}
                style={{ backgroundColor: "#fafafa" }}>
                <ButtonBase
                  id={team.id}
                  onClick={(event) => handleCardClick(event)}>
                  <CardContent>
                    <img
                      src={team.url}
                      id={team.id}
                      className={classes.teamImg}
                    />
                    <Typography id={team.id} variant="h4" align="center">
                      {team.name}
                    </Typography>
                  </CardContent>
                </ButtonBase>
              </Card>
            </Grid>
          );
        })}
        {showCard && cardData && (
          <Grid item xs={10} sm={10} md={6} lg={6}>
            <Dialog
              open={showCard}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => {
                handleCardClose();
              }}
              maxWidth="md"
              fullWidth>
              <Button
                className="close-button"
                onClick={() => {
                  handleCardClose();
                }}>
                <CloseIcon />
              </Button>
              {Teams.map((team) => {
                if (team.id === cardData.constructorId) {
                  return (
                    <DialogContent key={team.name}>
                      <Typography
                        variant="h2"
                        align="center"
                        style={{marginBottom: '40px'}}
                        >{`${team.displayName}`}
                        </Typography>
                      <div className="team-card-img">
                        <div className="team-card-img-left">
                          <Typography variant="h4">{team.driver1}</Typography>
                          <img
                            src={team.driver1Url}
                            alt=""
                            className="driver-img-team"
                          />
                        </div>
                        <div className="team-card-img-right">
                          <Typography variant="h4">{team.driver2}</Typography>
                          <img
                            src={team.driver2Url}
                            alt=""
                            className="driver-img-team"
                          />
                        </div>
                      </div>
                      <div className={classes.cardInfo}>
                        <Typography
                          variant="h5"
                          align="center"
                          >
                            {`Team Name: ${team.displayName}`}
                        </Typography>
                        <Typography
                          variant="h5"
                          align="center">
                            {`Nationality: ${cardData.nationality}`}
                        </Typography>
                        <Typography
                          variant="h5"
                          align="center">
                            {`Team Principal: ${team.teamPrincipal}`}
                        </Typography>
                      </div>
                      <Grid
                        container
                        spacing={0}
                        align="center"
                        justifyContent="space-between"
                        alignContent="flex-start"
                        style={{ minHeight: "100%", minWidth: "100%" }}>
                          <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Typography
                              align="center"
                              variant="h4"
                              style={{
                              marginBottom: "10%"}}>
                                {`Total Wins`}
                            </Typography>

                          </Grid>
                          <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Typography variant="h4" align='center'>
                              {`Constructors Championships:`}
                            </Typography>

                          </Grid>
                          <Grid item xs={4} sm={4} md={4} lg={4}>
                            {cardData &&
                            driversChampionships &&
                            driversChampionships.map((year) => {
                              if (
                                year.DriverStandings[0].Constructors[0]
                                .constructorId === cardData.constructorId
                              ) {
                                driverChampionshipsCount++;
                              }
                            })}
                            <Typography
                              variant="h4"
                              align="center">{`Drivers Championships:`}</Typography>

                          </Grid>
                        </Grid>
                        <Grid
                        container
                        spacing={0}
                        align="center"
                        justifyContent="space-between"
                        alignContent="flex-start"
                        style={{ minHeight: "100%", minWidth: "100%" }}>
                          <Grid item xs={4} sm={4} md={4} lg={4}>
                              <Typography align="center" variant="h3">
                                {cardWins}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Typography variant="h3" align="center">
                              {cardChampionships}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Typography variant="h3" align="center">
                              {driverChampionshipsCount}
                            </Typography>
                          </Grid>
                        </Grid>
                    </DialogContent>
                  );
                }
              })}
              <DialogActions></DialogActions>
            </Dialog>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant="h6" align="center" style={{marginTop: '100px'}}>
          All info is sourced from https://ergast.com/mrd/. All Images are
          sourced from Wikipedia and are used under CC(CreativeCommons) License
          or to thier respective brands, i do not claim to own the rights to any
          images used.{" "}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Team;

// target.nextSibling.outerText
