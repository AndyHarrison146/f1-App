import axios from "axios";
import React, { useState, useEffect } from "react";
import { names } from "../assets/Names";
import { shortNames } from "../assets/ShortenedNames";
import load from "../img/load.gif";

const ImgApi = ({ driverData, changeImgUrl, imgUrl }) => {
  const [title, setTitle] = useState();
  const [longNameChecked, setLongNameChecked] = useState(false);
  const [longName, setLongName] = useState(
    `${driverData.givenName}_${driverData.familyName}`
  );
  const [shortName, setShortName] = useState(
    `${driverData.givenName}_${driverData.familyName}`
  );
  const [longNameRacingDriver, setLongNameRacingDriver] = useState(
    `${driverData.givenName}_${driverData.familyName}_(racing_driver)`
  );
  const [shortNameRacingDriver, setShortNameRacingDriver] = useState(
    `${shortName}_(racing_driver)`
  );

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const createShortName = () => {
    const nameIndex = names.indexOf(driverData.givenName.toLowerCase());
    if (nameIndex === -1) {
      return;
    } else
      setShortName(
        capitalize(shortNames[nameIndex]) + "_" + driverData.familyName
      );
  };

  useEffect(() => {
    switch (longName) {
      case "Carlo_Abate":
        setLongName(`${driverData.givenName}_Maria_${driverData.familyName}`);
        break;
      case "Carlos_Sainz":
        setLongName(`${driverData.givenName}_${driverData.familyName}_Jr.`);
        break;
      case "Juan_Fangio":
        console.log("here");
        setLongName(`${driverData.givenName}_Manuel_${driverData.familyName}`);
        break;
      case "Wilson_Fittipaldi":
        setLongName(`${driverData.givenName}_${driverData.familyName}_Júnior`);
        break;
      default:
        return;
    }
  }, [longName]);

  const getProfileImg = (name) => {
    const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&maxlag=1&prop=pageimages&list=&titles=${name}&piprop=thumbnail%7Cname%7Coriginal&format=json`;
    return new Promise((resolve, reject) => {
      axios.get(url).then((res) => {
        if (!res.data) {
          return resolve();
        }
        const data = res.data.query;
        if (!data.pages) {
          return resolve();
        }
        const pages = data.pages;
        for (const page in pages) {
          if (pages[page].original) {
            changeImgUrl(pages[page].original.source);
            reject();
            console.log("reject66", name);
          } else {
            resolve();
            console.log("resolve69", name);
          }
        }
      });
    });
  };

  const getImgTitle = (name) => {
    const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=images&titles=${name}&format=json`;
    return new Promise((resolve, reject) => {
      axios.get(url).then((res) => {
        if (!res.data.query.pages) {
          changeImgUrl("");
          console.log("this is the right line");
        }
        const pages = res.data.query.pages;
        for (const page in pages) {
          if (pages[page].images) {
            for (const img of pages[page].images) {
              if (img.title.includes(".jpg", ".JPG", ".png", ".PNG")) {
                const _title = img.title.replace(/\s/g, "_");
                setTitle(_title);
                reject();
                console.log("reject87", _title);
              } else if (!img.title.includes(".jpg", ".JPG", ".png", ".PNG")) {
                resolve();
                if (name === longName) {
                  setLongNameChecked(true);
                }
                if (name === shortNameRacingDriver) {
                  changeImgUrl("");
                  console.log("noimage");
                }
              }
            }
          }
        }
      });
    });
  };

  const getImgUrl = () => {
    axios
      .get(
        `https://commons.wikimedia.org/w/api.php?origin=*&action=query&format=json&prop=imageinfo&list=&titles=${title}&iiprop=timestamp%7Cuser%7Curl`
      )
      .then((res) => {
        console.log("here 116");
        const pages = res.data.query.pages;
        for (const page in pages) {
          if (pages[page].imageinfo) {
            if (imgUrl) {
              return;
            }
            changeImgUrl(pages[page].imageinfo[0].url);
          }
        }
      });
  };

  useEffect(() => {
    getProfileImg(longName).then(() => {
      getImgTitle(longName).then(() => {
        !title &&
          getProfileImg(longNameRacingDriver).then(() => {
            getImgTitle(longNameRacingDriver);
          });
      });
    });
  }, [longName]);

  useEffect(() => {
    shortName &&
      longNameChecked &&
      getProfileImg(shortName).then(() => {
        getImgTitle(shortName).then(() => {
          !title &&
            getProfileImg(shortNameRacingDriver).then(() => {
              getImgTitle(shortNameRacingDriver);
            });
        });
      });
  }, [shortName, longNameChecked]);

  useEffect(() => {
    title && getImgUrl();
  }, [title]);

  useEffect(() => {
    createShortName();
    setLongNameChecked(false);
    changeImgUrl("load");
  }, [driverData]);

  return null;
};

export default ImgApi;
