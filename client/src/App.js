import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import PrivateRoute from './components/common/PrivateRoute';

import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from "./actions/authActions";
import {logoutUser} from "./actions/authActions";
import {clearCurrentProfile} from "./actions/profileActions";

import NavBar from './components/layout/Navbar';
import Footer from "./components/layout/Footer";
import Home from "./components/layout/Home";

import './App.css';
import background from "./img/node.png"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";

// Check for token
if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Clear current profile
        store.dispatch(clearCurrentProfile());

        // Redirect to login
        window.location.href = '/login';
    }
}

class App extends Component {

    render() {
        const appStyle = {
            backgroundImage: `url(${background})`,
        };
        return (
            <Provider store={store}>
                <Router>
                    <div style={appStyle} className="main-wrapper">
                        <NavBar/>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>
                        <Switch> <PrivateRoute exact path="/dashboard" component={Dashboard}/> </Switch>
                        <Switch> <PrivateRoute exact path="/create-profile" component={CreateProfile}/> </Switch>
                        <Switch> <PrivateRoute exact path="/edit-profile" component={EditProfile}/> </Switch>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;