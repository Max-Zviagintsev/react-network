import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {Button, Form, Container, Header, Segment, Message} from 'semantic-ui-react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };
    onSubmit = (e) => {
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
        const classes = `main-container register-container`;
        const {errors} = this.state;

        return (
            <Container className={classes}>
                <Segment basic>
                    <Header as='h1' textAlign='center' className="header__custom">Register</Header>
                    <Header as='h3' textAlign='center' className="header__custom">Create your React Network
                        account</Header>
                </Segment>

                <Form inverted onSubmit={this.onSubmit}
                      className={classnames({'error': errors.name || errors.email || errors.password || errors.password2})}>

                    <Form.Field className={classnames({'error': errors.name})}>
                        <label>Name</label>
                        <input type="text" name="name" placeholder='Name' value={this.state.name}
                               onChange={this.onChange}/>
                        <Message
                            error
                            content={errors.name}/>
                    </Form.Field>

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

                    <Form.Field className={classnames({'error': errors.password2})}>
                        <label>Confirm Password</label>
                        <input type='password' name="password2" placeholder='Confirm Password'
                               value={this.state.password2} onChange={this.onChange}/>

                        <Message
                            error
                            content={errors.password2}/>
                    </Form.Field>
                    <Button type='submit' fluid size='large' color='orange'>Submit</Button>
                </Form>
            </Container>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));