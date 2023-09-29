/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";

const CitiesContext = createContext();

const CitiesContextProvider = ({ children }) => {
  const data = {};
  return (
    <CitiesContext.Provider value={data}>{children}</CitiesContext.Provider>
  );
};

const useCitiesContext = () => {
  const context = useContext(CitiesContext);
  return context;
};
export { useCitiesContext, CitiesContextProvider };
