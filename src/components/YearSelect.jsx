import React from "react";
import Select from "react-select";
import { years } from "../assets/Years";

const YearSelect = ({onChange, value}) => {
	const year = years.forEach(year => {if(year.value === value) return year})
	
	return (
		<div className='select-background'>
			{years && <Select 
				className='select'
				onChange={onChange}
				value={year}
				options={years}
			/>}
		</div>
	)
}

export default YearSelect