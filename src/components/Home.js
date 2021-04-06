import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import theme from '../theme'




const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    marginTop: theme.spacing(10),
    width: "40%",
    overflowX: "auto",
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(15),
    background: '#ffffff'
  },
  paper2: {
    float: 'right',
    position: 'relative',
    marginTop: theme.spacing(10),
    width: "40%",
    overflowX: "auto",
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(15),
    background: '#ffffff'
  },
  circleProgessLeft: {
    position: 'relative',
    float: 'left',
    marginTop: theme.spacing(50),
  },
  circleProgessRight: {
    position: 'relative',
    float: 'right',
    marginTop: theme.spacing(50),
    marginRight: theme.spacing(50),
  },
  table: {
    minWidth: "auto",
    maxWidth: "auto",

  },
  arrow: {
  position: 'relative',
  float: 'left',
  marginLeft: '1.5%',
  fontSize: 40,
  },
  box: {
  float: 'left',
  marginTop: '1%',
}
}));


const StyledTableCell = withStyles((theme) => ({
 
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.primary.main,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Home = () => {
  const classes = useStyles();
  const [lastRaceData, setLastRaceData] = useState();
  const [championshipData, setChampionshipData] = useState();

  

  useEffect(() => {
    const lastRaceURL = `http://ergast.com/api/f1/2021/results.json?limit=1000`;
    axios.get(lastRaceURL)
    .then(res => {
      const lastRace = res.data.MRData.RaceTable.Races;
      setLastRaceData(lastRace)
    })
  }, [])

  useEffect(() => {
    const championshipURL = `http://ergast.com/api/f1/current/driverStandings.json?limit=1000`;
    axios.get(championshipURL)
    .then(res => {
      const standings = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      setChampionshipData(standings)
    })
    console.log(championshipData)
  }, [lastRaceData])





  return (
    <div>
      <ArrowUpwardIcon fontSize="large" className={classes.arrow} />
      <Typography component={'span'}>
        <Box fontWeight="fontWeightBold" className={classes.box} >
        Pick a category to start!
        </Box>
      </Typography>
        {lastRaceData ? (
      <TableContainer className={classes.paper} component={Paper} >
        <Typography component={'span'} style={{ fontWeight: 600 }} >{`${lastRaceData[lastRaceData.length -1].Circuit.circuitName} Round: ${lastRaceData[lastRaceData.length -1].round}`}</Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
            <StyledTableCell>Pos</StyledTableCell>
            <StyledTableCell>Driver</StyledTableCell>
            <StyledTableCell align="right">Team</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
            </TableRow> 
          </TableHead> 
          <TableBody>
            {lastRaceData && lastRaceData[lastRaceData.length -1].Results.map((driver) => {
              const {positionText, Time, Constructor, Driver, status} = driver;
              return (
              <StyledTableRow key={Driver.familyName}>
                <StyledTableCell component="th" scope="row">
              {positionText}
            </StyledTableCell>
            <StyledTableCell>{Driver.givenName} {Driver.familyName}</StyledTableCell>
            <StyledTableCell align="right">{Constructor.name}</StyledTableCell>
            <StyledTableCell align="right">{Time ? Time.time : status}</StyledTableCell>
          </StyledTableRow>

              ) 
            })}
          </TableBody>
        </Table>
      </TableContainer>
      ) : (
        <CircularProgress className={classes.circleProgessLeft}/>
      )}
      {lastRaceData ? (
      <TableContainer className={classes.paper2} component={Paper}>
        <Typography component={'span'} style={{ fontWeight: 600 }} >Current Championship Standings</Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
            <StyledTableCell>Pos</StyledTableCell>
            <StyledTableCell>Driver</StyledTableCell>
            <StyledTableCell align="right">Team</StyledTableCell>
            <StyledTableCell align="right">Wins</StyledTableCell>
            <StyledTableCell align="right">Points</StyledTableCell>
            </TableRow> 
          </TableHead> 
          <TableBody>
            {championshipData && championshipData.map((driver) => {
              const {positionText, points, wins, Constructors, Driver} = driver;
              return (
              <StyledTableRow key={Driver.familyName}>
                <StyledTableCell component="th" scope="row">
              {positionText}
            </StyledTableCell>
            <StyledTableCell>{Driver.givenName} {Driver.familyName}</StyledTableCell>
            <StyledTableCell align="right">{Constructors[0].name}</StyledTableCell>
            <StyledTableCell align="right">{wins}</StyledTableCell>
            <StyledTableCell align="right">{points}</StyledTableCell>
          </StyledTableRow>
              ) 
            })}
          </TableBody>
        </Table>
      </TableContainer>
      ) : (
        <CircularProgress className={classes.circleProgessRight}/>
      )}
    </div>
  )
}

export default Home
