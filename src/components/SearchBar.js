
import React, { useState }from 'react'


const SearchBar = () => {
  const [query, setQuery] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(e.target.value)
    console.log(query)
    
  }
  
  const handleInputChange = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    

  }

  const BarStyling = {width:"10rem",background:"#F2F1F9", border:"none", padding:"0.5rem", marginTop: "5%"};
  return (
    <form onSubmit={handleSubmit}>
      <input style={BarStyling} type="text" key="search" search='Search'
      placeholder={"search"} onChange={handleInputChange} 
     />
    </form>
  );
}

export default SearchBar
