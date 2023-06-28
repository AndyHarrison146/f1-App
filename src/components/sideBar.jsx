import React, { useEffect, useState } from "react";
import "../styles/sidebar.css";
import { Card, CircularProgress, Grid, Typography } from "@material-ui/core";
import { useWindowSize } from "../utils/utils";
import CurrentChampion from "./CurrentChampion";
import useConstructors from "../hooks/useConstructors";
import useLastRace from "../hooks/useLastRace";
import useChampionship from "../hooks/useChampionship";

const SideBar = ({ shownComponent }) => {
  const { constructors, constructorError } = useConstructors();
  const { lastRace, lastError } = useLastRace();
  const { championship, championshipError } = useChampionship();
  const [screenSize, setScreenSize] = useWindowSize();

  if(!championship) return <CircularProgress />;

  return (
    <div>
      {screenSize > 768 && (
        <Grid
          container
          spacing={0}
          align="center"
          justifyContent="space-between"
          alignContent="flex-start">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CurrentChampion />
            {lastRace && (
              <div className="side-bar-text">
                <Typography component="span" variant="h5">
                  Last Race Top 5
                </Typography>
              </div>
            )}
            {lastRace &&
              lastRace.RaceTable.Races[lastRace.RaceTable.Races.length - 1].Results.map(
                (driver, idx) => {
                  let top5 = false;
                  if (idx < 5) {
                    top5 = true;
                  }
                  const { positionText, Constructor, Driver, points } = driver;
                  return (
                    <div key={Driver.givenName}>
                      {top5 && (
                        <Card className="sidebar-card">
                          <div className="side-bar-content">
                            <div className="sidebar-position">
                              <Typography
                                component="span"
                                variant="h5">{`${positionText}. `}</Typography>
                            </div>
                            <div className="sidebar-info">
                              <div className="sidebar-info-top">
                                <Typography
                                  component="span"
                                  style={{ float: "left" }}
                                  variant="h5">{`${Driver.givenName} ${Driver.familyName}`}</Typography>
                              </div>
                              <div className="sidebar-info-points">
                                <Typography component="span" variant="h4">
                                  {points}
                                </Typography>
                              </div>
                              <div className="sidebar-info-bottom">
                                <Typography
                                  component="span"
                                  variant="h6"
                                  style={{ float: "left" }}>
                                  {Constructor.name}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </Card>
                      )}
                    </div>
                  );
                }
              )}
            {championship && (
              <div>
                <div className="side-bar-text">
                  <Typography component="span" variant="h5">Championship Standings Top 5</Typography>
                </div>
                {championship &&
                  championship.StandingsTable.StandingsLists[0].DriverStandings.map((driver, idx) => {
                    let top5 = false;
                    if (idx < 5) {
                      top5 = true;
                    }
                    const { positionText, points, wins, Constructors, Driver } =
                      driver;
                    return (
                      <div key={Driver.givenName}>
                        {top5 && (
                          <Card className="sidebar-card">
                            <div className="side-bar-content">
                              <div className="sidebar-position">
                                <Typography
                                  component="span"
                                  variant="h5">{`${positionText}. `}</Typography>
                              </div>
                              <div className="sidebar-info">
                                <div className="sidebar-info-top">
                                  <Typography
                                    component="span"
                                    style={{ float: "left" }}
                                    variant="h5">{`${Driver.givenName} ${Driver.familyName}`}</Typography>
                                </div>
                                <div className="sidebar-info-points">
                                  <Typography component="span" variant="h5">
                                    {points}
                                  </Typography>
                                </div>
                                <div className="sidebar-info-bottom">
                                  <Typography
                                    component="span"
                                    variant="h6"
                                    style={{ float: "left" }}>
                                    {Constructors[0].name}
                                  </Typography>
                                </div>
                              </div>
                            </div>
                          </Card>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
            {constructors && (
              <div>
                <div className="side-bar-text">
                  <Typography component="span" variant="h5">
                    Constructor Standings Top 5
                  </Typography>
                </div>
                {constructors &&
                  constructors.StandingsTable.StandingsLists[0].ConstructorStandings.map((team, idx) => {
                    let top5 = false;
                    if (idx < 5) {
                      top5 = true;
                    }
                    const { positionText, points, wins, Constructor } = team;
                    return (
                      <div key={Constructor.name}>
                        {top5 && (
                          <Card className="sidebar-card">
                            <div className="side-bar-content">
                              <div style={{ float: "left", width: "100%" }}>
                                <div className="sidebar-position">
                                  <Typography component="span" variant="h4">
                                    {`${positionText}. `}
                                  </Typography>
                                </div>
                                <div className="sidebar-info">
                                  <div className="sidebar-top">
                                    <Typography
                                      component="span"
                                      variant="h4"
                                      style={{
                                        float: "left",
                                        marginTop: "12px",
                                      }}>
                                      {Constructor.name}
                                    </Typography>
                                  </div>
                                  <div className="sidebar-points">
                                    <Typography
                                      component="span"
                                      variant="h5"
                                      style={{
                                        marginTop: "12px",
                                        float: "right",
                                      }}>
                                      {points}
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default SideBar;
