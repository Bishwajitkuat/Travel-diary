/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "../css/CityList.module.css";
import Spinner from "./Spinner";

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  return (
    <div className={styles.CityList}>
      {cities.map((item) => (
        <p key={item.cityName}>{item.cityName}</p>
      ))}
    </div>
  );
}

export default CityList;
