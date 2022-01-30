import React, { useState, useEffect } from "react";
import "../styles/schedule.css";
import axios from "axios";
import { Grid, Typography, Card } from "@material-ui/core";
import { useStyles } from "../styles";
import moment from "moment";
import { getRaceFlag } from "../utils/utils";

const Schedule = () => {
  const classes = useStyles();
  const [scheduleData, setScheduleData] = useState();

  const getSchedule = () => {
    axios.get(`http://ergast.com/api/f1/2022.json`).then((res) => {
      const schedule = res.data.MRData.RaceTable.Races;
      setScheduleData(schedule);
    });
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <Grid
      container
      spacing={0}
      align="center"
      justifyContent="space-between"
      alignContent="flex-start"
      style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card className="title-card">
          <Typography component={"span"} variant="h4">
            2022 Calendar
          </Typography>
        </Card>
        {scheduleData &&
          scheduleData.map((race) => {
            const { raceName, round, date, time, Circuit } = race;
            console.log(race);
            return (
              <Card className="race-card" key={round}>
                <Grid
                  container
                  align="left"
                  style={{ minHeight: "100%", minWidth: "100%" }}>
                  <Grid item xs={2} sm={2} md={2} lg={2}>
                    <div className="flag">
                      <img
                        src={getRaceFlag(Circuit.Location.country)}
                        alt="Bahrain"
                        className="flag-img"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={5} sm={5} md={6} lg={6}>
                    <div className="raceName">
                      <Typography component={"span"} variant="h4">
                        {raceName}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={5} sm={5} md={4} lg={4}>
                    <div className="raceDate">
                      <Typography component={"span"} variant="h4">
                        {moment(date).format("MMM Do YYYY")}
                      </Typography>
                    </div>
                    <div className="race-bottom">
                      <Typography component={"span"} variant="h4">
                        Time:{time}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default Schedule;
