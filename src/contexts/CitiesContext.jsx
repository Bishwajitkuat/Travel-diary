/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const CitiesContextProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState();

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  //feactch data for current city with id in City component

  const getCurrentCity = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // POST request to add new cityobject
  const postnewCity = async (newCity) => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
      return res.ok;
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const data = { cities, isLoading, currentCity, getCurrentCity, postnewCity };
  return (
    <CitiesContext.Provider value={data}>{children}</CitiesContext.Provider>
  );
};

const useCitiesContext = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error(
      "useCitiesContex is used outside of it's context or scope!!!"
    );
  return context;
};
export { useCitiesContext, CitiesContextProvider };
