import React, { useState } from "react";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom" 
import background from './img/backgroundImg.jpg';
import Header from './components/Header.js';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import theme from './theme';
import Year from './components/Year';
import Home from './components/Home';
import Race from './components/Race';
import Driver from './components/Driver';
import Team from './components/Team';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
  paper: {
    background: theme.palette.primary.main
  }
}))



function App() {
  const classes = useStyles();
  const history = useHistory();


  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{backgroundImage: `url(${background})`}}>
        <Header />
        <div >  
          <Switch>
            <Route exact from="/" render={props => <Home {...props} />} style={{ alignItems: "center"}}/>
            <Route exact from="/Race" render={props => <Race {...props} style={{ alignItems: "center"}} />} />
            <Route exact path="/Year" render={props => <Year {...props}  style={{ alignItems: "center"}}/>} />
            <Route exact from="/Driver" render={props => <Driver {...props} style={{ alignItems: "center"}} />} />
            <Route exact from="/Team" render={props => <Team {...props} style={{ alignItems: "center"}}/>} />
          </Switch>
        </div>
        {/* <SearchBar query={query} changeQuery={setQuery} /> */}
        <div />
        {/* <Year query={query} style={{ alignItems: "center"}} /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
