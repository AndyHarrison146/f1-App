
import React from 'react'


const SearchBar = ({query, changeQuery}) => {




  const handleSubmit = (event) => { 
      event.preventDefault();
      console.log(query)
   }

 const BarStyling = { width: "10rem", background: "#F2F1F9", border: "none", padding: "0.5rem", marginTop: "5%" };

  return (
    <form onSubmit={handleSubmit}> 
      <label>
        Year:
        <input style={BarStyling} type="text" placeholder={"search"} value={query} onChange={e => changeQuery(e.target.value)}/>
      </label>
      <input type="submit" value={"submit"} />
    </form>
  );
}

export default SearchBar
