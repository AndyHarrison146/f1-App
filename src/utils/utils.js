import { Teams } from "../assets/Teams";

export const driverTeamInfo = (team) => {
  switch (team) {
    case "Mercedes":
      return {
        primary: "lightBlue",
        secondary: "white-number",
        url: Teams[0].url,
      };
    case "Red Bull":
      return {
        primary: "purple",
        secondary: "white-number",
        url: Teams[1].url,
      };
    case "Ferrari":
      return {
        primary: "red",
        secondary: "white-number",
        url: Teams[3].url,
      };
    case "AlphaTauri":
      return {
        primary: "darkerBlue",
        secondary: "white-number",
        url: Teams[5].url,
      };
    case "Alpine F1 Team":
      return {
        primary: "blue",
        secondary: "white-number",
        url: Teams[4].url,
      };
    case "McLaren":
      return {
        primary: "orange",
        secondary: "white-number",
        url: Teams[2].url,
      };
    case "Aston Martin":
      return {
        primary: "green",
        secondary: "white-number",
        url: Teams[6].url,
      };
    case "Williams":
      return {
        primary: "darkBlue",
        secondary: "white-number",
        url: Teams[8].url,
      };
    case "Alfa Romeo":
      return {
        primary: "darkRed",
        secondary: "white-number",
        url: Teams[7].url,
      };
    case "Haas F1 Team":
      return {
        primary: "white",
        secondary: "black-number",
        url: Teams[9].url,
      };
    default:
      return;
  }
};

export const textColor = (team) => {
  if (team === "Haas F1 Team") {
    return "black-number";
  }
  return "white-number";
};
