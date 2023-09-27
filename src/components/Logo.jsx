import { NavLink } from "react-router-dom";
import styles from "../css/Logo.module.css";

function Logo() {
  return (
    <NavLink to="/">
      <img src="./logo.png" alt="WorldWise logo" className={styles.logo} />
    </NavLink>
  );
}

export default Logo;
