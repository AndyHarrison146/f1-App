import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
import Selector from './Selector';
import ImgApi from './ImgApi';
import noImage from '../img/No_Image_Available.jpg'

const useStyles = makeStyles({
  root: {
    minHeight: '50vh',
    minWidth: '40vh',
  },
  driverImg: {
    height: 400,
    padding: '5%',
  },
  circle: {
    marginTop: '5%'
  },
});



const Driver = () => {
  const classes = useStyles();
  const [driverChampionships, setDriverChampionships] = useState();
  const [driverId, setDriverId] = useState();
  const [driverArr, setDriverArr] = useState([]);
  const [driverData, setDriverData] = useState();
  const [imgUrl, setImgUrl] = useState();

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
  }, [driverId])

  useEffect(() => {
    const driverURL = `http://ergast.com/api/f1/drivers/${driverId}.json?limit=1000`;
    axios.get(driverURL)
    .then(res => {
      const driverRes = res.data.MRData.DriverTable.Drivers[0];
      setDriverData(driverRes);
      console.log(driverId)
      console.log(driverURL)
      
    })
  }, [driverId])


  return (
    <div>
      <Selector driverId={driverId} changeDriverId={setDriverId} driverArr={driverArr} />
      {(driverData ?
      <Grid container spacing={0} direction="column" alignItems="center"
      style={{ minHeight: '50vh' }} >
        <Grid item sm={9} >
          <Card className={classes.root} >
            <CardActionArea>
              <CardContent style={{justifyContent: "center", display: "flex" }}>
                <ImgApi driverData={driverData} imgUrl={imgUrl} changeImgUrl={setImgUrl} driverId={driverId} />
                {driverChampionships && driverChampionships.map((season) => {
                  if (season.DriverStandings[0].Driver.driverId == driverId) {
                    championships++
                  }})}
                  <div style={{alignItems: 'center'}}>
                    <Typography gutterBottom variant="h4" component="h2" align='center'>{`Drivers Championships: ${championships}`}
                    </Typography>
                    <img src={imgUrl || noImage} className={classes.driverImg} alt="" />
                    <div style={{width: '90%', alignContent: 'center'}}>
                      <Typography variant="h6" >{`
                      Name: ${driverData.givenName} ${driverData.familyName}`} <br/> {`Nationality: ${driverData.nationality}`} <br/> {`Date of birth: ${driverData.dateOfBirth}`} <br/> {`Driver I.D: ${driverData.driverId}`} <br/> {driverData.permanentNumber ? (`Driver Number: ${driverData.permanentNumber}`) : ('Driver Number: N/A')}  <br/>
                      <a href={driverData.url}>Wikipedia Link</a>
                      </Typography>
                    </div>
                  </div>
              </CardContent>
            </CardActionArea>  
          </Card>
        </Grid>      
      </Grid>
      : 
      <CircularProgress className={classes.circle}/>
      )}
    </div>
  )
}

export default Driver
