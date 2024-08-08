import "./Flashcard.scss";
import { useState, useEffect } from "react";
import axios from 'axios';
import FlashcardForm from "../FlashcardForm/FlashcardForm";

function Flashcard() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dataPath, setDataPath] = useState('arrays');

  const URL = import.meta.env.VITE_APP_BASE_URL;
  const arrayMethods = `${URL}/array-methods`;
  const objectMethods = `${URL}/object-methods`;
  const objectMethodsNoLogin = `${URL}/object-methods/nologin`;
  const token = localStorage.getItem('token');
  //is this the place where I could track if the token has expired then automatically log the user out?

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const getData = async () => {
    try {
      let url;
      if (dataPath === 'arrays') {
        url = arrayMethods;
      } else {
        url = token ? objectMethods : objectMethodsNoLogin;
      }

      const config = token ? headers : {};

      const response = await axios.get(url, config);
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      if (error.response) {
        if (error.response.status === 401) {
          console.log('Unauthorized access - token may be invalid or expired');
          localStorage.removeItem('token');
        }
        console.log('Error status:', error.response.status);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [dataPath, token]);

  const addFlashcard = (newFlashcard) => {
    setData((prevData) => [...prevData, newFlashcard]);
    setCurrentIndex(data.length);
  };

  const handleOnChange = (newValue) => {
    setDataPath(newValue);
    setCurrentIndex(0);
    //console.log(newValue);
  };

  const showNextItem = () => {
    if (currentIndex + 1 < data.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const showPreviousItem = () => {
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${arrayMethods}/${id}`, headers);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      if (currentIndex >= data.length - 1 && data.length > 1) {
        setCurrentIndex(currentIndex - 1);
      }
    } catch (error) {
      console.error('Failed to delete card:', error);
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized access - token may be invalid or expired');
        localStorage.removeItem('token');
      }
    }
  };


  return (
    <div className="flashcard-container">
      <select className="flashcard-container__select" onChange={(e) => handleOnChange(e.currentTarget.value)}>
        <option value="arrays">Arrays</option>
        <option value="objects">Objects</option>
      </select>
      {data.length > 0 && data[currentIndex] ? (
        <div className="flashcard">
          <p className="flashcard__name" key={data[currentIndex].id}>{data[currentIndex].name}</p>
          <p className="flashcard__definition">{data[currentIndex].definition}</p>
          <code className="flashcard__code">{data[currentIndex].code}
            <button className="flashcard__delete" onClick={() => handleDelete(data[currentIndex].id)}>delete</button>
          </code>
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
      {token ? (<FlashcardForm dataPath={dataPath} addFlashcard={addFlashcard} />) : null}
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