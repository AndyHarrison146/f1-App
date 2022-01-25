import React, { useState, useEffect, useCallback } from "react";
import { Card, Typography } from "@material-ui/core";
import { getChampion } from "../services/DataService";
import { Teams } from "../assets/Teams";
import { driverTeamInfo } from "../utils/utils";

const CurrentChampion = () => {
  const [champion, setChampion] = useState();
  const [teamImg, setTeamImg] = useState();

  const getChampionData = useCallback(() => {
    console.log("hi");
    getChampion().then((res) => {
      const leader =
        res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
      console.log(leader);
      setChampion(leader);
      setTeamImg(driverTeamInfo(leader.Constructors[0].name));
      console.log(driverTeamInfo(leader.Constructors[0].name));
    });
  }, []);

  useEffect(() => {
    !champion && getChampionData();
  }, []);

  return (
    <div className="champion-card-div">
      {champion && (
        <Card className="champion-card">
          <div className="champion-text">
            <Typography component={"span"} variant="h3">
              Current World Champion
            </Typography>
          </div>
          <img src={Teams[1].driver1Url} className="champion-img" />
          <Typography>{`#${champion.Driver.permanentNumber} ${champion.Driver.givenName} ${champion.Driver.familyName}`}</Typography>
          {teamImg && (
            <img
              src={teamImg.url}
              alt={champion.Constructors[0].name}
              style={{ marginLeft: "75px" }}
              className={`team-img-${champion.Constructors[0].constructorId}`}
            />
          )}
        </Card>
      )}
    </div>
  );
};

export default CurrentChampion;
