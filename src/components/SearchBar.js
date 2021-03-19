
import React, { useState } from 'react'


const SearchBar = ({parentCallback}) => {
  const [query, setQuery] = useState("");

  // const handleSubmit = (e) => {
  //   setQuery(e.target.value)
  //   console.log(query)


  // }

  // const handleInputChange = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value)


  // }


  const handleSubmit = (event) => {
      
      event.preventDefault();
      console.log(query)
      // alert(`submitting Year ${query}`)

    // if(event.key === 'Enter') {
    //   setQuery(event.target.value)
    //   setTimeout(5000)
    //   console.log(query)
    // }


   }

//  const BarStyling = { width: "10rem", background: "#F2F1F9", border: "none", padding: "0.5rem", marginTop: "5%" };

  return (
    <form onSubmit={handleSubmit}> 
      <label>
        Year:
        <input  type="text" placeholder={"search"} value={query} onChange={e => setQuery(e.target.value)}/>
      </label>
      <input type="submit" value={"submit"} />
    </form>
    // <form >
    //   <input style={BarStyling} type="text" placeholder={"search"} onKeyDown={handleSubmit}
    //  />
    // </form>
    //style={BarStyling}
  );
}

export default SearchBar
