import React, { useState, useEffect } from "react";
import "../App.css";
import "../styles/year.css";
import "../styles/re-usedStyles.css";
import { Card, CircularProgress, Grid, Typography } from "@material-ui/core";
import { useWindowSize } from "../utils/utils";
import Selector from "./Selector";
import YearSelect from './YearSelect'
import { getRaceFlag } from "../utils/utils";
import useYearResults from "../hooks/useYearResults";
import useYearChampion from "../hooks/useYearChampion";
import { useSWRConfig } from "swr";

function Year() {
  const [year, setYear] = useState(2022);
  const [screenSize, setScreenSize] = useWindowSize();
  const { results, resultsError } = useYearResults(year);
  const { champion, championError } = useYearChampion(year);

  // if(!results || !champion) return <div style={{padding: '38%'}}><CircularProgress /></div>;

  const getFontSize = () => {
    if (screenSize < 600) {
      return 'h6';
    }
    return 'h5'
  }

  const championDriver = champion?.StandingsTable.StandingsLists[0].DriverStandings[0]

  const handleYearChange = (year) => {
    setYear(year.value)
  }

  return (
    <Grid
      container
      spacing={0}
      align="center"
      justifyContent="space-between"
      style={{ minHeight: "100vh", minWidth: "100vw"}}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <YearSelect value={year} onChange={handleYearChange} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {(!results || !champion) && 
          <div style={{padding: '38%'}}>
            <CircularProgress />
          </div>
        }
        {results && championDriver && (
          <div style={{ marginTop: "30px" }}>
            <Card className="title-card-year">
              <Typography component={"span"} variant="h4">
                {`${year} Season Results`}
              </Typography>
              <Typography variant="h4">{`Championship Winner: ${championDriver.Driver.givenName} ${championDriver.Driver.familyName}`}</Typography>
            </Card>
            {results &&
              results.RaceTable.Races.map((race) => {
                const { raceName, round, Results, Circuit } = race;
                return (
                  <Card key={round} className="race-card">
                    <Grid
                      container
                      align="left"
                      style={{ minHeight: "100%", minWidth: "100%" }}>
                      <Grid item xs={1} sm={1} md={2} lg={1}>
                        <div className="race-round">
                          <Typography component={"span"} variant="h3">
                            {round}
                          </Typography>
                        </div>
                        <div className="flag-container">
                          {screenSize > 960 ? (
                            <div className="flag-round">
                              <img
                                src={getRaceFlag(Circuit.Location.country)}
                                alt="No Flag"
                                className="flag-img-year"
                              />
                            </div>
                          ) : null}
                          {screenSize > 960 ? (
                            <div className="flag-round">
                              <img
                                src={getRaceFlag(Results[0].Driver.nationality)}
                                alt="No Flag"
                                className="flag-img-year"
                              />
                            </div>
                          ) : null}
                        </div>
                      </Grid>
                      <Grid item xs={6} sm={6} md={5} lg={6}>
                        <div className="year-race-name">
                          <Typography component={"span"} variant={getFontSize()}>
                            {raceName}
                          </Typography>
                        </div>
                        <div className="winner-year">
                          <Typography component={"span"} variant={getFontSize()}>
                            {`Winner: ${Results[0].Driver.givenName} ${Results[0].Driver.familyName}`}
                          </Typography>
                        </div>
                      </Grid>
                      <Grid item xs={3} sm={3} md={2} lg={2}>
                        <div className="team-year">
                          <Typography component={"span"} variant={getFontSize()}>
                            {`${Results[0].Constructor.name}`}
                          </Typography>
                        </div>
                      </Grid>
                      <Grid item xs={2} sm={2} md={3} lg={3}>
                        <div className="grid-year">
                          <Typography component={"span"} variant={getFontSize()}>
                            Grid:
                          </Typography>
                          <Typography component={"span"} variant={getFontSize()}>
                            {` ${Results[0].grid} `}
                          </Typography>
                          {screenSize > 960 && (
                            <div>
                              <Typography component={"span"} variant={getFontSize()}>
                                Time:
                              </Typography>
                              <Typography component={"span"} variant={getFontSize()}>
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
    </Grid>
  );
}

export default Year;
