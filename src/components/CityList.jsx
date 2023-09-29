/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useCitiesContext } from "../contexts/CitiesContext";
import styles from "../css/CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

function CityList() {
  const { cities, isLoading } = useCitiesContext();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking a city on the map" />
    );
  return (
    <ul className={styles.CityList}>
      {cities.map((item) => (
        <CityItem key={item.cityName} city={item} />
      ))}
    </ul>
  );
}

export default CityList;
