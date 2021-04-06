
import React from 'react'


const SearchBar = ({query, changeQuery}) => {
  let search;
  
  const handleSubmit = (event) => { 
      event.preventDefault();
      changeQuery(search)
      console.log(search);
    }

 const BarStyling = { width: "10rem", background: "#F2F1F9", border: "none", padding: "0.5rem", marginTop: "5%" };

  return (
    <form onSubmit={handleSubmit}> 
      <label>
        Year:
        <input style={BarStyling} type="text" placeholder={"search"} value={search} onChange={e => search = e.target.value}/>
      </label>
      {/* <input type="submit" value={"submit"} /> */}
    </form>
  );
}

export default SearchBar
