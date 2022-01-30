import { Teams } from "../assets/Teams";
import React, { useLayoutEffect, useState } from "react";

export const textColor = (team) => {
  if (team === "Haas F1 Team") {
    return "black-number";
  }
  return "white-number";
};

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export function ShowWindowDimensions(props) {
  const [width, height] = useWindowSize();
  return (
    <span>
      Window size: {width} x {height}
    </span>
  );
}

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

export const getRaceFlag = (country) => {
  switch (country) {
    case "Bahrain":
      return "https://flagcdn.com/w160/bh.png";
    case "Saudi Arabia":
      return "https://flagcdn.com/w160/sa.png";
    case "Australia":
    case "Australian":
      return "https://flagcdn.com/w160/au.png";
    case "Italy":
    case "Italian":
      return "https://flagcdn.com/w160/it.png";
    case "United States":
    case "USA":
      return "https://flagcdn.com/w160/us.png";
    case "Spain":
    case "Spanish":
      return "https://flagcdn.com/w160/es.png";
    case "Monegasque":
    case "Monaco":
      return "https://flagcdn.com/w160/mc.png";
    case "Azerbaijan":
      return "https://flagcdn.com/w160/az.png";
    case "Canada":
    case "Canadian":
      return "https://flagcdn.com/w160/ca.png";
    case "United Kingdom":
    case "British":
    case "UK":
      return "https://flagcdn.com/w160/gb.png";
    case "Austrian":
    case "Austria":
      return "https://flagcdn.com/w160/at.png";
    case "France":
    case "French":
      return "https://flagcdn.com/w160/fr.png";
    case "Hungary":
    case "Hungarian":
      return "https://flagcdn.com/w160/hu.png";
    case "Belgium":
    case "Belgian":
      return "https://flagcdn.com/w160/be.png";
    case "Netherlands":
    case "Dutch":
      return "https://flagcdn.com/w160/nl.png";
    case "Russia":
    case "Russian":
      return "https://flagcdn.com/w160/ru.png";
    case "Singapore":
      return "https://flagcdn.com/w160/sg.png";
    case "Japan":
    case "Japanese":
      return "https://flagcdn.com/w160/jp.png";
    case "Mexico":
    case "Mexican":
      return "https://flagcdn.com/w160/mx.png";
    case "Brazil":
    case "Brazilian":
      return "https://flagcdn.com/w160/br.png";
    case "UAE":
      return "https://flagcdn.com/w160/ae.png";
    case "Turkey":
      return "https://flagcdn.com/w160/tr.png";
    case "Germany":
    case "German":
      return "https://flagcdn.com/w160/de.png";
    case "Portugal":
      return "https://flagcdn.com/w160/pt.png";
    case "Qatar":
      return "https://flagcdn.com/w160/qa.png";
    case "China":
    case "Chinese":
      return "https://flagcdn.com/w160/cn.png";
    case "Malaysia":
      return "https://flagcdn.com/w160/my.png";
    case "Korea":
    case "Korean":
      return "https://flagcdn.com/w160/kr.png";
    case "India":
    case "Indian":
      return "https://flagcdn.com/w160/in.png";
    case "Finland":
    case "Finnish":
      return "https://flagcdn.com/w160/fi.png";
    case "Polish":
    case "Poland":
      return "https://flagcdn.com/w160/pl.png";
    case "Colombian":
      return "https://flagcdn.com/w160/co.png";
    case "Argentina":
      return "https://flagcdn.com/w160/ar.png";
    case "South Africa":
      return "https://flagcdn.com/w160/za.png";
    default:
      return "";
  }
};
