import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

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
        const leftItems = [
            {as: "a", content: "Users", key: "users"}
        ];
        const rightItems = [
            {as: "a", content: "Login", key: "login"},
            {as: "a", content: "Register", key: "register"}
        ];

        return (
            <Router>
                <div style={appStyle} className="main-wrapper">
                    <NavBar leftItems={leftItems} rightItems={rightItems}/>
                    <Route exact path="/" component={Home}/>
                    <Container>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>
                    </Container>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;