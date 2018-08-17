import React, {Component} from "react";
import {Container, Icon, Image, Menu, Sidebar, Responsive} from "semantic-ui-react";
import logo from "../../img/logo.png";
import {Link} from 'react-router-dom';

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
            <Menu.Item as={Link} name='user' to='user'>
                User
            </Menu.Item>

            <Menu.Item as={Link} name='login' to='login'>
                Login
            </Menu.Item>

            <Menu.Item as={Link} name='register' to='register'>
                Register
            </Menu.Item>
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

        <Menu.Item as={Link} name='user' to='user'>
            User
        </Menu.Item>

        <Menu.Menu position="right">
            <Menu.Item as={Link} name='login' to='login'>
                Login
            </Menu.Item>

            <Menu.Item as={Link} name='register' to='register'>
                Register
            </Menu.Item>
        </Menu.Menu>
    </Menu>
);

const NavBarChildren = ({children}) => (
    <Container>{children}</Container>
);

class NavBar extends Component {
    state = {
        visible: false
    };

    handlePusher = () => {
        const {visible} = this.state;

        if (visible) this.setState({visible: false});
    };

    handleToggle = () => this.setState({visible: !this.state.visible});

    render() {
        const {children} = this.props;
        const {visible} = this.state;

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

export default NavBar;