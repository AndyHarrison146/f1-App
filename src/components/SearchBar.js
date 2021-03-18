
import React, { useState }from 'react'


const SearchBar = () => {
 const [query, setQuery] = useState();

  // const handleSubmit = (e) => {
  //   setQuery(e.target.value)
  //   console.log(query)
    
    
  // }
  
  // const handleInputChange = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value)
    

  // }

  const handleSubmit = (event) => {
    if(event.key === 'Enter') {
      event.preventDefault();
      setQuery(event.target.value)
    }
    console.log(query)
  }

  const BarStyling = {width:"10rem",background:"#F2F1F9", border:"none", padding:"0.5rem", marginTop: "5%"};
  return (
    <form >
      <input style={BarStyling} type="text" placeholder={"search"} onKeyDown={handleSubmit}
     />
    </form>
  );
}

export default SearchBar
