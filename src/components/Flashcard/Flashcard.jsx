import "./Flashcard.scss"
import { useState, useEffect } from "react";
import axios from 'axios';

function Flashcard() {
  const [data, setData] = useState([]);
  /* const [randomIndex ,setRandomIndex] = useState(0) */
  const [currentIndex, setCurrentIndex] = useState(0);
  const jsonFilePath = "src/assets/data/arrayMethods.json";
  const jsonFilePath2 = "src/assets/data/objectMethods.json"
  const [dataPath, setDataPath] = useState('arrays')

  const handleOnChange = (newValue) =>{
    setDataPath(newValue)
    console.log(newValue)
  }

  const getData = async () => {
    try {
      const response = await axios.get(dataPath === 'arrays' ? jsonFilePath : jsonFilePath2)
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
        <p>Loading data...</p>
      )}
      {currentIndex + 1 < data.length ? (
            <button className="next-button" onClick={showNextItem}>Next</button>
          ) : (
            <p className="end-of-list">End of List</p>
          )}
         {/*  <button className="random-button" onClick={getRandomIndex}>Next Random</button> */}

    </div>
  );
}

export default Flashcard;
