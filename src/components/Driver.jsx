import React, { useState, useEffect, useCallback } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ImgApi from "./ImgApi";
import "../styles/driver.css";
import useDrivers from "../hooks/useDrivers";
import DriverSelector from "./DriverSelector";
import useDriver from "../hooks/useDriver";
import useDriverChampionships from "../hooks/useDriverChampionships";
import useDriverWins from "../hooks/useDriverWins";

const Driver = () => {
  const [selectedDriver, setSelectedDriver] = useState();
  const {drivers, error: driversError} = useDrivers()
  const { driver, error: driverError} = useDriver(selectedDriver?.value);
  const { driverChampionships, error: driverChampionshipsError} = useDriverChampionships(selectedDriver?.value);
  const { driverWins, error: driverWinsError} = useDriverWins(selectedDriver?.value);

  const handleDriverChange = useCallback((driver) => {
    setSelectedDriver(driver);
  }, []);

  return (
    <Grid
      container
      spacing={0}
      align="center"
      justifyContent="space-around"
      style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        {drivers && (
        <DriverSelector
          selectedDriver={selectedDriver}
          driverArr={drivers.DriverTable.Drivers}
          onChange={handleDriverChange}
        />
        )}
        {driver && (
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
                  {`${driver?.DriverTable.Drivers[0].givenName} ${driver?.DriverTable.Drivers[0].familyName}`}
                </Typography>
                {driverChampionships && <Typography variant="h4" align="center">
                  {`Drivers Championships: ${driverChampionships.StandingsTable.StandingsLists.length}`}
                </Typography>}
                <Typography
                  variant="h5"
                  align="center">{`Wins: ${driverWins?.RaceTable.Races.length}`}</Typography>
                <ImgApi driverUrl={driver?.DriverTable.Drivers[0].url}
                />
                <Typography
                  variant="h5"
                  align="center"
                  style={{ marginTop: "10px" }}>{`
                    Name: ${driver.DriverTable.Drivers[0].givenName} ${driver.DriverTable.Drivers[0].familyName}`}</Typography>
                <Typography
                  variant="h5"
                  align="center"
                  style={{
                    marginTop: "10px",
                  }}>{`Nationality: ${driver.DriverTable.Drivers[0].nationality}`}</Typography>
                <Typography
                  variant="h5"
                  align="center"
                  style={{
                    marginTop: "10px",
                  }}>{`Date of birth: ${driver.DriverTable.Drivers[0].dateOfBirth}`}</Typography>
                <Typography
                  variant="h5"
                  align="center"
                  style={{
                    marginTop: "10px",
                  }}>{`Driver I.D: ${driver.DriverTable.Drivers[0].driverId}`}</Typography>
                <Typography
                  variant="h5"
                  align="center"
                  style={{ marginTop: "10px" }}>
                  {driver.DriverTable.Drivers[0].permanentNumber
                    ? `Driver Number: ${driver.DriverTable.Drivers[0].permanentNumber}`
                    : "Driver Number: N/A"}
                </Typography>
                <Typography variant="h5" style={{ marginTop: "10px" }}>
                  <a href={driver.DriverTable.Drivers[0].url}>Wikipedia Link</a>
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
        <div style={{marginTop: '20px', width: '400px'}}>
          <Typography variant="h6" align="center">
          All info is sourced from https://ergast.com/mrd/. All Images are
          sourced from Wikipedia and are used under CC(CreativeCommons) License
          or to thier respective brands, i do not claim to own the rights to any
          images used.
        </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default Driver;
