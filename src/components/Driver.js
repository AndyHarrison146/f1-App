import React, { useState } from 'react'
import SearchBar from './SearchBar';
import TableComponent from './TableComponent';



const Driver = () => {
  const [driverQuery, setDriverQuery] = useState("");

  return (
    <div>
      <SearchBar driverQuery={driverQuery} changeQuery={setDriverQuery} />
      <TableComponent />
    </div>
  )
}

export default Driver
