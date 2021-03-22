import React, { useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom" 
import background from './img/backgroundImg.jpg';
import Header from './components/Header.js';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import theme from './theme';
import Year from './components/Year';
import SearchBar from "./components/SearchBar";
import {Button} from '@material-ui/core';
import NavMenu from './components/NavMenu';
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
  const [showTable, setShowTable] = useState(false); 
  const [query, setQuery] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{backgroundImage: `url(${background})`}}>
        <Header />
        <div className={classes.container}>  
          <NavMenu classes={{paper: classes.paper}}/>
          <Switch>
            <Route exact from="/" render={props => <Home {...props} />} />
            <Route exact from="/Race" render={props => <Race {...props} />} />
            <Route exact path="/Year" render={props => <Year {...props} />} />
            <Route exact from="/Driver" render={props => <Driver {...props} />} />
            <Route exact from="/Team" render={props => <Team {...props} />} />
          </Switch>
        </div>
        <SearchBar query={query} changeQuery={setQuery} />
        <div />
        <Button variant="contained" color="primary" style={{ marginTop: "1%"}} onClick={() => setShowTable(!showTable)}>
          {showTable? "hideTable" : "showTable"}
        </Button>
        {showTable && <Year query={query} style={{ alignItems: "center"}} /> }
      </div>
    </ThemeProvider>
  );
}

export default App;
