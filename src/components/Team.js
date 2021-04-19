import React, { useState } from 'react'
import SearchBar from './SearchBar'

const Team = () => {
const [team, setTeam] = useState();

  return (
    <div>
      <SearchBar team={team} changeTeam={setTeam}/>
    </div>
  )
}

export default Team
