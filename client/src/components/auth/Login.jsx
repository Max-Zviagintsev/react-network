import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {loginUser} from "../../actions/authActions";
import {Button, Container, Form, Header, Segment, Message} from "semantic-ui-react";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };
    onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);
    };

    render() {
        const {errors} = this.state;
        const classes = `main-container register-container`;

        return (
            <Container className={classes}>
                <Segment basic>
                    <Header as='h1' textAlign='center' className="header__custom">Login</Header>
                    <Header as='h3' textAlign='center' className="header__custom">Sign in to your React Network
                        account</Header>
                </Segment>

                <Form inverted onSubmit={this.onSubmit}
                      className={classnames({'error': errors.name || errors.email || errors.password || errors.password2})}>

                    <Form.Field className={classnames({'error': errors.email})}>
                        <label>Email</label>
                        <input type="email" name="email" placeholder='Last Name' value={this.state.email}
                               onChange={this.onChange}/>
                        <Message
                            error
                            content={errors.email}/>
                    </Form.Field>

                    <Form.Field className={classnames({'error': errors.password})}>
                        <label>Password</label>
                        <input type='password' name="password" placeholder='Password' value={this.state.password}
                               onChange={this.onChange}/>
                        <Message
                            error
                            content={errors.password}/>
                    </Form.Field>

                    <Button type='submit' fluid size='large' color='orange'>Submit</Button>

                </Form>
            </Container>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);