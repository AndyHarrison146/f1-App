import React, { useState, useEffect } from 'react'
import Selector from './Selector';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
import ImgApi from './ImgApi';
import noImage from '../img/No_Image_Available.jpg'



const useStyles = makeStyles({
  root: {
    minHeight: '50%',
    minWidth: '40%',
    marginTop: '20%',
  },
  driverImg: {
    height: 400,
    padding: '5%',
  },
  circle: {
    marginTop: '5%'
  },

});

const Team = () => {
  const classes = useStyles();
  const [team, setTeam] = useState();
  const [teamData, setTeamData] = useState();
  const [teamArr, setTeamArr] = useState([]);
  const [teamChampionships, setTeamChampionships] = useState([]);
  const [urlName, setUrlName] = useState();
  let championships = 0;
  
 
  
  
  
  useEffect(() => {
    const allTeamsURL = `http://ergast.com/api/f1/constructors.json?limit=1000`;
    axios.get(allTeamsURL).then(res => {
      const allTeamsRes = res.data.MRData.ConstructorTable.Constructors
      setTeamArr(allTeamsRes);
    })
  },[])


useEffect(() => {
    const teamURL = `http://ergast.com/api/f1/constructors/${team}.json?limit=1000`;
    axios.get(teamURL).then(res => {
      console.log(teamURL)
      const teamRes = res.data.MRData.ConstructorTable.Constructors[0]
      setTeamData(teamRes)
      console.log(teamData)
      getUrlName();
    })
    const championshipURL = `http://ergast.com/api/f1/constructorStandings/1.json?limit=1000`;
    axios.get(championshipURL).then(res => {
      const champRes = res.data.MRData.StandingsTable.StandingsLists;
      setTeamChampionships(champRes)
    })
    axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&maxlag=1&prop=pageimages&list=&titles=${urlName}&piprop=thumbnail%7Cname%7Coriginal&format=json`).then(res=> {
      const imgRes = res.data.query.pages;
      console.log(imgRes)
    })

  },[team])

  const getUrlName = () => {
    if (teamData) {
      const url = teamData.url;
      const partUrl = 'wiki/'
      const offName = url.slice(url.indexOf(partUrl) + partUrl.length);
      console.log(offName)
      setUrlName(offName)
      console.log(urlName)
    } else return
  }




  return (
    <div>
      <Selector changeTeam={setTeam} teamArr={teamArr} />
      {(teamData ?
      <Grid container spacing={0} direction="column" alignItems="center">
        <Grid item sm={6}>
          <Card className={classes.root} style={{justifyContent: "center", display: "flex" }}>
            <CardActionArea>
              <CardContent>
              {teamChampionships && teamChampionships.map((season) => {
                  if (season.ConstructorStandings[0].Constructor.constructorId == team) {
                    championships++
                  }})}
                  <div>
                    <Typography gutterBottom variant="h4" component="h2" align='center'>{`Championships: ${championships}`}
                    </Typography>
                    <img src={noImage} className={classes.driverImg} align='left'/>
                    <Typography variant="h5" align='left'>{`
                    Name: ${teamData.name} `} <br/> {`Constructor I.D: ${teamData.constructorId} `} <br/> {`Nationality: ${teamData.nationality} `} <br/> 
                    <a href={teamData.url}>Wikipedia Link</a>
                    </Typography>
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

export default Team
