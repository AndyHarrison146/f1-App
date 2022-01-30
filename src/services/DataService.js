import axios from "axios";

export function getLastRace() {
  const lastRaceURL = `http://ergast.com/api/f1/current/last/results.json?limit=1000`;
  return axios.get(lastRaceURL);
}

export function getChampion() {
  const url = `http://ergast.com/api/f1/2021/driverStandings.json?limit=1000`;
  return axios.get(url);
}

export function getChampionship() {
  const championshipURL = `http://ergast.com/api/f1/current/driverStandings.json?limit=1000`;
  return axios.get(championshipURL);
}

export function getContructors() {
  const ConstructorURL = `http://ergast.com/api/f1/current/constructorStandings.json?limit=1000`;
  return axios.get(ConstructorURL);
}

export const getDriverChampionships = (driverId) => {
  const championshipURL = `http://ergast.com/api/f1/drivers/${driverId}/driverStandings/1.json?limit=1000`;
  return axios.get(championshipURL);
};

export const GetYearChampion = (year) => {
  const championshipURL = `http://ergast.com/api/f1/${year}/driverStandings.json?limit=1000`;
  return axios.get(championshipURL);
};

export const getYearData = (year) => {
  const f1Url = `http://ergast.com/api/f1/${year}/results.json?limit=1000`;
  return axios.get(f1Url);
};
