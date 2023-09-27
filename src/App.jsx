// import reactLogo from "./assets/react.svg";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
// import PageNav from "./components/PageNav";
import styles from "./css/AppLayout.module.css";
import Login from "./pages/Login";

function App() {
  return (
    <div className={styles.app}>
      {/* all the Routes and Route has to be wrapped by BrowserRouter */}
      <BrowserRouter>
        {/* Navbar or anything that will be visible in each page should be inside
        the "BrowserRouter" but outside of "Routes" */}
        {/* <PageNav /> */}
        {/* all the "Route" must be wrapped inside "Routes" only one "Route" can be render at a time */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          {/* if url does not matche any Route then "*" Route will be rendered */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
