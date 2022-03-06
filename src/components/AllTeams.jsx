import React from "react";

const AllTeams = () => {
  return (
    <div>
      {/* <Grid item xs={12} sm={12} md={12} lg={12}>
        <ButtonGroup
          variant="text"
          size="large"
          className={classes.buttonGroup}>
          <Button
            onClick={changeCurTeams}
            color={showCurTeams ? "primary" : "secondary"}>
            Current Teams
          </Button>
          <Button
            onClick={changePrevTeams}
            color={showPrevTeams ? "primary" : "secondary"}>
            Previous Teams
          </Button>
        </ButtonGroup>
      </Grid> */}
      {/* {showPrevTeams && (
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Selector changeTeam={setTeam} teamArr={teamArr} />
          {teamData ? (
            <Card
              className={classes.card}
              style={{ justifyContent: "center", display: "flex" }}>
              <CardActionArea>
                <CardContent>
                  {teamChampionships &&
                    teamChampionships.map((season) => {
                      if (
                        season.ConstructorStandings[0].Constructor
                          .constructorId == team
                      ) {
                        championships++;
                      }
                    })}
                  <div>
                    <Typography variant="h5" align="center">
                      {`Championships: ${championships}`}
                    </Typography>
                    <img
                      src={noImage}
                      className={classes.driverImg}
                      align="center"
                    />
                    <Typography variant="h6" align="center">
                      {`
                  Name: ${teamData.name} `}{" "}
                      <br /> {`Constructor I.D: ${teamData.constructorId} `}{" "}
                      <br /> {`Nationality: ${teamData.nationality} `} <br />
                      <a href={teamData.url}>Wikipedia Link</a>
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ) : (
            <CircularProgress className={classes.circle} />
          )}
        </Grid>
      )} */}
    </div>
  );
};

export default AllTeams;
