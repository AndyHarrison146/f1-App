import axios from "axios";

// export function getLastRace() {
//   const lastRaceURL = `http://ergast.com/api/f1/current/last/results.json?limit=1000`;
//   return axios.get(lastRaceURL);
// }

export function getChampion() {
  const url = `http://ergast.com/api/f1/2021/driverStandings.json?limit=1000`;
  return axios.get(url);
}

export const getRoundsFromSeason = (season) => {
  return axios.get(`http://ergast.com/api/f1/${season}.json?limit=1000`);
};

export const getRaceFromSeason = (season, round) => {
  return axios.get(
    `http://ergast.com/api/f1/${season}/${round}/results.json?limit=1000`
  );
};

export   const getAllDrivers = () => {
  const driverURL = `http://ergast.com/api/f1/drivers.json?limit=1000`;
  return axios.get(driverURL)
}

export const getDriver = (driverId) => {
  const driverURL = `http://ergast.com/api/f1/drivers/${driverId}.json?limit=1000`;
  return axios.get(driverURL);
}

export const getWins = (driverId) => {
  const winUrl = `http://ergast.com/api/f1/drivers/${driverId}/results/1.json?limit=1000`;
  return axios.get(winUrl);
}

export const getTeam = (teamName) => {
  return axios
    .get(`http://ergast.com/api/f1/constructors/${teamName}.json?limit=1000`)
}

export const getTeamWins = (teamName) => {
  return axios
    .get(
      `http://ergast.com/api/f1/constructors/${teamName}/results/1.json?limit=1000`
    )
}

export const getTeamChampionships = (teamName) => {
  return axios
    .get(
      `https://ergast.com/api/f1/constructors/${teamName}/constructorStandings/1.json?limit=1000`
    )
}


export const getAllDriversChampionships = () => {
  return axios
    .get(`http://ergast.com/api/f1/driverStandings/1.json?limit=1000`)
}

export const getWikiProfileImg = (name) => {
  const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&maxlag=1&prop=pageimages&list=&titles=${name}&piprop=thumbnail%7Cname%7Coriginal&format=json`;
  return axios.get(url);
};

export const getWikiImgTitle = (name) => {
  const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=images&titles=${name}&format=json`;
  return axios.get(url);
};

export const getWikiImgFromTitle = (title) => {
  return axios.get(
    `https://commons.wikimedia.org/w/api.php?origin=*&action=query&format=json&prop=imageinfo&list=&titles=${title}&iiprop=timestamp%7Cuser%7Curl`
  );
};
