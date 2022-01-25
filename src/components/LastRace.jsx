import React, { useEffect, useState } from "react";
import { Card, Grid, Typography } from "@material-ui/core";
import CurrentChampion from "./CurrentChampion";
import { driverTeamInfo, textColor } from "../utils/utils";
import { getLastRace } from "../services/DataService";
import SideBar from "./sideBar";

const LastRace = () => {
  const [lastRaceData, setLastRaceData] = useState();
  const shownComponent = "lastRace";

  useEffect(() => {
    getLastRaceData();
  }, []);

  const getLastRaceData = () => {
    getLastRace().then((res) => {
      setLastRaceData(res.data.MRData.RaceTable.Races);
    });
  };

  return (
    <Grid
      container
      spacing={0}
      align="center"
      justifyContent="space-between"
      alignContent="flex-start"
      style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Grid item xs={12} sm={8} md={8} lg={8}>
        {lastRaceData && (
          <div style={{ marginTop: "30px" }}>
            <Card className="title-card">
              <Typography component={"span"} variant="h4">{`${
                lastRaceData[lastRaceData.length - 1].Circuit.circuitName
              } Round: ${
                lastRaceData[lastRaceData.length - 1].round
              }`}</Typography>
            </Card>
          </div>
        )}
        {lastRaceData &&
          lastRaceData[lastRaceData.length - 1].Results.map((driver) => {
            const { positionText, Time, Constructor, Driver, status } = driver;
            const teamColor = driverTeamInfo(driver.Constructor.name).primary;
            const teamImg = driverTeamInfo(driver.Constructor.name).url;
            return (
              <div>
                <Card className="position-card" key={Driver.familyName}>
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
                          Points
                        </Typography>
                      </div>
                      <div className="time-text">
                        <Typography component={"span"} variant="h6">
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
      {window.innerWidth < 800 ? null : (
        <Grid item xs={false} sm={false} md={4} lg={4}>
          <CurrentChampion />
          <SideBar shownComponent={shownComponent} />
        </Grid>
      )}
    </Grid>
  );
};

export default LastRace;
