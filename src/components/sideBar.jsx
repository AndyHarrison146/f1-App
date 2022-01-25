import React, { useEffect, useState } from "react";
import "../styles/sidebar.css";
import { Card, CircularProgress, Grid, Typography } from "@material-ui/core";
import {
  getChampionship,
  getContructors,
  getLastRace,
} from "../services/DataService";
import { driverTeamInfo } from "../utils/utils";

const SideBar = ({ shownComponent }) => {
  const [championshipData, setChampionshipData] = useState();
  const [lastRaceData, setLastRaceData] = useState();
  const [constructorData, setConstructorData] = useState();

  const getConstructorTable = () => {
    getContructors().then((res) => {
      setConstructorData(
        res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
      );
    });
  };

  const getLastRaceData = () => {
    getLastRace().then((res) => {
      setLastRaceData(res.data.MRData.RaceTable.Races);
    });
  };

  const getChampionshipData = () => {
    getChampionship().then((res) => {
      setChampionshipData(
        res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
      );
    });
  };

  useEffect(() => {
    if (shownComponent === "lastRace") {
      getChampionshipData();
      getConstructorTable();
    } else if (shownComponent === "driver") {
      getLastRaceData();
      getConstructorTable();
    } else if (shownComponent === "constructor") {
      getChampionshipData();
    } else return;
  }, []);

  return (
    <div>
      <Grid
        container
        spacing={0}
        align="center"
        justifyContent="space-between"
        alignContent="flex-start">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {lastRaceData && (
            <div className="side-bar-text">
              <Typography component="span" variant="h4">
                Last Race Top 5
              </Typography>
            </div>
          )}
          {lastRaceData &&
            lastRaceData[lastRaceData.length - 1].Results.map((driver, idx) => {
              console.log(driver);
              let top5 = false;
              if (idx < 5) {
                top5 = true;
              }
              const { positionText, Constructor, Driver, points } = driver;
              return (
                <div>
                  {top5 && (
                    <Card key={Driver.givenName} className="sidebar-card">
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
            })}
          {championshipData && (
            <div>
              <div className="side-bar-text">
                <Typography>Championship Standings Top 5</Typography>
              </div>
              {championshipData &&
                championshipData.map((driver, idx) => {
                  console.log(driver);
                  let top5 = false;
                  if (idx < 5) {
                    top5 = true;
                  }
                  const { positionText, points, wins, Constructors, Driver } =
                    driver;
                  return (
                    <div>
                      {top5 && (
                        <Card key={Driver.givenName} className="sidebar-card">
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
          {constructorData && (
            <div>
              <div className="side-bar-text">
                <Typography component="span" variant="h4">
                  Constructor Standings Top 5
                </Typography>
              </div>
              {constructorData &&
                constructorData.map((team, idx) => {
                  let top5 = false;
                  if (idx < 5) {
                    top5 = true;
                  }
                  console.log(constructorData);
                  const { positionText, points, wins, Constructor } = team;
                  return (
                    <div>
                      {top5 && (
                        <Card key={Constructor.name} className="sidebar-card">
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
    </div>
  );
};

export default SideBar;
