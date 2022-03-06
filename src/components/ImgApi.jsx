import React, { useState, useEffect } from "react";
import {
  getWikiProfileImg,
  getWikiImgTitle,
  getWikiImgFromTitle,
} from "../services/DataService";
import noImage from "../img/No_Image_Available.jpg";
import "../styles/driver.css";

const ImgApi = ({ driverUrl }) => {
  const [title, setTitle] = useState();
  const [wikiName, setWikiName] = useState();
  const [noProfileImg, setNoProfileImg] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const getProfileImg = (name) => {
    getWikiProfileImg(name).then((res) => {
      const data = res.data.query;
      const pages = data.pages;
      for (const page in pages) {
        if (pages[page].original?.source) {
          setImgUrl(pages[page].original.source);
        }
      }
    });
  };

  const getImgTitle = (name) => {
    getWikiImgTitle(name).then((res) => {
      setTitle(null);
      if (res.data.query.pages) {
        const pages = res.data.query.pages;
        for (const page in pages) {
          if (pages[page].images) {
            for (const img of pages[page].images) {
              if (img.title.includes(".jpg", ".JPG", ".png", ".PNG")) {
                const _title = img.title.replace(/\s/g, "_");
                setTitle(_title);
                break;
              }
            }
          }
        }
      }
    });
  };

  const getImgUrl = (title) => {
    getWikiImgFromTitle(title).then((res) => {
      const pages = res.data.query.pages;
      for (const page in pages) {
        if (pages[page].imageinfo) {
          setImgUrl(pages[page].imageinfo[0].url);
          break;
        }
      }
    });
  };

  const getWikiName = (driverUrl) => {
    setNoProfileImg(false);
    const index = driverUrl.lastIndexOf("/");
    const urlName = driverUrl.substr(index + 1);
    switch (urlName) {
      case "Alexander_Albon":
        setWikiName("Alex_Albon");
        break;
      case "Joakim_Bonnier":
        setWikiName("jo_Bonnier");
        break;
      default:
        setWikiName(urlName);
    }
  };

  useEffect(() => {
    driverUrl && getWikiName(driverUrl);
    setImgUrl("");
  }, [driverUrl, wikiName]);

  useEffect(() => {
    wikiName && getProfileImg(wikiName);
    wikiName &&
      setTimeout(() => {
        !imgUrl && setNoProfileImg(true);
      }, 500);
  }, [wikiName]);

  useEffect(() => {
    noProfileImg && !imgUrl && getImgTitle(wikiName);
  }, [noProfileImg]);

  useEffect(() => {
    title && getImgUrl(title);
    title &&
      setTimeout(() => {
        if (imgUrl) return;
        imgUrl && setImgUrl("");
      }, 700);
  }, [title]);

  return <img src={imgUrl ? imgUrl : noImage} className="driver-img" alt="" />;
};

export default ImgApi;
