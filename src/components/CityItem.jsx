/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import styles from "../css/CityItem.module.css";
import { useCitiesContext } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity } = useCitiesContext();
  const { cityName, emoji, date, id, position } = city;
  return (
    <NavLink
      className={`${styles.cityItem} ${
        currentCity?.id == id ? styles["cityItem--active"] : ""
      }`}
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}
    >
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </NavLink>
  );
}

export default CityItem;
