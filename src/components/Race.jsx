import React, { useState, useEffect } from "react";
import "../App.css";
import "../styles/race.css";
import { Card, Grid, Typography } from "@material-ui/core";
import { useWindowSize } from "../utils/utils";
import {
  getRoundsFromSeason,
  getRaceFromSeason,
  // getLastRace,
} from "../services/DataService";
import Selector from "./Selector";
import { getRaceFlag } from "../utils/utils";
import RaceSelect from "./RaceSelect";
import useSeasonResults from "../hooks/useSeasonResults";

const Race = () => {
  const [season, setSeason] = useState();
  const { results, error } = useSeasonResults(season)
  const [round, setRound] = useState();
  const [races, setRaces] = useState();
  const [raceData, setRaceData] = useState();
  const [screenSize, setScreenSize] = useWindowSize();

  const handleSeasonChange = (season) => {
    setSeason(season.value)
  }

  const handleRoundChange = ({value}) => {
    setRound(value)
    results.RaceTable.Races.forEach(race => {
      if(race.round === value) setRaceData(race)
    })

  }

  return (
    <Grid
      container
      spacing={0}
      align="center"
      justifyContent="space-between"
      alignContent="flex-start"
      style={{ minHeight: "100vh", minWidth: "100vw", marginBottom: '20px' }}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <RaceSelect 
          season={season} 
          round={round}
          roundsArr={results?.RaceTable.Races}
          onSeasonChange={handleSeasonChange} 
          onRoundChange={handleRoundChange} 
        />
        {raceData && (
          <div>
            <Card className="title-card">
              <Typography component={"span"} variant="h4">
                {`${season} ${raceData.raceName} Results`}
              </Typography>
            </Card>
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
                  points,
                } = driver;
                return (
                  <Card key={Driver.familyName} className="race-card">
                    <Grid
                      container
                      align="left"
                      style={{ minHeight: "100%", minWidth: "100%" }}>
                      <Grid item xs={1} sm={1} md={1} lg={1}>
                        <div className="race-pos">
                          <Typography component={"span"} variant="h2">
                            {positionText}
                          </Typography>
                        </div>
                      </Grid>
                      {screenSize > 600 ? (
                        <Grid item xs={false} sm={1} md={1} lg={1}>
                          <div className="flag-race">
                            <img
                              src={getRaceFlag(Driver.nationality)}
                              alt={Driver.nationality}
                              className="flag-img-race"
                            />
                          </div>
                        </Grid>
                      ) : null}
                      <Grid item xs={6} sm={4} md={4} lg={4}>
                        <div className="driver-race">
                          <Typography component={"span"} variant="h5">
                            {`
                          #${number}. ${Driver.givenName} 
                          ${Driver.familyName}`}
                          </Typography>
                        </div>
                        <div className="team-race">
                          <Typography component={"span"} variant="h5">
                            {` ${Constructor.name}`}
                          </Typography>
                        </div>
                      </Grid>
                      {screenSize > 600 && (
                        <Grid item xs={false} sm={2} md={2} lg={2}>
                          <div className="grid-race">
                            <Typography component={"span"} variant="h5">
                              Grid:
                            </Typography>
                          </div>
                          <div className="grid-race-number">
                            <Typography component={"span"} variant="h5">
                              {grid}
                            </Typography>
                          </div>
                        </Grid>
                      )}
                      <Grid item xs={2} sm={2} md={2} lg={3}>
                        <div className="points-race">
                          <Typography component={"span"} variant="h5">
                            Points:
                          </Typography>
                        </div>
                        <div className="points-race-number">
                          <Typography component={"span"} variant="h5">
                            {points}
                          </Typography>
                        </div>
                      </Grid>
                      <Grid item xs={3} sm={2} md={2} lg={1}>
                        <div className="time-text" style={{marginTop: screenSize > 600 ? '15px' : '5px'}}>
                          <Typography component={"span"} variant="h5">
                            Time:
                          </Typography>
                        </div>
                        <div className="time-status">
                          <Typography component={"span"} variant="h5">
                            {Time ? Time.time : status}
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </Card>
                );
              })}
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default Race;
