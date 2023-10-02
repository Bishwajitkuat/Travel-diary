/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "../css/Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlLocation } from "../hooks/useUrlLocation";
import Message from "./Message";
import Spinner from "./Spinner";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useCitiesContext } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingCityData, setIsLoadingCityData] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geocodeError, setGeocodeError] = useState("");
  // useUrlLocation() coustom hook is used to get lat and lng values from searchParams
  const { lat, lng } = useUrlLocation();
  const { postnewCity, isLoading } = useCitiesContext();

  useEffect(() => {
    const fetchCityData = async (lati, lngi) => {
      try {
        // resetting error at the begining of each fetch
        setGeocodeError("");
        // if user access the Form component without lat and lng param, throw new error
        if (!lati && !lngi)
          throw new Error("Please clik somewhere on the map to add new city");
        setIsLoadingCityData(true);

        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lati}&longitude=${lngi}`
        );
        const data = await res.json();
        if (data.city === "" || data.countryCode === "")
          throw new Error(
            "Seleted location is not a city or country. Please select a city!"
          );
        setCountry(data.countryName);
        setCityName(data.city);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeocodeError(error.message);
        console.log(error.message);
      } finally {
        setIsLoadingCityData(false);
      }
    };
    fetchCityData(lat, lng);
  }, [lat, lng]);

  // as postnewCity() is a async function, we need to make handleSubmit() function and await for postnewCity() call before it navigate to app

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) {
      alert("Both city name and date are required");
      return;
    }
    const newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: { lat, lng },
    };
    // postnewCity function call make a post request with newCity object, and return response.ok true or false, if response.ok is true, it will navigate to app
    const res = await postnewCity(newCity);
    if (res) navigate("/app");
  };

  if (geocodeError) return <Message message={geocodeError} />;
  if (isLoadingCityData) return <Spinner />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* in DatePicker it have acces to date instead of event, selected instead of value in input and dateFormat to formate date */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">
          <p>Add</p>
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
