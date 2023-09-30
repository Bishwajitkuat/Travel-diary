/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import styles from "../css/City.module.css";
import { useCitiesContext } from "../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";

function City() {
  const { id } = useParams();
  const { currentCity, getCurrentCity, isLoading } = useCitiesContext();
  useEffect(() => {
    getCurrentCity(Number(id));
  }, [id]);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

  // if currentCity data yet not being featched, early return to prevent destructuring of undefined currentCity object
  if (!currentCity || isLoading) return <Spinner />;
  const { cityName, emoji, date, notes } = currentCity;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>{/* <ButtonBack /> */}</div>
    </div>
  );
}

export default City;
