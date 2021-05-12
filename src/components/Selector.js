import React, { Fragment } from 'react';
import { makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from '@material-ui/core/Paper';
import { years } from '../assets/Years';
import { CircularProgress } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    display: 'flex', 
  },
  formControl: {
    width: '250px',
    height: '200px',
    margin: '2%',
  },
  paper: {
  marginTop: '8%',
  marginBottom: '1%',
  background: '#ffffff',
  },
  select: {
    width: '250px',
    height: '200px',
  }



}));

const Selector = ({changeYear, driverArr, changeDriverId, teamArr, changeTeam, season, races, changeRound, changeRaceData, changeSeason}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    if (window.location.pathname === '/Year') {
      changeYear((parseInt(value)))
    }
    if (window.location.pathname === '/Race') {
      changeSeason(value)
      changeRaceData('')
    }
    if (window.location.pathname === '/Driver') {
      changeDriverId(value)
    }
    if (window.location.pathname === '/Team') {
      changeTeam(value)
    }
  };

  const handleRaceChange = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    if (window.location.pathname === '/Race' && season) {
      changeRound(value)
    }

  }

  return (
    <div className={classes.selector}>
      <FormControl className={classes.formControl} >
        <Paper className={classes.paper} >
          <Select
          className={classes.select}
          type="select-multiple"
          multiple
          native
          value={[]}
          onChange={handleChange}
          style={{}}
          inputProps={{
            id: "select-multiple-native",
          }}
          >
            {window.location.pathname === '/Driver' && driverArr.map((driver) => (
              <option key={`${driver.givenName} ${driver.familyName}`} value={driver.driverId}>
              {`${driver.givenName} ${driver.familyName}`}
              </option>
            ))}
            {window.location.pathname === '/Year' && years.map((season) => (
              <option key={season} value={season}>
              {season}
              </option>
            ))}
            {window.location.pathname === '/Team' && teamArr.map((team) => (
              <option key={team.constructorId} value={team.constructorId}>{team.name}</option>
            ))}
            {window.location.pathname === '/Race' && years.map((season) => (
              <option key={season} value={season}>
              {season}
              </option>
            ))}
          </Select> 
        </Paper>
      </FormControl>
      {(window.location.pathname === '/Race' && season ? 
      <FormControl className={classes.formControl} >
        <Paper className={classes.paper} >
          <Select
          className={classes.select}
          type="select-multiple"
          multiple
          native
          value={[]}
          onChange={handleRaceChange}
          style={{}}
          inputProps={{
            id: "Race",
          }}
          >
            {window.location.pathname === '/Race' && races && races.map((season) => (
              <option key={season.round} value={season.round}>
              {season.round} {season.raceName}
              </option>
            ))}
          </Select> 
         </Paper>
      </FormControl>
      : 
      <div/>)}
    </div>
  )
}

export default Selector
