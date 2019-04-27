import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import MainLayout from './MainLayout'
import CoreLayout from './CoreLayout'
import SearchPage from './SearchPage'
import SettingsPage from './SettingsPage'
import StatisticsPage from './StatisticsPage'
import Landing from './LandingPage'
import Login from './LoginPage'
import Register from './RegistrationPage'
export const createRoutes = (store) => {
// Check for token to keep user logged in
if (localStorage.jwtToken) {
// Set auth token header auth
const token = localStorage.jwtToken;
setAuthToken(token);
// Decode token and get user info and exp
const decoded = jwt_decode(token);
// Set user and isAuthenticated
store.dispatch(setCurrentUser(decoded));
// Check for expired token
const currentTime = Date.now() / 1000; // to get in milliseconds
if (decoded.exp < currentTime) {
// Logout user
store.dispatch(logoutUser());
// Redirect to login
window.location.href = "./login";
}
}
return ({
component: CoreLayout(store),
childRoutes: [{
path: '/login',
component: Login
},
{
path: '/',
component: Landing
},
{
path: '/register',
component: Register
},
{
path: '/dashboard',
component: MainLayout(store),
indexRoute: SearchPage(store),
childRoutes: [
SettingsPage(store),
StatisticsPage(store)
]
}
]
})
}
export default createRoutes