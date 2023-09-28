/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "../css/CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  return (
    <div className={styles.CityList}>
      {cities.map((item) => (
        <CityItem key={item.cityName} city={item} />
      ))}
    </div>
  );
}

export default CityList;
