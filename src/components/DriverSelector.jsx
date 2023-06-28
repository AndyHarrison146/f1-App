import React from 'react';
import Select from 'react-select'
import { Grid } from "@material-ui/core";
import '../styles/race.css';

const DriverSelector = ({onChange, driverArr, selectedDriver}) => {
  const driver = driverArr?.forEach(driver => {if(driver.value === selectedDriver?.value) return driver});

	const driverOptions = driverArr && driverArr.map(option => ({
		value: option.driverId,
		label: `${option.givenName} ${option.familyName}`
	}));

  return (
    <>
    	<Grid      
      container
      spacing={0}
      alignContent='center'
      style={{ minHeight: "100px", minWidth: "100%" }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
              <div className='select-background'>
                <Select
                className='select'
                onChange={onChange}
                value={driver}
                options={driverOptions}
                />
              </div>
          </Grid>
      </Grid>
    </>
  )
}

export default DriverSelector
