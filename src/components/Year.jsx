import React, { useState, useEffect } from "react";
import "../App.css";
import "../styles/year.css";
import "../styles/re-usedStyles.css";
import { Card, Grid, Typography } from "@material-ui/core";
import { driverTeamInfo, textColor, useWindowSize } from "../utils/utils";
import { GetYearChampion, getYearData } from "../services/DataService";
import Selector from "./Selector";
import { getRaceFlag } from "../utils/utils";

function Year() {
  const [yearData, setYearData] = useState();
  const [year, setYear] = useState(2020);
  const [championshipWinner, setChampionshipWinner] = useState();
  const [screenSize, setScreenSize] = useWindowSize();

  const getYearSelectorData = () => {
    setYearData("");
    getYearData(year).then((res) => {
      const races = res.data.MRData.RaceTable;
      setYearData(races);
    });
  };

  const GetYearChampionData = () => {
    GetYearChampion(year).then((res) => {
      const winner =
        res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
      setChampionshipWinner(winner);
    });
  };

  useEffect(() => {
    getYearSelectorData(year);
    GetYearChampionData(year);
  }, [year]);

  return (
    <Grid
      container
      spacing={0}
      align="center"
      justifyContent="space-between"
      alignContent="flex-start"
      style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Selector year={year} changeYear={setYear} />
        {yearData && championshipWinner && (
          <div style={{ marginTop: "30px" }}>
            <Card className="title-card-year">
              <Typography component={"span"} variant="h4">
                {`${year} Season Results`}
              </Typography>
              <Typography variant="h4">{`Championship Winner: ${championshipWinner.Driver.givenName} ${championshipWinner.Driver.familyName}`}</Typography>
            </Card>
            {yearData &&
              yearData.Races.map((race) => {
                console.log(race);
                const { raceName, round, Results, Circuit } = race;
                return (
                  <Card key={round} className="race-card">
                    <Grid
                      container
                      align="left"
                      style={{ minHeight: "100%", minWidth: "100%" }}>
                      <Grid item xs={1} sm={1} md={2} lg={1}>
                        <div className="race-round">
                          <Typography component={"span"} variant="h2">
                            {round}
                          </Typography>
                        </div>
                        {screenSize > 960 ? (
                          <div className="flag-round">
                            <img
                              src={getRaceFlag(Circuit.Location.country)}
                              alt="Bahrain"
                              className="flag-img-year"
                            />
                          </div>
                        ) : null}
                        {screenSize > 960 ? (
                          <div className="flag-round">
                            <img
                              src={getRaceFlag(Results[0].Driver.nationality)}
                              alt="Bahrain"
                              className="flag-img-year"
                            />
                          </div>
                        ) : null}
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <div className="year-race-name">
                          <Typography component={"span"} variant="h5">
                            {raceName}
                          </Typography>
                        </div>
                        <div className="winner-year">
                          <Typography component={"span"} variant="h5">
                            {`Winner: ${Results[0].Driver.givenName} ${Results[0].Driver.familyName}`}
                          </Typography>
                        </div>
                      </Grid>
                      <Grid item xs={3} sm={3} md={2} lg={2}>
                        <div className="team-year">
                          <Typography component={"span"} variant="h5">
                            Team:
                          </Typography>
                        </div>
                        <div className="winner-team-year">
                          <Typography component={"span"} variant="h5">
                            {`${Results[0].Constructor.name}`}
                          </Typography>
                        </div>
                      </Grid>
                      <Grid item xs={2} sm={2} md={2} lg={3}>
                        <div className="grid-year">
                          <Typography component={"span"} variant="h6">
                            Grid:
                          </Typography>
                          <Typography component={"span"} variant="h5">
                            {` ${Results[0].grid} `}
                          </Typography>
                          {screenSize > 1280 && (
                            <div>
                              <Typography component={"span"} variant="h6">
                                Time:
                              </Typography>
                              <Typography component={"span"} variant="h5">
                                {` ${Results[0].Time.time} `}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </Card>
                );
              })}
          </div>
        )}
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={3}>
        <div className="bottom-text">
          <Typography component={"span"} variant="h5">
            dsfhfjsifheuishfsuefsiuefhushefishfihseh
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}

export default Year;
