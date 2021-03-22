import React from 'react'
import { Drawer as MUIDrawer, ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import theme from '../theme';



const useStyles = makeStyles({
  drawer: {
    width: '160px',
   
    // color: theme.palette.primary.main
  },
  listItemText: {
    fontSize: '2em',
    color: '#ffffff',

  
  }
})

const NavMenu = () => {
  const classes = useStyles();
  const navList = ['Race', 'Year', 'Driver', 'Team']
  return (
   <MUIDrawer open >
     <List>
        {navList.map((text, index) => (
          <ListItem button key={text} styles={{ fontSize: 10}}>
            <ListItemText classes={{primary: classes.listItemText}} primary={text} />
          </ListItem>
        ))}
      </List>
   </MUIDrawer>
  )
}

export default NavMenu
