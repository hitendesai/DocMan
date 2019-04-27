import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserAvatar from "react-user-avatar"
import styles from "./User.scss"
import { logoutUser } from "../../../actions/authActions";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from 'react-router';
const leftIconstyle = { 'margin': '10px 0px', 'height': '20px' }
class User extends Component {
onLogoutClick = e => {
// e.preventDefault();
this.props.logoutUser();
};
render() {
const { user } = this.props.auth;
return (
<Router>
   <div className="col s12">
      <span className={styles.avatar}>
         <UserAvatar size="34" name={user.name.split(" ")[0]} className={styles.circle} />
         <span className={styles.text}>Hi, {user.name.split(" ")[0]} </span>
         <span className={styles.text}>
            <Link to="/login"  onClick={this.onLogoutClick}>
            <button
            style={{
            height: "30px",
            // width: "100px",
            borderRadius: "3px",
            fontSize: "15px",
            lineHeight: "2.6px",
            color: '#fff'
            }}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            ><span className={styles.logout}>Logout</span></button></Link>
         </span>
      </span>
   </div>
</Router>
);
}
}
User.propTypes = {
logoutUser: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
auth: state.auth
});
export default connect(
mapStateToProps,
{ logoutUser }
)(User);