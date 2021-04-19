import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
import Selector from './Selector';

const useStyles = makeStyles({
  root: {
    height: '70vh',
    width: '70vh',
  },
  media: {
    height: 400,
    float: 'left',
    padding: '2%',
  },
  driverImg: {
    height: 300,
    width: 240,
    marginRight: '5%',
  }
});



const Driver = () => {
  const classes = useStyles();
  const [driverChampionships, setDriverChampionships] = useState();
  const [name, setName] = useState();
  const [driverArr, setDriverArr] = useState([]);
  const [driverData, setDriverData] = useState();
  let championships = 0;
  

  useEffect(() => {
    const driverURL = `http://ergast.com/api/f1/drivers.json?limit=1000`;
    axios.get(driverURL).then(res => {
      let arr = res.data.MRData.DriverTable.Drivers;
      setDriverArr(arr)
    })
  },[])
  
  useEffect(() => {
    const championshipURL = `https://ergast.com/api/f1/driverStandings/1.json?limit=1000`;
    axios.get(championshipURL)
    .then(res => {
      const championshipRes = res.data.MRData.StandingsTable.StandingsLists;
      setDriverChampionships(championshipRes);
    })
  }, [name])

  useEffect(() => {
    const driverURL = `http://ergast.com/api/f1/drivers/${name}.json?limit=1000`;
    axios.get(driverURL)
    .then(res => {
      const driverRes = res.data.MRData.DriverTable.Drivers[0];
      setDriverData(driverRes);
      console.log(driverData)
      console.log(name)
    })
  }, [name])

  useEffect(() => {
    const winURL = `http://ergast.com/api/f1.json?limit=1000`;
    axios.get(winURL).then(res => {
      const winRes = res.data;
      console.log(winRes)
    })
  },[])


  return (
    <div>
      {/* <SearchBar name={name} changeName={setName} /> */}
      <Selector name={name} changeName={setName} driverArr={driverArr} />
      {(driverData ?  
      <Grid container spacing={0} direction="column" alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}>
        <Grid item sm={9}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                {driverChampionships && driverChampionships.map((season) => {
                  if (season.DriverStandings[0].Driver.driverId == name) {
                    championships++
                  }})}
                  <div>
                    <Typography gutterBottom variant="h4" component="h2" align='center'>{`Drivers Championships: ${championships}`}
                    </Typography>
                    <img src={'hi'} className={classes.driverImg} align='left'></img>
                    <Typography variant="h6" align='left'>{`
                    Name: ${driverData.givenName} ${driverData.familyName}`} <br/> {`Nationality: ${driverData.nationality}`} <br/> {`Date of birth: ${driverData.dateOfBirth}`} <br/> {`Driver I.D: ${driverData.driverId}`} <br/> {driverData.permanentNumber ? (`Driver Number: ${driverData.permanentNumber}`) : ('Driver Number: N/A')} <br/>
                    <a href={driverData.url}>Wikipedia Link</a>
                    </Typography>
                  </div>
              </CardContent>
            </CardActionArea>  
          </Card>
        </Grid>      
      </Grid>
      : 
      <CircularProgress/>
      )}
    </div>
  )
}

export default Driver
