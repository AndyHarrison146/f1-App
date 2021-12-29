import React, { useState, useEffect } from 'react'
import Selector from './Selector';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ButtonBase, CircularProgress, Dialog, DialogActions, DialogContent, Slide} from '@material-ui/core';
import noImage from '../img/No_Image_Available.jpg'
import {useStyles} from '../styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Teams } from '../assets/Teams';
import CloseIcon from '@material-ui/icons/Close';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Team = () => {
  const classes = useStyles();
  const [team, setTeam] = useState();
  const [teamData, setTeamData] = useState();
  const [teamArr, setTeamArr] = useState([]);
  const [teamChampionships, setTeamChampionships] = useState([]);
  const [showCurTeams, setShowCurTeams] = useState(true);
  const [showPrevTeams, setShowPrevTeams] = useState(false);
  const [cardData, setCardData] = useState();
  const [cardChampionships, setCardChampionships] = useState();
  const [cardWins, setCardWins] = useState();
  const [driversChampionships, setDriversChampionships] = useState(0);
  const [showCard, setShowCard] = useState(false);
  let driverChampionshipsCount = 0;
  let championships = 0;

  const getAllTeams = () => {
    const allTeamsURL = `http://ergast.com/api/f1/constructors.json?limit=1000`;
    axios.get(allTeamsURL).then(res => {
      const allTeamsRes = res.data.MRData.ConstructorTable.Constructors
      setTeamArr(allTeamsRes);
    })
  }

  const getSelectedTeam = () => {
    const teamURL = `http://ergast.com/api/f1/constructors/${team}.json?limit=1000`;
    axios.get(teamURL).then(res => {
      console.log(teamURL)
      const teamRes = res.data.MRData.ConstructorTable.Constructors[0]
      setTeamData(teamRes)
    })
  }

  const getChampionships = () => {
    const championshipURL = `http://ergast.com/api/f1/constructorStandings/1.json?limit=1000`;
    axios.get(championshipURL).then(res => {
      const champRes = res.data.MRData.StandingsTable.StandingsLists;
      setTeamChampionships(champRes)
    })
  } 

  const getCardTeam = (teamName) => {
    console.log(teamName)
    axios.get(`http://ergast.com/api/f1/constructors/${teamName}.json?limit=1000`).then(res => {
      const teamRes = res.data.MRData.ConstructorTable.Constructors[0];
      console.log(teamRes)
      setCardData(teamRes)
    })
  }

  const getCardWins = (teamName) => {
    axios.get(`http://ergast.com/api/f1/constructors/${teamName}/results/1.json?limit=1000`).then(res => {
      const winRes = res.data.MRData.RaceTable.Races;
      console.log(winRes)
      setCardWins(winRes.length)
    })
  }
  
  const getCardChampionships = (teamName) => {
    axios.get(`https://ergast.com/api/f1/constructors/${teamName}/constructorStandings/1.json?limit=1000`).then(res => {
      const champRes = res.data.MRData.StandingsTable.StandingsLists;
      console.log(champRes)
      setCardChampionships(champRes.length)
    })
  }

  const getDriversChampionships = () => {
    axios.get(`http://ergast.com/api/f1/driverStandings/1.json?limit=1000`).then(res => {
      const driverChampRes = res.data.MRData.StandingsTable.StandingsLists;
      setDriversChampionships(driverChampRes)
    })
  }

  const handleCardClose = () => {
    setDriversChampionships(0)
    setCardChampionships()
    setCardData()
    setShowCard(!showCard)
    setCardWins()
  }

  const changePrevTeams = () => {
    setShowCurTeams(false)
    setShowPrevTeams(true)
  }

  const changeCurTeams = () => {
    setShowCurTeams(true)
    setShowPrevTeams(false)
  }

  useEffect(() => {
    getAllTeams()
  },[])


useEffect(() => {
    getSelectedTeam()
    getChampionships()
  },[team])

  const handleCardClick = (event) => {
    const teamName = event.target.parentElement.parentElement.id.replace(/\s/g, '_').toLowerCase();
    getCardTeam(teamName)
    getCardWins(teamName)
    getCardChampionships(teamName) 
    getDriversChampionships(teamName)
    setShowCard(!showCard);
  }

  return (
    <Grid container
    spacing={0}
    direction='row'
    align="center"
    justify='space-around'
    alignContent='flex-start'
    style={{ minHeight: '100vh', minWidth: '100vw' }}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <ButtonGroup variant="text" size='large' className={classes.buttonGroup} >
          <Button onClick={changeCurTeams} color={showCurTeams ? 'primary' : 'secondary'}>Current Teams</Button>
          <Button onClick={changePrevTeams} color={showPrevTeams ? 'primary' : 'secondary'}>Previous Teams</Button>
        </ButtonGroup>
      </Grid >
      <Grid item xs={12} sm={12} md={12} lg={12}>
      {showCurTeams && Teams.map((team) => {
        return (
          <Grid id={team.id} item xs={6} sm={6} md={6} lg={6}>
              <Card key={team.name} id={team.id} className={classes.teamCard} style={{backgroundColor: '#fafafa'}}>
                <ButtonBase id={team.id} onClick={event => handleCardClick(event)}>
                  <CardContent>
                    <img src={team.url} id={team.id} className={classes.teamImg}/>
                    <Typography id={team.id} variant="h6" align='center'>{team.name}</Typography>
                  </CardContent>
                </ButtonBase>
              </Card>
          </Grid>
        )
      }
      )}
      {showCard && cardData && 
      <Grid item xs={10} sm={10} md={6} lg={6}>
          <Dialog open={showCard} TransitionComponent={Transition}
          keepMounted
          onClose={() => {handleCardClose()}}
          maxWidth='md'
          fullWidth
          >
          <Button onClick={() => {handleCardClose()}} 
            className={classes.closeButton}>
            <CloseIcon/>
          </Button>
          <Typography component={'span'} variant='h3' align='center'>{`${cardData.name}`}</Typography>
          {Teams.map((team) => {
            if(team.id === cardData.constructorId) {
              return (
            <DialogContent>
              <div className={classes.cardImg1} >
                <Typography variant="h5">{team.driver1}</Typography>
                <img src={team.driver1Url} alt="" className={classes.driverCardImg} />
              </div>
              <div className={classes.cardImg2}>
                <Typography variant="h5">{team.driver2}</Typography>
                <img src={team.driver2Url} alt="" className={classes.driverCardImg}/>
              </div>
              <div className={classes.cardInfo}>
                <Typography variant="h6" align='center'>{`Team Name: ${cardData.name}`}</Typography>
                <Typography variant="h6" align='center'>{`Nationality: ${cardData.nationality}`}</Typography>
                <Typography variant="h6" align='center'>{`Team Principal: ${team.teamPrincipal}`}</Typography>
              </div>
              <div className={classes.cardWins} >
                <Typography align='center' variant="h5" style={{marginBottom: '10%'}}>{`Total Wins`}</Typography>
                <Typography align='center' variant='h4'>{cardWins}</Typography>
              </div>
              <div className={classes.cardChampionships}>
                <Typography variant="h5" align='center'>{`Constructors Championships:`}</Typography>
                <Typography variant='h4' align='center'>{cardChampionships}</Typography>
              </div>
              <div className={classes.cardDriverChamp}>
              {cardData && driversChampionships && driversChampionships.map((year) => {
                  if (year.DriverStandings[0].Constructors[0].constructorId === cardData.constructorId) {
                  driverChampionshipsCount++
                  }
                })
              }
                <Typography variant="h5" align='center' >{`Drivers Championships:`}</Typography>
                <Typography variant='h4' align='center'>{driverChampionshipsCount}</Typography>
              </div>
            </DialogContent>
            )
            }
          })
          }
          <DialogActions></DialogActions>
        </Dialog>
      </Grid>
      }
      </Grid>
      {showPrevTeams &&
      <Grid item xs={12} sm={12} md={6} lg={6} >
        <Selector changeTeam={setTeam} teamArr={teamArr} />
        {(teamData ?
          <Card className={classes.card} style={{justifyContent: "center", display: "flex" }}>
            <CardActionArea>
              <CardContent>
              {teamChampionships && teamChampionships.map((season) => {
                if (season.ConstructorStandings[0].Constructor.constructorId == team) {
                  championships++
                }})}
                <div>
                  <Typography variant="h5" align='center'>{`Championships: ${championships}`}
                  </Typography>
                  <img src={noImage} className={classes.driverImg} align='center'/>
                  <Typography variant="h6" align='center'>{`
                  Name: ${teamData.name} `} <br/> {`Constructor I.D: ${teamData.constructorId} `} <br/> {`Nationality: ${teamData.nationality} `} <br/> 
                  <a href={teamData.url}>Wikipedia Link</a>
                  </Typography>
                </div>
              </CardContent>
            </CardActionArea>  
          </Card>
          : 
          <CircularProgress className={classes.circle}/>
        )}
      </Grid>
      }
      <Grid item xs={12} sm={12} md={12} lg={12} >
        <Typography variant='h7' align='center'>All info is sourced from https://ergast.com/mrd/. All Images are sourced from Wikipedia and are used under CC(CreativeCommons) License or to thier respective brands, i do not claim to own the rights to any images used. </Typography>
      </Grid>
    </Grid>
  )
}

export default Team

// target.nextSibling.outerText