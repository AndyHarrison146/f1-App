import React from 'react'
import {useStyles} from '../styles';
import { Grid, Typography } from '@material-ui/core'

const About = () => {
  const classes = useStyles();
  return (
    <div className={classes.about}>
      <Grid container
      spacing={0}
      align="center"
      justify='space-around'
      alignContent='flex-start'
      style={{ minHeight: '100vh', minWidth: '100vw' }}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h4" align='center'>About The Site</Typography>
          <Typography className={classes.aboutText} variant="h6" align='center'>This site was created as a project while learning web development. Here you will find all results of recorded f1 races from history, driver information, team information and schedules.  I would like to give special thanks to https://ergast.com/mrd/.  An F1 API which without the use of this site f1GridCheck.com would not be possible. this site was created as a project for portfolio work and is a work in progress. This site is free to use and I hope as a fellow f1 fan you will find use in this site. This site was created by Andy Harrison</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h4" align='center'>Contact Us</Typography>
          <Typography variant="h6" align='center'>If you find any Bugs or have any questions feel free to contact us at f1gridcheck@gmail.com</Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default About
