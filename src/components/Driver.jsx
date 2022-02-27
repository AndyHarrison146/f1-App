import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { CircularProgress } from "@material-ui/core";
import Selector from "./Selector";
import ImgApi from "./ImgApi";
import "../styles/driver.css";

const Driver = () => {
  const [driverChampionships, setDriverChampionships] = useState();
  const [driverId, setDriverId] = useState();
  const [driverArr, setDriverArr] = useState([]);
  const [driverArrSurname, setDriverArrSurname] = useState([]);
  const [driverData, setDriverData] = useState();
  const [wins, setWins] = useState();
  const [driverUrl, setDriverUrl] = useState();
  let championships = 0;

  const getAllDrivers = () => {
    const driverURL = `http://ergast.com/api/f1/drivers.json?limit=1000`;
    axios.get(driverURL).then((res) => {
      let arr = res.data.MRData.DriverTable.Drivers;
      setDriverArr(arr);
      setDriverArrSurname(arr);
    });
  };

  const getDriverChampionships = () => {
    const championshipURL = `http://ergast.com/api/f1/drivers/${driverId}/driverStandings/1.json?limit=1000`;
    axios.get(championshipURL).then((res) => {
      const championshipRes = res.data.MRData.StandingsTable.StandingsLists;
      setDriverChampionships(championshipRes);
    });
  };

  const getDriver = () => {
    const driverURL = `http://ergast.com/api/f1/drivers/${driverId}.json?limit=1000`;
    axios.get(driverURL).then((res) => {
      const driverRes = res.data.MRData.DriverTable.Drivers[0];
      const driverWiki = driverRes.url;
      setDriverUrl(driverWiki);
      setDriverData(driverRes);
    });
  };

  const getWins = () => {
    const winUrl = `http://ergast.com/api/f1/drivers/${driverId}/results/1.json?limit=1000`;
    axios.get(winUrl).then((res) => {
      const winRes = res.data.MRData.RaceTable.Races;
      setWins(winRes.length);
    });
  };

  useEffect(() => {
    getAllDrivers();
  }, []);

  useEffect(() => {
    console.log(driverArr);
  }, [driverArr]);

  useEffect(() => {
    driverId && getDriver();
    getDriverChampionships();
    getWins();
  }, [driverId]);

  return (
    <Grid
      container
      spacing={0}
      align="center"
      justifyContent="space-around"
      style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Selector
          driverId={driverId}
          changeDriverId={setDriverId}
          driverArr={driverArr}
          driverArrSurname={driverArrSurname}
          setDriverUrl={setDriverUrl}
        />
        {driverData && (
          <Card className="driver-card">
            <Grid
              container
              spacing={0}
              align="center"
              style={{ minHeight: "100%", minWidth: "100%" }}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography
                  variant="h1"
                  align="center"
                  style={{ marginBottom: "20px" }}>
                  {`${driverData.givenName} ${driverData.familyName}`}
                </Typography>
                <Typography variant="h4" align="center">
                  {`Drivers Championships: ${driverChampionships.length}`}
                </Typography>
                <Typography
                  variant="h5"
                  align="center">{`Wins: ${wins}`}</Typography>
                <ImgApi
                  driverData={driverData}
                  driverId={driverId}
                  driverUrl={driverUrl}
                  setDriverUrl={setDriverUrl}
                />
                <Typography
                  variant="h5"
                  align="center"
                  style={{ marginTop: "10px" }}>{`
                    Name: ${driverData.givenName} ${driverData.familyName}`}</Typography>
                <Typography
                  variant="h5"
                  align="center"
                  style={{
                    marginTop: "10px",
                  }}>{`Nationality: ${driverData.nationality}`}</Typography>
                <Typography
                  variant="h5"
                  align="center"
                  style={{
                    marginTop: "10px",
                  }}>{`Date of birth: ${driverData.dateOfBirth}`}</Typography>
                <Typography
                  variant="h5"
                  align="center"
                  style={{
                    marginTop: "10px",
                  }}>{`Driver I.D: ${driverData.driverId}`}</Typography>
                <Typography
                  variant="h5"
                  align="center"
                  style={{ marginTop: "10px" }}>
                  {driverData.permanentNumber
                    ? `Driver Number: ${driverData.permanentNumber}`
                    : "Driver Number: N/A"}
                </Typography>
                <Typography variant="h5" style={{ marginTop: "10px" }}>
                  <a href={driverData.url}>Wikipedia Link</a>
                </Typography>
                <h5>
                  note** not all drivers have pictures. Please report if images
                  are available on Wikipedia.
                </h5>
              </Grid>
            </Grid>
          </Card>
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant="h6" align="center">
          All info is sourced from https://ergast.com/mrd/. All Images are
          sourced from Wikipedia and are used under CC(CreativeCommons) License
          or to thier respective brands, i do not claim to own the rights to any
          images used.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Driver;
