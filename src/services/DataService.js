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
