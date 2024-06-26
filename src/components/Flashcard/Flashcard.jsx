import "./Flashcard.scss"
import { useState, useEffect } from "react";
import axios from 'axios';

//console.log("URL: ", URL);

function Flashcard() {
  const [data, setData] = useState([]);
  /* const [randomIndex ,setRandomIndex] = useState(0) */
  const [currentIndex, setCurrentIndex] = useState(0);
  //const jsonFilePath = "/data/arrayMethods.json";
  //const jsonFilePath2 = "/data/objectMethods.json"
  const [dataPath, setDataPath] = useState('arrays')

  const URL = import.meta.env.VITE_APP_BASE_URL;
  const arrayMethods = `${URL}/array-methods`
  const objectMethods = `${URL}/object-methods`

  const handleOnChange = (newValue) => {
    setDataPath(newValue)
    setCurrentIndex(0)
    console.log(newValue)
  }

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
  const getData = async () => {
    try {
      const response = await axios.get(dataPath === 'arrays' ? arrayMethods : objectMethods)
      const info = response.data;
      setData(info);
    } catch (error) {
      console.log(error);
    }
  }

  /*   const getRandomIndex = () =>{
      const newIndex = Math.floor(Math.random() * data.length)
      setRandomIndex(newIndex)
    } */

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
      {/*  <button className="random-button" onClick={getRandomIndex}>Next Random</button> */}

    </div>
  );
}

export default Flashcard;
