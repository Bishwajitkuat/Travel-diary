// import reactLogo from "./assets/react.svg";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
// import PageNav from "./components/PageNav";
import styles from "./css/AppLayout.module.css";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className={styles.app}>
      {/* all the Routes and Route has to be wrapped by BrowserRouter */}
      <BrowserRouter>
        {/* Navbar or anything that will be visible in each page should be inside
        the "BrowserRouter" but outside of "Routes" */}
        {/* <PageNav /> */}
        {/* all the "Route" must be wrapped inside "Routes" only one "Route" can be render at a time */}
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          {/* nested rout: parent route app  */}
          <Route path="/app" element={<AppLayout />}>
            {/* child routes */}
            {/* index route will be the default child route if parent route is visited
            in other words: parent ruoute's element-component's child is <Oullet/> and it's defaul value comes form index route's element component */}
            {/* <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            /> */}
            <Route index element={<Navigate replace to="cities" />} />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route path="cities/:id" element={<City cities={cities} />} />
            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            />
            <Route path="form" element={<Form />} />
          </Route>
          {/* if url does not matche any Route then "*" Route will be rendered */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
