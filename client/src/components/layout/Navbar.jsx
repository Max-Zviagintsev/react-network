import React, {Component} from "react";
import {Container, Icon, Image, Menu, Sidebar, Responsive} from "semantic-ui-react";
import logo from "../../img/logo.png";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from "../../actions/authActions";
import {clearCurrentProfile} from '../../actions/profileActions';


class NavBar extends Component {
    state = {
        visible: false
    };

    handlePusher = () => {
        const {visible} = this.state;

        if (visible) this.setState({visible: false});
    };

    handleToggle = () => this.setState({visible: !this.state.visible});

    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    };

    render() {
        const {children} = this.props;
        const {visible} = this.state;
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <Menu.Menu position="right">
                <Menu.Item>
                    <Image src={user.avatar} alt={user.name} title="You must have a Gravatar connected to your email to display an image" avatar/>
                </Menu.Item>
                <Menu.Item as={Link} name='dashboard' to='dashboard'>
                    Dashboard
                </Menu.Item>
                <Menu.Item name='logout' onClick={this.onLogoutClick}>
                    Logout
                </Menu.Item>
            </Menu.Menu>
        );

        const guestLinks = (
            <Menu.Menu position="right">
                <Menu.Item as={Link} name='login' to='login'>
                    Login
                </Menu.Item>

                <Menu.Item as={Link} name='register' to='register'>
                    Register
                </Menu.Item>
            </Menu.Menu>
        );

        const NavBarMobile = ({children, onPusherClick, onToggle, visible}) => (
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation="overlay"
                    icon="labeled"
                    inverted
                    vertical
                    visible={visible}
                >
                    <Menu.Item as={Link} name='devs' to='/profiles'>
                        User
                    </Menu.Item>

                    {isAuthenticated ? authLinks : guestLinks}

                    {children}
                </Sidebar>
                <Sidebar.Pusher

                    onClick={onPusherClick}
                    style={{minHeight: "100vh"}}
                >
                    <Menu fixed="top" inverted>
                        <Menu.Item as={Link} name='home' to='/'>
                            <Image size="mini" src={logo}/>
                        </Menu.Item>
                        <Menu.Item onClick={onToggle}>
                            <Icon name="sidebar"/>
                        </Menu.Item>
                    </Menu>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );

        const NavBarDesktop = () => (
                <Menu fixed="top" className="custom-navbar">
                    <Menu.Item as={Link} name='home' to='/'>
                        <Image size="mini" src={logo}/>
                    </Menu.Item>

                    <Menu.Item as={Link} name='devs' to='/profiles'>
                        React Developers
                    </Menu.Item>
                    {isAuthenticated ? authLinks : guestLinks}
                </Menu>
            )
        ;

        const NavBarChildren = ({children}) => (
            <Container>{children}</Container>
        );

        return (
            <React.Fragment>
                <Responsive {...Responsive.onlyMobile}>
                    <NavBarMobile
                        onPusherClick={this.handlePusher}
                        onToggle={this.handleToggle}
                        visible={visible}
                    >
                        <NavBarChildren>{children}</NavBarChildren>
                    </NavBarMobile>
                </Responsive>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <NavBarDesktop/>
                    <NavBarChildren>{children}</NavBarChildren>
                </Responsive>
            </React.Fragment>
        );
    }
}

NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, clearCurrentProfile})(NavBar);