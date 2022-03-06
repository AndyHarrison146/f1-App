import React, { useEffect, useState } from "react";
import { Card, Grid, Typography } from "@material-ui/core";
import { driverTeamInfo, textColor } from "../utils/utils";
import { getContructors } from "../services/DataService";
import SideBar from "./sideBar";
import CurrentChampion from "./CurrentChampion";
import "../styles/re-usedStyles.css";

const ConstructorStandins = () => {
  const [constructorData, setConstructorData] = useState();
  const shownComponent = "constructor";

  useEffect(() => {
    getConstructorTable();
  }, []);

  const getConstructorTable = () => {
    getContructors().then((res) => {
      setConstructorData(
        res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
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
            <Typography component={"span"} variant="h3">
              Current Constructor Standings
            </Typography>
          </Card>
        </div>
        {constructorData &&
          constructorData.map((team) => {
            const { positionText, points, wins, Constructor } = team;
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
                        <Typography component={"span"} variant="h5">
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
                      <div className="team">
                        <img
                          src={teamImg}
                          alt={Constructor.name}
                          className={`team-img-${Constructor.constructorId}`}
                        />
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

export default ConstructorStandins;
