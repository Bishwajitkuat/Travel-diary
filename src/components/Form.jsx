/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "../css/Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useSearchParams } from "react-router-dom";
import { useUrlLocation } from "../hooks/useUrlLocation";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingCityData, setIsLoadingCityData] = useState(false);
  // useUrlLocation() coustom hook is used to get lat and lng values from searchParams
  const { lat, lng } = useUrlLocation();

  useEffect(() => {
    const fetchCityData = async (lati, lngi) => {
      try {
        setIsLoadingCityData(true);
        console.log(lati, lngi);
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lati}&longitude=${lngi}`
        );
        const data = await res.json();
        console.log(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoadingCityData(false);
      }
    };
    fetchCityData(lat, lng);
  }, [lat, lng]);

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
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
