import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
import Selector from './Selector';
import ImgApi from './ImgApi';
import noImage from '../img/No_Image_Available.jpg'
import { useStyles } from '../styles';

const Driver = () => {
  const classes = useStyles();
  const [driverChampionships, setDriverChampionships] = useState();
  const [driverId, setDriverId] = useState();
  const [driverArr, setDriverArr] = useState([]);
  const [driverData, setDriverData] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [wins, setWins] = useState();
  let championships = 0;

  const getAllDrivers = () => {
    const driverURL = `http://ergast.com/api/f1/drivers.json?limit=1000`;
    axios.get(driverURL).then(res => {
      let arr = res.data.MRData.DriverTable.Drivers;
      setDriverArr(arr)
    })
  }

  const getDriverChampionships = () => {
    const championshipURL = `http://ergast.com/api/f1/drivers/${driverId}/driverStandings/1.json?limit=1000`;
    axios.get(championshipURL)
      .then(res => {
        const championshipRes = res.data.MRData.StandingsTable.StandingsLists;
        setDriverChampionships(championshipRes);
      })
  }

  const getDriver = () => {
    setDriverData('')
    const driverURL = `http://ergast.com/api/f1/drivers/${driverId}.json?limit=1000`;
    axios.get(driverURL)
      .then(res => {
        const driverRes = res.data.MRData.DriverTable.Drivers[0];
        setDriverData(driverRes);
      })
  }

  const getWins = () => {
    const winUrl = `http://ergast.com/api/f1/drivers/${driverId}/results/1.json?limit=1000`
    axios.get(winUrl).then(res => {
      const winRes = res.data.MRData.RaceTable.Races
      setWins(winRes.length)
    })
  }

  useEffect(() => {
    getAllDrivers()
  }, [])

  useEffect(() => {
    getDriver()
    getDriverChampionships()
    getWins()
  }, [driverId])


  return (
    <Grid container
      spacing={0}
      direction='row'
      align="center"
      justify='space-around'
      style={{ minHeight: '100vh', minWidth: '100vw' }}>
      <Grid item xs={12} sm={12} md={6} lg={6} >
        <Selector driverId={driverId} changeDriverId={setDriverId} driverArr={driverArr} />
        {(driverData ?
          <Card className={classes.card} >
            <CardActionArea>
              <CardContent style={{ justifyContent: "center", display: "flex" }}>
                <ImgApi driverData={driverData} imgUrl={imgUrl} changeImgUrl={setImgUrl} driverId={driverId} />
                <div style={{ alignItems: 'center' }}>
                  <Typography variant="h3" align='center'>{`${driverData.givenName} ${driverData.familyName}`}</Typography>
                  <Typography variant="h5" align='center'>{`Drivers Championships: ${driverChampionships.length}`}
                  </Typography>
                  <Typography variant="h5" align='center'>{`Wins: ${wins}`}</Typography>
                  <img src={imgUrl || noImage} className={classes.driverImg} alt="" />
                  <div style={{ width: '90%', alignContent: 'center' }}>
                    <Typography variant="h6" >{`
                    Name: ${driverData.givenName} ${driverData.familyName}`} <br /> {`Nationality: ${driverData.nationality}`} <br /> {`Date of birth: ${driverData.dateOfBirth}`} <br /> {`Driver I.D: ${driverData.driverId}`} <br /> {driverData.permanentNumber ? (`Driver Number: ${driverData.permanentNumber}`) : ('Driver Number: N/A')}  <br />
                      <a href={driverData.url}>Wikipedia Link</a>
                    </Typography>
                    <h5>note** not all drivers have pictures. Please report if images are available on Wikipedia.</h5>
                    <href>contact us</href>
                  </div>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
          :
          <CircularProgress className={classes.circle} />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} >
        <Typography variant='h7' align='center'>All info is sourced from https://ergast.com/mrd/. All Images are sourced from Wikipedia and are used under CC(CreativeCommons) License or to thier respective brands, i do not claim to own the rights to any images used. </Typography>
      </Grid>
    </Grid>
  )
}

export default Driver
