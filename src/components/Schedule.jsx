import React, { useState, useEffect } from "react";
import "../App.css";
import "../styles/schedule.css";
import axios from "axios";
import { CircularProgress, Grid, Typography, Card } from "@material-ui/core";
import { useStyles } from "../styles";
import moment from "moment";

const Schedule = () => {
  const classes = useStyles();
  const [scheduleData, setScheduleData] = useState();

  const getSchedule = () => {
    axios.get(`http://ergast.com/api/f1/2022.json`).then((res) => {
      const schedule = res.data.MRData.RaceTable.Races;
      setScheduleData(schedule);
      console.log(schedule);
    });
  };

  const getRaceFlag = (country) => {
    switch (country) {
      case "bahrain":
        return "https://flagcdn.com/w160/bh.png";
      case "jeddah":
        return "https://flagcdn.com/w160/sa.png";
      case "albert_park":
        return "https://flagcdn.com/w160/au.png";
      case "imola":
        return "https://flagcdn.com/w160/it.png";
      case "miami":
        return "https://flagcdn.com/w160/us.png";
      case "catalunya":
        return "https://flagcdn.com/w160/es.png";
      case "monaco":
        return "https://flagcdn.com/w160/mc.png";
      case "BAK":
        return "https://flagcdn.com/w160/az.png";
      case "villeneuve":
        return "https://flagcdn.com/w160/ca.png";
      case "silverstone":
        return "https://flagcdn.com/w160/gb.png";
      case "red_bull_ring":
        return "https://flagcdn.com/w160/at.png";
      case "ricard":
        return "https://flagcdn.com/w160/fr.png";
      case "hungaroring":
        return "https://flagcdn.com/w160/hu.png";
      case "spa":
        return "https://flagcdn.com/w160/be.png";
      case "zandvoort":
        return "https://flagcdn.com/w160/nl.png";
      case "monza":
        return "https://flagcdn.com/w160/it.png";
      case "sochi":
        return "https://flagcdn.com/w160/ru.png";
      case "marina_bay":
        return "https://flagcdn.com/w160/sg.png";
      case "suzuka":
        return "https://flagcdn.com/w160/jp.png";
      case "americas":
        return "https://flagcdn.com/w160/us.png";
      case "rodriguez":
        return "https://flagcdn.com/w160/mx.png";
      case "interlagos":
        return "https://flagcdn.com/w160/br.png";
      case "yas_marina":
        return "https://flagcdn.com/w160/ae.png";
      default:
        return "";
    }
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
          <Typography component={"span"} variant="h4" className="title-text">
            2022 Calendar
          </Typography>
        </Card>
        {scheduleData &&
          scheduleData.map((race) => {
            const { raceName, round, date, time, Circuit } = race;
            return (
              <Card className="race-card">
                <div className="flag">
                  <img
                    src={getRaceFlag(Circuit.circuitId)}
                    alt="Bahrain"
                    className="flag-img"
                  />
                </div>
                <div key={raceName} className="position-race">
                  <div className="raceName">
                    <Typography component={"span"} variant="h3">
                      {raceName}
                    </Typography>
                  </div>
                  <div className="raceDate">
                    <Typography component={"span"} variant="h3">
                      {moment(date).format("MMM Do YYYY")}
                    </Typography>
                  </div>
                  <div className="race-bottom">
                    <Typography component={"span"} variant="h3">
                      Time: {time}
                    </Typography>
                  </div>
                </div>
              </Card>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default Schedule;
