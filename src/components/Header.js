import React, {useState, useEffect} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer as MUIDrawer, ListItem, ListItemText, List, CircularProgress } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: '2em',
    textAlign: "center",
    flexGrow: 0.93,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  nextRace: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  drawer: {
    width: '160px',
    zIndex: '1250',
    position: 'absolute',
    // color: theme.palette.primary.main
  },
  listItemText: {
    fontSize: '1.6em',
    color: '#ffffff',
    padding: theme.spacing(1),
  },
}));

const Header = () => {  
  const classes = useStyles();
  const navList = [ 'Home','Schedule', 'Year', 'Race', 'Driver', 'Team']
  const history = useHistory();
  const [navState, setNavState] = useState(false);
  const [lastRound, setLastRound] = useState();
  const [nextRound, setNextRound] = useState('');
  const [time, setTime] = useState();
  const [raceDate, setRaceDate] = useState();



  const toggleDrawer = (open) => {
    return function(event) {
      return setNavState(open)
    }
  }

  const getLastRound = () => {
    axios.get('http://ergast.com/api/f1/current/last/results.json').then(res => {
      setLastRound(res.data.MRData.RaceTable.round);
    })
  }
    
  const getNextRound = () => {
    axios.get('http://ergast.com/api/f1/current.json').then(res => {
      setNextRound(res.data.MRData.RaceTable.Races[lastRound]);
    })
  }

  const countdownTimer = () => {
    if (nextRound) {
      
    }
  }
    
  useEffect(() => {
    getLastRound()
  }, [])
    
  useEffect(() => {
   getNextRound()
  }, [lastRound])

  useEffect(() => {
    if(nextRound) {
      let countdownDate = new Date(`${nextRound.date} ${nextRound.time}`).getTime();
      let x = setInterval(function() {
        let now = new Date().getTime()
        let distance = countdownDate - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        let seconds = Math.floor((distance % (1000 * 60))/ 1000);
        
        setTime(days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's')
        
        if(distance < 0) {
          clearInterval(x)
          setTime('Race Time')
        }
      }, 1000)
    }
    }, [nextRound])
    
    return (
      <AppBar position="relative" color="primary" className={classes.appBar} >
        <Toolbar>
        <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={navState? toggleDrawer(false) : toggleDrawer(true)} 
            >
            <MenuIcon />
          </IconButton >
          <Typography className={classes.title} variant="h6" noWrap>
            F1 Results Tracker
          </Typography>
          {(nextRound ? 
            <div>
              <Typography className={classes.nextRace}>{`Next Race: Round ${nextRound.round} ${nextRound.raceName}`}
              </Typography>
              <div>{time}</div>
            </div>
            : 
            <Typography>hi</Typography>)}
        </Toolbar>
        <MUIDrawer open={navState} onClose={toggleDrawer(false)}>
          <div className={classes.toolbar} />
     <List>
       {navList.map((route) => {
         return (
            <ListItem divider={true} button key={`${route}`} onClick={() => history.push(`/${route}`)} styles={{ fontSize: 10}}>
              <ListItemText classes={{primary: classes.listItemText}} primary={`${route}`} />
            </ListItem>
         )
       })}
      </List>
   </MUIDrawer>
      </AppBar>
  )
}

export default Header
