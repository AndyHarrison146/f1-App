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
    minHeight: '50vh',
    minWidth: '40vh',
  },
  driverImg: {
    height: 300,
    width: 320,
    marginRight: '5%',
  }
});

const Team = () => {
const classes = useStyles();
const [team, setTeam] = useState();
const [teamData, setTeamData] = useState();
const [teamArr, setTeamArr] = useState([]);
const [teamChampionships, setTeamChampionships] = useState([]);
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
      const teamRes = res.data.MRData.ConstructorTable.Constructors[0]
      setTeamData(teamRes)
    })
    const championshipURL = `http://ergast.com/api/f1/constructorStandings/1.json?limit=1000`;
    axios.get(championshipURL).then(res => {
      const champRes = res.data.MRData.StandingsTable.StandingsLists;
      setTeamChampionships(champRes)

    })
  },[team])


  return (
    <div>
      <Selector changeTeam={setTeam} teamArr={teamArr} />
      {(teamData ?
      <Grid container spacing={0} direction="column" alignItems="center"
      justify="center"
      style={{ minHeight: '50vh' }}>
        <Grid item sm={9}>
          <Card className={classes.root}>
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
      <CircularProgress/>
      )}
    </div>
  )
}

export default Team
