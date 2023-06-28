import React, { useState, useEffect } from "react";
import {
  getWikiProfileImg,
  getWikiImgTitle,
  getWikiImgFromTitle,
} from "../services/DataService";
import noImage from "../img/No_Image_Available.jpg";
import "../styles/driver.css";
import useProfileImage from "../hooks/useProfileImage";
import useImageTitle from "../hooks/useImageTitle";
import useWikiImage from "../hooks/useWikiImage";

const ImgApi = ({ driverUrl }) => {
  // const [title, setTitle] = useState();

  const getWikiName = (driverUrl) => {
    const index = driverUrl.lastIndexOf("/");
    const urlName = driverUrl.substr(index + 1);
    switch (urlName) {
      case "Alexander_Albon":
        return ("Alex_Albon");
      case "Joakim_Bonnier":
        return ("jo_Bonnier");
      default:
        return (urlName);
    }
  };
  
  const wikiName = driverUrl && getWikiName()
  const [imgUrl, setImgUrl] = useState("");
  const { profileImage, error: profileError } = useProfileImage(wikiName);
  const { imageTitle, error: titleError } = useImageTitle(profileError, wikiName);
  // const { wikiImage, error: wikiImageError } = useWikiImage(imageTitle);


  console.log(profileImage)

  // useEffect(() => {
  //   driverUrl && getWikiName(driverUrl);
  // }, [driverUrl, wikiName]);

  if(profileImage) {
    setImgUrl(profileImage);
  } 
  //else if(profileError && wikiImage) {
  //   setImgUrl(wikiImage);
  // } else {
  //   setImgUrl('');
  // };

  return <img src={imgUrl ? imgUrl : noImage} className="driver-img" alt="" />;
};

export default ImgApi;
