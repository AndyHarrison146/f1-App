import axios from "axios";

// class DataService {
//   constructor() {}

//   getLastRace() {
//     const lastRaceURL = `http://ergast.com/api/f1/current/last/results.json?limit=1000`;
//     return axios.get(lastRaceURL);
//   }
// }

// export default DataService;

export function getServiceLastRace() {
  const lastRaceURL = `http://ergast.com/api/f1/current/last/results.json?limit=1000`;
  console.log("here service");
  return axios.get(lastRaceURL);
}

export function getChampion() {
  const url = `http://ergast.com/api/f1/last/driverStandings.json?limit=1000`;
  axios.get(url);
}

export function getChampionship() {
  const championshipURL = `http://ergast.com/api/f1/current/driverStandings.json?limit=1000`;
  return axios.get(championshipURL);
}

export function getContructors() {
  const ConstructorURL = `http://ergast.com/api/f1/current/constructorStandings.json?limit=1000`;
  return axios.get(ConstructorURL);
}
