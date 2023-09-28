/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";
import styles from "../css/Map.module.css";
function Map() {
  const [searchParam, setSearchParam] = useSearchParams();

  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  console.log(lat, lng);
  return (
    <div className={styles.mapContainer}>
      <h1>Positions</h1>
      <h2>Lat: {lat}</h2>
      <h2>Lng: {lng}</h2>
    </div>
  );
}

export default Map;
