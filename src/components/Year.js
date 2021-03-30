import React, { useState, useEffect } from "react";
import "../App.css";
import axios from 'axios';
import TableComponent from './TableComponent'
import { CircularProgress } from '@material-ui/core';
import SearchBar from './SearchBar';



function Year() {
  const [data, setData] = useState();
  const [query, setQuery] = useState("");
  const year = query;
  
  useEffect(() => {
    const f1Url = `http://ergast.com/api/f1/${year}/results.json?limit=1000`;
    axios.get(f1Url)
    .then(res => {
      const races = res.data.MRData.RaceTable.Races;
      setData(races)
    })
  }, [year])

  return (
    <div>
      <SearchBar query={query} changeQuery={setQuery} />
      {(data ? 
      <div >
        <TableComponent data={data} style={{ alignItems: "center"}} />
      </div>
        : <CircularProgress />)}
    </div>

  );
}

export default Year;
