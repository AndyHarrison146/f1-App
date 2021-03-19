import React, { useState } from "react";
import "./App.css";
import background from './img/backgroundImg.jpg';
import Header from './components/Header.js';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import Year from './components/Year';
import SearchBar from "./components/SearchBar";
import {Button} from '@material-ui/core';



function App() {
  const [showTable, setShowTable] = useState(false); 
  const [query, setQuery] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{backgroundImage: `url(${background})`}}>
        <Header />
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
