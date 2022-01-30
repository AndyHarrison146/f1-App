import React, { useEffect, useState } from "react";
import { Card, Grid, Typography } from "@material-ui/core";
import { driverTeamInfo, textColor, useWindowSize } from "../utils/utils";
import {
  getChampionship,
  getDriverChampionships,
} from "../services/DataService";
import SideBar from "./sideBar";
import CurrentChampion from "./CurrentChampion";
import "../styles/re-usedStyles.css";

const DriverStandings = () => {
  const [championshipData, setChampionshipData] = useState();
  const [screenSize, setScreenSize] = useWindowSize();
  const shownComponent = "driver";

  useEffect(() => {
    getChampionshipData();
  }, []);

  const getChampionshipData = () => {
    getChampionship().then((res) => {
      setChampionshipData(
        res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
      );
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
        <div style={{ marginTop: "30px" }}>
          <Card className="title-card">
            <Typography component={"span"} variant="h4">
              Current Championship Standings
            </Typography>
          </Card>
        </div>
        {championshipData &&
          championshipData.map((driver) => {
            const { positionText, points, wins, Constructors, Driver } = driver;
            console.log(driver);
            const teamColor = driverTeamInfo(
              driver.Constructors[0].name
            ).primary;
            const teamImg = driverTeamInfo(driver.Constructors[0].name).url;
            return (
              <div>
                <Card className="position-card" key={Driver.driverId}>
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
                        <Typography component={"span"} variant="h4">
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
                          <Typography component={"span"} variant="h5">
                            {Constructors[0].name}
                          </Typography>
                        ) : (
                          <img
                            src={teamImg}
                            alt={Constructors[0].name}
                            className={`team-img-${Constructors[0].constructorId}`}
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
      <Grid item xs={false} sm={4} md={4} lg={4}>
        <SideBar shownComponent={shownComponent} />
      </Grid>
    </Grid>
  );
};

export default DriverStandings;
