import React, {useState, useEffect}from 'react';
import "../App.css";
import axios from 'axios';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useStyles} from '../styles';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.grey.main,
  },
  body: {
    fontSize: 10,
    '@media(min-width:600px)' : {
      fontSize: 12,
    },
    '@media(min-width:960px)' : {
      fontSize: 15,
    }
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Schedule = () => { 
  const classes = useStyles();
  const [scheduleData, setScheduleData] = useState();

  const getSchedule = () => {
    axios.get(`https://ergast.com/api/f1/current.json`).then(res=> {
      const schedule = res.data.MRData.RaceTable.Races;
      setScheduleData(schedule)
      console.log(schedule)
    })
  }

  useEffect(() => {
    getSchedule()
  }, [])

  return (
    <Grid container
    spacing={0}
    direction='row'
    align="center"
    style={{ minHeight: '100vh', minWidth: '100vw' }}>
      {(scheduleData ? 
      <Grid item xs={12} sm={12} md={12} lg={12} >
        <TableContainer className={classes.paper} component={Paper}>  
        <Typography component={'span'} variant='h5'>2021 Calendar</Typography>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Round</StyledTableCell>
                <StyledTableCell>Race</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
                <StyledTableCell align="right">Time</StyledTableCell>
              </TableRow>
            </TableHead>
          <TableBody>
          {scheduleData && scheduleData.map(race => {
          const {raceName, round, date, time} = race;
          return (
            <StyledTableRow key={round}>
              <StyledTableCell component="th" scope="row">
              {round}
            </StyledTableCell>
            <StyledTableCell>{raceName}</StyledTableCell>
            <StyledTableCell align="right">{date}</StyledTableCell>
            <StyledTableCell align="right">{time.slice(0, 5)}</StyledTableCell>
          </StyledTableRow>
          )
        })}
        </TableBody>
      </Table>
      </TableContainer>
      </Grid>
        : <CircularProgress className={classes.circle} />)}
      <Grid item xs={12} sm={12} md={12} lg={12} >
        <Typography variant='h6' align='center'>All info is sourced from https://ergast.com/mrd/.</Typography>
      </Grid>
    </Grid>
  )
}

export default Schedule
