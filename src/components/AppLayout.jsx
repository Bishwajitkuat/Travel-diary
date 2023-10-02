// import AppNav from "./AppNav";
import Sidebar from "./Sidebar";
import styles from "../css/AppLayout.module.css";
import Map from "./Map";
import User from "./User";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
