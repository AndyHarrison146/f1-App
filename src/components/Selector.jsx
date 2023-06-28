import React, {useEffect, useState} from 'react';
import Select from 'react-select'
import { years } from '../assets/Years';
import { Grid } from "@material-ui/core";
import '../styles/race.css';

const Selector = ({onChange, driverArr, changeDriverId, teamArr, changeTeam, season, races, changeRound, changeRaceData, changeSeason}) => {
  const [selected, setSelected] = useState();
  const [racesArr, setRacesArr] = useState();
  const [options, setOptions] = useState();
  const pathname = window.location.pathname;
  
  useEffect(() => {
    handleOptions();
  }, []);
  
  useEffect(() => {
    races && hydrateRaceOptions(races);
  }, [races]);
      
  const hydrateDriverOptions = () => {
    const _driverArr = [];
    driverArr.forEach((driver) => {
      _driverArr.push({
            value: driver.driverId,
            label: `${driver.givenName} ${driver.familyName}`
      })
    })
    if(driverArr.length === _driverArr.length) {
      setOptions(_driverArr);
    }
  };

  const hydrateRaceOptions = (racesRes) => {
    const _racesArr = [];
    racesRes.forEach((race) => {
      _racesArr.push({
            value: race.round,
            label: `${race.round} ${race.raceName}`
      })
    })
    if(racesRes.length === _racesArr.length) {
      setRacesArr(_racesArr);
    }
  }

  const handleOptions = () => {
    switch(pathname) {
      case '/Year':
        setOptions(years);
        break
      case '/Driver':
        if(driverArr) {
          hydrateDriverOptions();
        }
        break
      case '/Race':
        setOptions(years);
        break
      default:
        return;
    }
  }

  const handleChange = (select) => {
    const {value} = select;
    switch(pathname) {
      case '/Year':
        setSelected(parseInt(value))
        onChange((parseInt(value)))
        break
      case '/Race': 
        setSelected(value)
        changeSeason(value)
        changeRaceData('')
        break
      case '/Driver':
        setSelected(value)
        changeDriverId(value)
        break
      case '/Team':
        setSelected(value)
        changeTeam(value)
        break
      default:
        return;
    }
  };


  const handleRaceChange = (select) => {
    const { value } = select;
    changeRound(parseInt(value));
  }

  return (
    <>
      {pathname !== '/Race' && options &&(
      <Grid      
      container
      spacing={0}
      alignContent='center'
      style={{ minHeight: "100px", minWidth: "100%" }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
              <div className='select-background'>
                <Select
                className='select'
                onChange={handleChange}
                value={selected}
                options={options}
                />
              </div>
          </Grid>
      </Grid>
      )}
      {pathname === '/Race' && (
      <Grid      
      container
      spacing={0}
      alignContent='center'
      style={{ minHeight: "100px", minWidth: "100%" }}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <div className='select-background-year'>
              <Select
              className='select'
              onChange={handleChange}
              defaultValue={selected}
              options={options}
              />
            </div>
          </Grid>
        {racesArr && (
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <div className='select-background-round'>
              <Select
                className='select'
                onChange={handleRaceChange}
                defaultValue={selected}
                options={racesArr}
                />
            </div>
          </Grid>
        )}
        </Grid>
        )}
    </>
  )
}

export default Selector
