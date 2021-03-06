import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from 'react-router';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { Provider } from "react-redux";
import store from "../../store/createStore";
import Navbar from "../NavBar"
import styles from "../../styles/Login.scss"
class Register extends Component {
constructor() {
super();
this.state = {
name: "",
email: "",
password: "",
password2: "",
errors: {}
};
}
componentDidMount() {
// If logged in and user navigates to Register page, should redirect them to dashboard
if (this.props.auth.isAuthenticated) {
this.props.history.push("/dashboard");
}
}
componentWillReceiveProps(nextProps) {
if (nextProps.errors) {
this.setState({
errors: nextProps.errors
});
}
}
onChange = e => {
this.setState({ [e.target.id]: e.target.value });
};
onSubmit = e => {
e.preventDefault();
const newUser = {
name: this.state.name,
email: this.state.email,
password: this.state.password,
password2: this.state.password2
};
this.props.registerUser(newUser, this.props.history); 
};
render() {
const { errors } = this.state;
return (
<Provider store={store}>
   <Router>
      <div className="container">
         <Navbar/>
         <div style={{ marginTop: "2rem" }} className="row">
         <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect" style={{textDecoration: "none", color: "#000"}}>
            <i className="material-icons left ">keyboard_backspace</i> Back to
            home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
               Register <span style={{ fontWeight: "300" }}>below</span>
            </h4>
            <p className="grey-text text-darken-1" style={{ paddingBottom: "12px" }}>
            Already have an account? 
            <Link to="/login" className={styles.nodecor}>
            Log in</Link>
            </p>
         </div>
         <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s12">
               <input
               onChange={this.onChange}
               value={this.state.name}
               error={errors.name}
               id="name"
               type="text"
               className={classnames("", {
               invalid: errors.name
               })}
               />
               <label htmlFor="name">Name</label>
               <span className="red-text">{errors.name}</span>
            </div>
            <div className="input-field col s12">
               <input
               onChange={this.onChange}
               value={this.state.email}
               error={errors.email}
               id="email"
               type="email"
               className={classnames("", {
               invalid: errors.email
               })}
               />
               <label htmlFor="email">Email</label>
               <span className="red-text">{errors.email}</span>
            </div>
            <div className="input-field col s12">
               <input
               onChange={this.onChange}
               value={this.state.password}
               error={errors.password}
               id="password"
               type="password"
               className={classnames("", {
               invalid: errors.password
               })}
               />
               <label htmlFor="password">Password</label>
               <span className="red-text">{errors.password}</span>
            </div>
            <div className="input-field col s12">
               <input
               onChange={this.onChange}
               value={this.state.password2}
               error={errors.password2}
               id="password2"
               type="password"
               className={classnames("", {
               invalid: errors.password2
               })}
               />
               <label htmlFor="password2">Confirm Password</label>
               <span className="red-text">{errors.password2}</span>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px", paddingTop: "20px" }}>
            <button
            style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem"
            }}
            type="submit"
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
            Sign up
            </button>
      </div>
      </form>
      </div>
      </div>
      </div>
   </Router>
</Provider>
);
}
}
Register.propTypes = {
registerUser: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired,
errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
auth: state.auth,
errors: state.errors
});
export default connect(
mapStateToProps,
{ registerUser }
)((Register));