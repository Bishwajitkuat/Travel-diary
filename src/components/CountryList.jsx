/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "../css/CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCitiesContext } from "../contexts/CitiesContext";

function CountriesList() {
  const { cities, isLoading } = useCitiesContext();
  // filtering out multiplae entrei of same country
  const countries = cities.reduce((acc, item) => {
    if (acc.find((city) => city.country === item.country)) {
      return acc;
    } else {
      return [...acc, { country: item.country, emoji: item.emoji }];
    }
  }, []);

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking a city on the map" />
    );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountriesList;
