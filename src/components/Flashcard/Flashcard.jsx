import "./Flashcard.scss"
import { useState, useEffect } from "react";
import axios from 'axios';
import FlashcardForm from "../FlashcardForm/FlashcardForm"

function Flashcard() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dataPath, setDataPath] = useState('arrays')
  //const jsonFilePath = "/data/arrayMethods.json";
  //const jsonFilePath2 = "/data/objectMethods.json"

  const URL = import.meta.env.VITE_APP_BASE_URL;
  const arrayMethods = `${URL}/array-methods`
  const arrayMethodsNoLogin = `${URL}/array-methods/nologin`
  const objectMethods = `${URL}/object-methods`
  const objectMethodsNoLogin = `${URL}/object-methods/nologin`
  const token = localStorage.getItem('token')

  //is this the place where I could track if the token has expired then automatically log the user out?

  const handleOnChange = (newValue) => {
    setDataPath(newValue)
    setCurrentIndex(0)
    console.log(newValue)
  }

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  //refactor this. This is ugly.
  /*   const getData = async () => {
      try {
        if (dataPath === 'arrays' && !token) {
          const response = await axios.get(arrayMethodsNoLogin)
          setData(response.data)
        } else if (dataPath === 'arrays' && token) {
          const response = await axios.get(arrayMethods, headers)
          setData(response.data)
        } else if (dataPath === 'objects' && !token) {
          const response = await axios.get(objectMethodsNoLogin)
          setData(response.data)
        } else if (dataPath === 'objects' && token) {
          const response = await axios.get(objectMethods, headers)
          setData(response.data)
        }
  
      } catch (error) {
        console.log(error)
      }
    }
   */

  const getData = async () => {
    try {
      let url;

      if (dataPath === 'arrays') {
        url = token ? arrayMethods : arrayMethodsNoLogin;
      } else if (dataPath === 'objects') {
        url = token ? objectMethods : objectMethodsNoLogin
      }

      if (url) {
        const response = await axios.get(url, headers);
        setData(response.data)
      } else {
        console.log('Invalid dataPath provided')
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData();
  }, [dataPath]);

  const showNextItem = () => {
    if (currentIndex + 1 < data.length) {
      setCurrentIndex(currentIndex + 1);
    }
  }
  const showPreviousItem = () => {
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flashcard-container">
      <select className="flashcard-container__select" onChange={(e) => handleOnChange(e.currentTarget.value)}>
        <option value="arrays">Arrays</option>
        <option value="objects">Objects</option>
        {/* <option value="dsAndAlgos">Data Structures And Algorithms</option> */}
      </select>
      {data.length > 0 ? (
        <div className="flashcard">
          <p className="flashcard__name" key={data[currentIndex].id}>{data[currentIndex].name}</p>
          <p className="flashcard__definition">{data[currentIndex].definition}</p>
          <code className="flashcard__code">{data[currentIndex].code}</code>
        </div>
      ) : (
        <p className="flashcard__loading">Loading data...</p>
      )}
      <div className="button-container">
        <button className="back-button" onClick={showPreviousItem}>
          Back
        </button>
        {currentIndex + 1 < data.length ? (
          <button className="next-button" onClick={showNextItem}>Next</button>
        ) : (
          <p className="end-of-list">End of List</p>
        )}
      </div>
      {token ? (<FlashcardForm dataPath={dataPath} />) : null}
    </div>
  );
}

export default Flashcard;

/* -------------------------------------------------------------------------- */
/*                             Prior GET requests                             */
/* -------------------------------------------------------------------------- */

//GET request from json file
/*   const getData = async () => {
    try {
      const response = await axios.get(dataPath === 'arrays' ? jsonFilePath : jsonFilePath2)
      const info = response.data;
      setData(info);
    } catch (error) {
      console.log(error);
    }
  } */

//GET request from server
/*   const getData = async () => {
    try {
      const response = await axios.get(dataPath === 'arrays' ? arrayMethods : objectMethods,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      const info = response.data;
      setData(info);
    } catch (error) {
      console.log(error);
    }
  } */