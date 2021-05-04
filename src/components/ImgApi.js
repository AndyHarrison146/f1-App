import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {names} from '../assets/Names';
import {shortNames} from '../assets/ShortenedNames';


const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}



const ImgApi = ({driverData, changeImgUrl}) => {
  const [title, setTitle] = useState();
  const [urlName, setUrlName] = useState(`${driverData.givenName}_${driverData.familyName}`);

  let pageImgUrl = `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&maxlag=1&prop=pageimages&list=&titles=${urlName}&piprop=thumbnail%7Cname%7Coriginal&format=json`

  let url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=images&titles=${urlName}&format=json`


  const getImg = () => {
    changeImgUrl('')
    axios.get(pageImgUrl).then(res => {
      const pages = res.data.query.pages;
      console.log(pages)
      for (const page in pages) {
        pages[page].original ? changeImgUrl(pages[page].original.source) : getImgTitle() ;
      }
    })
  }

  const getImgTitle = () => {
    changeImgUrl('')
    axios.get(url).then(res => {
      const pages = res.data.query.pages;
      for (const page in pages) {
        if (pages[page].images) { 
          for (const img of pages[page].images) {
            if (img.title.includes('.jpg', '.JPG', '.png', '.PNG')) {
              setTitle(img.title.replace(/\s/g, '_'))
              break;
            } else if (!img.title.includes('.jpg')){
              getShortName();
            }
          }
        }}
      })}

  const getShortName = () => {
    const nameIndex = names.indexOf(driverData.givenName.toLowerCase())
    if(nameIndex === -1) {
      return
    } else setUrlName(capitalize(shortNames[nameIndex]) + '_' + driverData.familyName)
  }

  const getImgUrl = () => {
    title &&
    axios.get(`https://commons.wikimedia.org/w/api.php?origin=*&action=query&format=json&prop=imageinfo&list=&titles=${title}&iiprop=timestamp%7Cuser%7Curl`).then(res => {
      const pages = res.data.query.pages;
      for (const page in pages) {
        if (pages[page].imageinfo) {
          changeImgUrl(pages[page].imageinfo[0].url)    
        } else changeImgUrl('')  
      }
    })
  }

  useEffect(() => {
    getImg();
  }, [urlName])

  useEffect(() => {
    getImgUrl();
  }, [title])

  useEffect(() => {
    setTitle('')
    changeImgUrl('')
    setUrlName(`${driverData.givenName}_${driverData.familyName}`)
  },[driverData])
    
 
  return (
    <div>
    </div>
  )
  }

export default ImgApi

