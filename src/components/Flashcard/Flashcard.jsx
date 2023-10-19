import "./Flashcard.scss"
import { useState, useEffect } from "react";
import axios from 'axios';

function Flashcard() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // State to keep track of the currently displayed item
  const jsonFilePath = "src/assets/data/arrayMethods.json";

  const getData = async () => {
    try {
      const response = await axios.get(jsonFilePath);
      const info = response.data;
      setData(info);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const showNextItem = () => {
    // Check if there are more items to display
    if (currentIndex + 1 < data.length) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  return (
    <div className="flashcard-container">
      {data.length > 0 ? (
        <div className="flashcard">
          <p className="flashcard__name" key={data[currentIndex].id}>{data[currentIndex].name}</p>
          <p className="flashcard__definition">{data[currentIndex].definition}</p>
          <code className="flashcard__code">{data[currentIndex].code}</code>
          {/* {currentIndex + 1 < data.length ? (
            <button onClick={showNextItem}>Next</button>
          ) : (
            <p>End of List</p>
          )} */}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
      {currentIndex + 1 < data.length ? (
            <button className="next-button" onClick={showNextItem}>Next</button>
          ) : (
            <p className="end-of-list">End of List</p>
          )}
    </div>
  );
}

export default Flashcard;
