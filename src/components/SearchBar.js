import React from 'react';


const SearchBar = ({changeYear, changeName, changeTeam, changeRace}) => {
  let search;
  
  const handleSubmit = (event) => { 
      event.preventDefault();
      console.log(window.location.pathname)
      if (window.location.pathname === '/Year') {
        changeYear(search)
      }
      if (window.location.pathname === '/Race') {
        changeRace(search)
      }
      if (window.location.pathname === '/Driver') {
        changeName(search)
      }
      if (window.location.pathname === '/Team') {
        changeTeam(search)
      }
      

    }

 const BarStyling = { width: "10rem", background: "#F2F1F9", border: "none", padding: "0.5rem", marginTop: "5%" };

  return (
    <form onSubmit={handleSubmit}> 
      <label>
        Year:
        <input style={BarStyling} type="text" placeholder={"search"} value={search} onChange={e => search = e.target.value}/>
      </label>
    </form>
  );
}

export default SearchBar
