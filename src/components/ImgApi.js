import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {names} from '../assets/Names';
import {shortNames} from '../assets/ShortenedNames';
import load from '../img/load.gif'

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const ImgApi = ({driverData, changeImgUrl, driverId, imgUrl}) => {
  const [title, setTitle] = useState();
  const [longName, setLongName] = useState(`${driverData.givenName}_${driverData.familyName}`);
  const [shortName, setShortName] = useState(`${driverData.givenName}_${driverData.familyName}`)

      
  
  
  if(longName === 'Carlos_Sainz') {
    setLongName(`${driverData.givenName}_${driverData.familyName}_Jr.`)
  }
  if(longName === 'Juan_Fangio') {
    setLongName(`${driverData.givenName}_Manuel_${driverData.familyName}`)
  }
  if(longName === 'Wilson_Fittipaldi') {
    setLongName(`${driverData.givenName}_${driverData.familyName}_Júnior`)
  }
  
    let checked = 0;
    
    const getProfileImg = (name) => {
      console.log(name)
      const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&maxlag=1&prop=pageimages&list=&titles=${name}&piprop=thumbnail%7Cname%7Coriginal&format=json`
      try {
        axios.get(url).then(res => {
          try {
          if(res.data.query.pages) {
          const pages = res.data.query.pages;
          console.log(pages)
          for (const page in pages) {
            if(pages[page].original) {
              changeImgUrl(pages[page].original.source)
            } else {
              checked++
              console.log(checked)
              getImg()
            }
          }
        } else {
          checked++
          console.log(checked)
          getImg()
        }
      } catch (error) {
        console.log(error.stack)
        changeImgUrl('')
      }
      })
      } catch (error) {
        console.log(error)
      }
    }
    
    
    const createShortName = () => {
      const nameIndex = names.indexOf(driverData.givenName.toLowerCase());
      console.log(nameIndex)
      if(nameIndex === -1) {
      setShortName(driverData.givenName + '_' + driverData.familyName)
      } else  setShortName(capitalize(shortNames[nameIndex]) + '_' + driverData.familyName);
    } 
    

    const checkImgTitle = (name) => {
      console.log(name)
      const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=images&titles=${name}&format=json`
      axios.get(url).then(res => {
        const pages = res.data.query.pages;
        console.log(pages)
        for (const page in pages) {
          if (pages[page].images) { 
            for (const img of pages[page].images) {
              if (img.title.includes('.jpg', '.JPG', '.png', '.PNG')) {
                setTitle(img.title.replace(/\s/g, '_'))
                break;
              } else {
                checked++
                getImg()
                console.log(checked)
              }
            }
          } else if (!pages[page].images) {
            checked++
            getImg()
            console.log(checked)
          }
        }
      })
    }
    
    const getImgUrl = () => {
      title &&
      axios.get(`https://commons.wikimedia.org/w/api.php?origin=*&action=query&format=json&prop=imageinfo&list=&titles=${title}&iiprop=timestamp%7Cuser%7Curl`).then(res => {
        const pages = res.data.query.pages;
        for (const page in pages) {
          if (pages[page].imageinfo) {
            changeImgUrl(pages[page].imageinfo[0].url)    
          }
        }
      })
    }
    
    /*function 3
    call functions 1 & 2 */
      const getImg = () => {
        try {
          if (checked < 8) {
            changeImgUrl(load)
          }
          
          if(checked === 0) {
            getProfileImg(longName)
          } else if (checked === 1) {
            getProfileImg(shortName)
          } else if (checked === 2) {
            getProfileImg(longName + '_(racing_driver)')
          } else if (checked === 3) {
            getProfileImg(shortName + '_(racing_driver)')
          } else if (checked === 4) {
            checkImgTitle(longName)
          } else if (checked === 5) {
            checkImgTitle(shortName)
          } else if (checked === 6) {
            checkImgTitle(longName + '_(racing_driver)')
          } else if (checked === 7) {
            checkImgTitle(shortName + '_(racing_driver)')
          } else if (checked === 8) {
            changeImgUrl('')
          }

        } catch (error) {
          console.log(error)
        }
      }
      
      useEffect(() => {
        getImgUrl()
      }, [title])

      useEffect(() => {
        const timer = setTimeout(() => {
          getImg()
        }, 1000);
        return () => clearTimeout(timer);
      }, [shortName])
      
      useEffect(() => {
        createShortName()
        checked = 0
      }, [driverData])
      
      
      
      // const anyImgUrl = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=images&titles=${LongName}&format=json`
      
      
      
      
      
      










    
  return (
    <div>
    </div>
  )
}

export default ImgApi

