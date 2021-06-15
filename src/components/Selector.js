import React, { useState } from 'react';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from '@material-ui/core/Paper';
import { years } from '../assets/Years';
import {useStyles} from '../styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';


const Selector = ({changeYear, driverArr, changeDriverId, teamArr, changeTeam, season, races, changeRound, changeRaceData, changeSeason}) => {
  const classes = useStyles();
  const [currentSelected, setCurrentSelected] = useState('')

  const handleChange = (event) => {
    // const { options } = event.target;
    // console.log(event.taget)
    const value = event.target.value;
    setCurrentSelected(value)
    
    // for (let i = 0, l = options.length; i < l; i += 1) {
    //   if (options[i].selected) {
    //     value.push(options[i].value);
    //   }
    // }
    if (window.location.pathname === '/Year') {
      if(value == 'Search') {
        changeYear('')
      } else {
        changeYear((parseInt(value)))
      }
    }
    if (window.location.pathname === '/Race') {
      if(value == 'Search') {
        changeSeason('')
      } else {
        changeSeason(value)
        changeRaceData('')
      }
    }
    if (window.location.pathname === '/Driver') {
      if(value == 'Search') {
        console.log(true)
        changeDriverId('')
      } else {
        changeDriverId('')
        changeDriverId(value)
      }
    }
    if (window.location.pathname === '/Team') {
      if(value == 'Search') {
        changeTeam('')
      } else {
        changeTeam(value)
      }
    }
  };

  const handleRaceChange = (event) => {
    // const { options } = event.target;
    const value = event.target.value;
    // for (let i = 0, l = options.length; i < l; i += 1) {
    //   if (options[i].selected) {
    //     value.push(options[i].value);
    //   }
    // }
    if (window.location.pathname === '/Race' && season) {
      changeRound(value)
    }
  }

  return (
    <div>
      <FormControl className={classes.formControl} >
        <Paper className={classes.paperSelect} >
          <Select
          labelId="label"
          id="select-label"
          value={[currentSelected]}
          onChange={handleChange}
          displayEmpty
          className={classes.select}
          >
            <MenuItem value="">
              <em>Search</em>
            </MenuItem>
            {window.location.pathname === '/Driver' && driverArr.map((driver) => (
              <MenuItem style={{textAlign: 'left'}} key={`${driver.givenName} ${driver.familyName}`} value={driver.driverId}>
              {`${driver.givenName} ${driver.familyName}`}
              </MenuItem>
            ))}
            {window.location.pathname === '/Year' && years.map((season) => (
              <MenuItem style={{textAlign: 'center'}} key={season} value={season}>
              {season}
              </MenuItem>
            ))}
            {window.location.pathname === '/Team' && teamArr.map((team) => (
              <MenuItem style={{textAlign: 'left'}} key={team.constructorId} value={team.constructorId}>{team.name}</MenuItem>
            ))}
            {window.location.pathname === '/Race' && years.map((season) => (
              <MenuItem style={{textAlign: 'center'}} key={season} value={season}>
              {season}
              </MenuItem>
            ))}
          </Select> 
        </Paper>
      </FormControl>
      {(window.location.pathname === '/Race' && season ? 
      <FormControl className={classes.formControl} >
      <Paper className={classes.paperSelect} >
        <Select
        labelId="label"
        id="select-label"
        value={[]}
        onChange={handleRaceChange}
        displayEmpty
        className={classes.select}
        >
          <MenuItem value="">
              <em>Round</em>
          </MenuItem>
          {window.location.pathname === '/Race' && races && races.map((season) => (
            <MenuItem style={{textAlign: 'left'}} key={season.round} value={season.round}>
              {season.round} {season.raceName}
            </MenuItem>
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
