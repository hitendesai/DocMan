import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from 'react-router';
import { Provider } from "react-redux";
import store from "../../store/createStore";
import styles from "../../styles/Login.scss"
class Landing extends Component {
render() {
return (
<Provider store={store}>
   <Router>
      <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
         <div className="col s12 center-align">
            <img src ="virtusa.png" className={styles.logo}/>
            <p className="flow-text grey-text text-darken-1">
               Document Management System
            </p>
            <br />
            <Link
            to="/register"
            style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            textDecoration: "none",
            color: "#fff"
            }}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
            Register
            </Link>
            <Link to ='/login'
            style={{
            marginLeft: "2rem",
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            textDecoration: "none"
            }}
            className="btn btn-large waves-effect white hoverable black-text"
            >
            Log In
            </Link>
         </div>
      </div>
      </div>
   </Router>
</Provider>
);
}
}
export default Landing;