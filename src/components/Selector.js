import React, { Fragment } from 'react';
import { makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from '@material-ui/core/Paper';
import { years } from '../assets/Years';



const useStyles = makeStyles((theme) => ({
  
  formControl: {
    width: '250px',
    height: '250px'
  },
  paper: {
  overflowX: "auto",
  marginTop: '10%',
  // margin: "auto",
  background: '#ffffff',
  },
  select: {
    width: '250px', 
  }



}));

const Selector = ({changeYear, driverArr, changeDriverId, teamArr, changeTeam}) => {
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
      changeDriverId(value)
    }
    if (window.location.pathname === '/Team') {
      changeTeam(value)
    }
  };

  return (
    <Fragment>
    <div>
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
          </Select>
        </Paper>
      </FormControl>
    </div>
    </Fragment>
  )
}

export default Selector
