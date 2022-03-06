import React from 'react';
import Select from "@material-ui/core/Select";
import { years } from '../assets/Years';
import {useStyles} from '../styles';
import { Grid } from "@material-ui/core";
import '../styles/race.css';


const Selector = ({changeYear, driverArr, changeDriverId, teamArr, changeTeam, season, races, changeRound, changeRaceData, changeSeason}) => {
  const pathname = window.location.pathname;

  const handleChange = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    if (pathname === '/Year') {
      changeYear((parseInt(value)))
    }
    if (pathname === '/Race') {
      changeSeason(value)
      changeRaceData('')
    }
    if (pathname === '/Driver') {
      changeDriverId('')
      changeDriverId(value)
    }
    if (pathname === '/Team') {
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
    if (pathname === '/Race' && season) {
      changeRound(value)
    }

  }

  return (
    <Grid      
    container
    spacing={0}
    alignContent='center'
    style={{ minHeight: "100px", minWidth: "100%" }}>
    {pathname !== '/Race' && (
    <Grid item xs={12} sm={12} md={12} lg={12}>
        <div className='select-background-single'>
          <Select
          className='select'
          type="select-multiple"
          multiple
          native
          onChange={handleChange}
          inputProps={{
            id: "select-multiple-native",
          }}
          >
            {pathname === '/Driver' && driverArr.map((driver) => (
              <option style={{textAlign: 'left'}} key={`${driver.givenName} ${driver.familyName}`} value={driver.driverId}>
              {`${driver.givenName} ${driver.familyName}`}
              </option>
            ))}
            {pathname === '/Year' && years.map((season) => (
              <option style={{textAlign: 'center'}} key={season} value={season}>
              {season}
              </option>
            ))}
            {pathname === '/Team' && teamArr.map((team) => (
              <option style={{textAlign: 'left'}} key={team.constructorId} value={team.constructorId}>{team.name}</option>
              ))}
          </Select>
        </div>
      </Grid>)}
      {(pathname === '/Race' && (
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <div className='select-background'>
            <Select
            className='select'
            type="select-multiple"
            multiple
            native
            onChange={handleChange}
            inputProps={{
              id: "select-multiple-native",
            }}
            >
              {years.map((season) => (
                <option style={{textAlign: 'center'}} key={season} value={season}>
                {season}
                </option>
              ))}
            </Select>
          </div>
        </Grid>)
      )}
      {pathname === '/Race' && season && (
        <Grid xs={6} sm={6} md={6} lg={6}>
          <div className='select-background-round'>
            <Select
              className='select'
              type="select-multiple"
              multiple
              native
              onChange={handleRaceChange}
              inputProps={{
                id: "select-multiple-native",
              }}
              >
              {pathname === '/Race' && races && races.map((season) => (
                <option style={{textAlign: 'left'}} key={season.round} value={season.round}>
                  {season.round} {season.raceName}
                </option>
              ))}
            </Select>
          </div>
        </Grid>
      )}
    </Grid>
  )
}

export default Selector
