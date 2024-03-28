import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header.jsx";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import Year from "./components/Year";
import Home from "./components/Home";
import Race from "./components/Race";
import Driver from "./components/Driver";
import Team from "./components/Team";
import Schedule from "./components/Schedule";
import { useStyles } from "./styles";
import About from "./components/About";

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <div className={classes.container}>
          <Switch>
            <Route
              exact
              from="/"
              render={(props) => <Home {...props} className={classes.root} />}
            />
            <Route
              path="/Home"
              render={(props) => <Home {...props} className={classes.root} />}
            />
            <Route
              path="/Schedule"
              render={(props) => (
                <Schedule {...props} className={classes.root} />
              )}
            />
            <Route
              path="/Race"
              render={(props) => <Race {...props} className={classes.root} />}
            />
            <Route
              path="/Year"
              render={(props) => <Year {...props} className={classes.root} />}
            />
            {/* <Route
              path="/Driver"
              render={(props) => <Driver {...props} className={classes.root} />}
            /> */}
            <Route
              path="/Team"
              render={(props) => <Team {...props} className={classes.root} />}
            />
            <Route
              path="/About"
              render={(props) => <About {...props} className={classes.root} />}
            />
          </Switch>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
