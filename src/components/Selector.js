import React from 'react';
import { makeStyles, useState } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from '@material-ui/core/Paper';
import { years } from '../assets/Years';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 350,
    maxWidth: 600,
    minHeight: 200,
  },
  paper: {
  overflowX: "auto",
  margin: "auto",
  background: '#ffffff',
},

}));

const Selector = ({year, changeYear, driverArr, changeName}) => {
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
      // changeRace(search)
    }
    if (window.location.pathname === '/Driver') {
      changeName(value)
    }
    if (window.location.pathname === '/Team') {
      // changeTeam(search)
    }
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Paper className={classes.paper}>
          <Select
          type="select-multiple"
          multiple
          native
          value={[]}
          onChange={handleChange}
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
          </Select>
        </Paper>
      </FormControl>
    </div>
  )
}

export default Selector

{/* {years.map((season) => (
  <option key={season} value={season}>
  {season}
  </option>
))} */}