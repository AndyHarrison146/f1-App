import React, { useState, useEffect } from "react";
import "../App.css";
import axios from 'axios';
import TableComponent from './TableComponent'



function Year({query}) {
  const [data, setData] = useState();
  const year = 2019;
  
  useEffect(() => {
    const f1Url = `http://ergast.com/api/f1/${query}/results.json?limit=1000`;
    axios.get(f1Url)
    .then(res => {
      const races = res.data.MRData.RaceTable.Races;
      setData(races)
    })
  }, [year])

  return (
    <div>
      <TableComponent data={data} />
    </div>

  );
}

export default Year;
