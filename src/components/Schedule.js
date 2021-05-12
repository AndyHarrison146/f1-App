import React, {useState, useEffect}from 'react';
import "../App.css";
import axios from 'axios';
import { CircularProgress, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Selector from './Selector';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "80%",
    overflowX: "auto",
    marginBottom: theme.spacing(2),
    margin: "auto",
    background: '#ffffff'
  },
  table: {
    minWidth: "auto",
    maxWidth: "auto",
  },
  circle: {
    marginTop: '5%'
  },
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



const Schedule = () => { 
  const classes = useStyles();
  const [scheduleData, setScheduleData] = useState();

  const getSchedule = () => {
    axios.get(`http://ergast.com/api/f1/current.json`).then(res=> {
      const schedule = res.data.MRData.RaceTable.Races;
      setScheduleData(schedule)
      console.log(schedule)
    })
  }

  useEffect(() => {
    getSchedule()
  }, [])

  return (
    <div>
      {(scheduleData ? 
      <div >
        <TableContainer className={classes.paper} component={Paper}>  
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
      </div>
        : <CircularProgress className={classes.circle} />)}
    </div>
  )
}

export default Schedule
