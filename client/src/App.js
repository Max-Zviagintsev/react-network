import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from "./actions/authActions";
import {logoutUser} from "./actions/authActions";

import NavBar from './components/layout/Navbar';
import Footer from "./components/layout/Footer";
import Home from "./components/layout/Home";

import './App.css';
import background from "./img/node.png"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

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
        // TODO: Clear current Profile

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
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;