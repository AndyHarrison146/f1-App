import React, { useState } from "react";
import "./App.css";
import background from './img/backgroundImg.jpg';
import Header from './components/Header.js';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import Year from './components/Year';
import SearchBar from "./components/SearchBar"
import {Button} from '@material-ui/core'


function App(props) {
  const [showTable, setShowTable] = useState(false); 

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{backgroundImage: `url(${background})`}}>
        <Header />
        <SearchBar />
        <div />
        <Button variant="contained" color="primary" style={{ marginTop: "1%"}} onClick={() => setShowTable(!showTable)}>
          {showTable? "hideTable" : "showTable"}
        </Button>
        {showTable && <Year style={{ alignItems: "center"}} /> }
      </div>
    </ThemeProvider>
  );
}

export default App;
