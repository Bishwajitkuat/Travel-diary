import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "../css/Sidebar.module.css";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/* Outlet element will be replace with one of the child route  */}
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by Bishwajit Das
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
