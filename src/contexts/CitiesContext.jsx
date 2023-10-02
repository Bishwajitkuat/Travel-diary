/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  cities: [],
  isLoading: false,
  errorMessage: "",
  currentCity: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, errorMessage: "" };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "error":
      return { ...state, errorMessage: action.payload, isLoading: false };
    case "currentCity/loaded":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id != action.payload),
        isLoading: false,
      };
  }
};

const CitiesContext = createContext();

const CitiesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, errorMessage, currentCity } = state;

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "error", payload: error.message });
      }
    }
    fetchCities();
  }, []);

  //feactch data for current city with id in City component

  const getCurrentCity = async (id) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await res.json();
      if (res.ok) dispatch({ type: "currentCity/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  // POST request to add new cityobject
  const postnewCity = async (newCity) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      // if post request is successful only then I want to add the new city to the current state
      if (res.ok) {
        dispatch({ type: "city/created", payload: data });
        // setCities((cities) => [...cities, data]);
        return res.ok;
      }
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  // DELETE request ot delete city

  const deleteCity = async (id) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });
      // if delete request is successful only then I want to  synce with current state
      if (res.ok) {
        dispatch({ type: "city/deleted", payload: id });
        // setCities((cities) => cities.filter((city) => city.id != id));
      }
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };
  const data = {
    cities,
    isLoading,
    currentCity,
    getCurrentCity,
    postnewCity,
    deleteCity,
    errorMessage,
  };
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
