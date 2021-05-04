import React, {useState} from 'react';
import SearchBar from'./SearchBar';

const Race = () => {
  const [race, setRace] = useState();

  return (
    <div>
      <SearchBar race={race} changeRace={setRace} />
    </div>
  )
}

export default Race
