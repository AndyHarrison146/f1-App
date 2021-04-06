import React, {useState} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer as MUIDrawer, ListItem, ListItemText, List } from '@material-ui/core'
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  toolbar: theme.mixins.toolbar,

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
  const navList = [ 'Race', 'Year', 'Driver', 'Team', 'Home']
  const history = useHistory();
  const [navState, setNavState] = useState(false);
  
  const toggleDrawer = (open) => {
    return function(event) {
      return setNavState(open)
    }
  }

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
