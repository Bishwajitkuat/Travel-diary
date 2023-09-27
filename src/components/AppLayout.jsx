// import AppNav from "./AppNav";
import Sidebar from "./Sidebar";
import styles from "../css/AppLayout.module.css";
import Map from "./Map";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
