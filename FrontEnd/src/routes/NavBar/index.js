import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from 'react-router';
import { Provider } from "react-redux";
import store from "../../store/createStore";
import styles from "../../styles/Login.scss"
class Navbar extends Component {
render() {
return (
<Provider store={store}>
   <Router>
      <nav className="z-depth-0" style={{ marginTop: "2rem" }}>
      <div className="nav-wrapper white center-align">
         <Link to="/">
         <img src ="virtusa.png" className={styles.logonavbar}/>
         </Link>
      </div>
      </nav>
   </Router>
</Provider>
);
}
}
export default Navbar;