import React, { useState, useEffect } from "react";
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
import Selector from './Selector';
import {useStyles} from '../styles';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.grey.main,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Year() {
  const classes = useStyles();
  const [yearData, setYearData] = useState();
  const [year, setYear] = useState(2020);
  const [championshipWinner, setChampionshipWinner] = useState();
  
  useEffect(() => {
    const f1Url = `http://ergast.com/api/f1/${year}/results.json?limit=1000`;
    axios.get(f1Url)
    .then(res => {
      const races = res.data.MRData.RaceTable;
      setYearData(races)
      console.log(yearData)
    })
    const championshipURL = `http://ergast.com/api/f1/${year}/driverStandings.json?limit=1000`;
    axios.get(championshipURL)
    .then(res => {
      const winner = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
      setChampionshipWinner(winner)
    })
  }, [year])


  return (
    <Grid container
    spacing={0}
    direction='row'
    align="center"
    style={{ minHeight: '100vh', minWidth: '100vw' }}>
      <Grid item xs={12} sm={12} md={12} lg={12} >
        <Selector year={year} changeYear={setYear}/>
        {(yearData ? 
        <div >
          <TableContainer className={classes.paper} component={Paper} >
          <Typography component={'span'} variant='h4'>{`${year} Season Results`}</Typography>
          {championshipWinner && 
          <Typography variant='h4'>{`Championship Winner: ${championshipWinner.Driver.givenName} ${championshipWinner.Driver.familyName}`}</Typography>}
          <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Round</StyledTableCell>
              <StyledTableCell>Race</StyledTableCell>
              <StyledTableCell align="right">Winner</ StyledTableCell>
              <StyledTableCell align="right">Team</ StyledTableCell>
              <StyledTableCell align="right">Time</ StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {yearData && yearData.Races.map(race => {
            const {raceName, round, Results} = race;
            return (
              <StyledTableRow key={round}>
                <StyledTableCell component="th" scope="row">
                {round}
              </StyledTableCell>
              <StyledTableCell>{raceName}</StyledTableCell>
              <StyledTableCell align="right">{Results[0].Driver.givenName} {Results[0].Driver.familyName}</StyledTableCell>
              <StyledTableCell align="right">{Results[0].Constructor.name}</StyledTableCell>
              <StyledTableCell align="right">{Results[0].Time.time}</StyledTableCell>
            </StyledTableRow>
            )
          })}
          </TableBody>
          </Table>
          </TableContainer>
        </div>
        : <CircularProgress className={classes.circle} />)}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} >
        <Typography variant='h6' align='center'>All info is sourced from https://ergast.com/mrd/.</Typography>
      </Grid>
    </Grid>
  )}

export default Year;
