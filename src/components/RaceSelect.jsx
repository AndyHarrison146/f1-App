import React from "react";
import Select from "react-select";
import { years } from "../assets/Years";
import { Grid } from "@material-ui/core";

const RaceSelect = ({onSeasonChange, onRoundChange, season, selectedRound, roundsArr}) => {
	const seasonValue = years?.forEach(year => {if(year.value === season) return year})
	
	const rounds = roundsArr && roundsArr.map((race) => {
		return {
			value: race.round,
			label: `${race.round} ${race.raceName}`
		}
	})
	const roundValue = rounds?.forEach(round => {if(round.value === selectedRound) return round})
	
	return (
		<Grid     
			container
			spacing={0}
			alignContent='center'
			style={{ minHeight: "60px", minWidth: "100%" }}
		>
			<Grid item xs={6} sm={6} md={6} lg={6}>
				<div className='select-background-year'>
					<Select
					className='select'
					onChange={onSeasonChange}
					value={seasonValue}
					options={years}
					/>
				</div>
			</Grid>
			{roundsArr && (
			<Grid item xs={6} sm={6} md={6} lg={6}>
					<div className='select-background-round'>
					<Select
							className='select'
							onChange={onRoundChange}
							value={roundValue}
							options={rounds}
							/>
					</div>
			</Grid>
			)}
    </Grid>
	)
}

export default RaceSelect