import React from "react";
import { Card, CircularProgress, Grid, Typography } from "@material-ui/core";

const ConstructorStandins = ({
  constructorData,
  driverTeamInfo,
  textColor,
}) => {
  return (
    <Grid
      container
      spacing={0}
      align="center"
      justifyContent="space-between"
      alignContent="flex-start"
      style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Grid item xs={12} sm={8} md={8} lg={8}>
        <Card className="title-card">
          <Typography component={"span"} variant="h4" className="title-text">
            Current Constructor Standings
          </Typography>
        </Card>
        {constructorData.map((team) => {
          // console.log(team);
          const { positionText, points, wins, Constructor } = team;
          // console.log(Constructor.name);
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
      <Grid item xs={false} sm={4} md={4} lg={4}>
        <p>haskhfksahdfkahksfhasdkjfhks</p>
      </Grid>
    </Grid>
  );
};

export default ConstructorStandins;
