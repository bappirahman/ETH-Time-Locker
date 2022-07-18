import Styles from "./Nav.module.css";
import {Link} from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div className={Styles.before}></div>
      <h1 className={Styles.logo}>Time Locker</h1>
      <div className={Styles.linkGroup}>
        <Link className={Styles.link} to="/">Deposit</Link>
        <Link className={Styles.link} to="/withdraw">Withdraw</Link>
      </div>
      <div className={Styles.after}></div>
    </>
  );
}
export default Nav;