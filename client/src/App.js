import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import NavBar from './components/layout/Navbar';
import Footer from "./components/layout/Footer";
import Home from "./components/layout/Home";

import './App.css';
import background from "./img/node.png"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

class App extends Component {

    render() {
        const appStyle = {
            backgroundImage: `url(${background})`,
        };
        return (
            <Router>
                <div style={appStyle} className="main-wrapper">
                    <NavBar/>
                    <Route exact path="/" component={Home}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;