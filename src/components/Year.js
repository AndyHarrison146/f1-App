import React, { useState, useEffect } from "react";
import "../App.css";
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import query from './SearchBar';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "80%",
    overflowX: "auto",
    marginBottom: theme.spacing(2),
    margin: "auto"
  },
  table: {
    minWidth: "auto",
    maxWidth: "auto",

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

function Year() {
  const classes = useStyles();
  const [data, setData] = useState();
  const year = 2009;
  console.log(typeof query.value)
  
  useEffect(() => {
    const f1Url = `http://ergast.com/api/f1/${query.value}/results.json?limit=1000`;
    axios.get(f1Url)
    .then(res => {
      const races = res.data.MRData.RaceTable.Races;
      setData(races)
    })
  }, [year])

  console.log(data)

  return (
    <TableContainer className={classes.paper} component={Paper} >
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Round</StyledTableCell>
            <StyledTableCell>Race</StyledTableCell>
            <StyledTableCell align="right">Winner</StyledTableCell>
            <StyledTableCell align="right">Team</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data && data.map(race => {
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
  

  );
}

export default Year;
