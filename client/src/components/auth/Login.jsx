import React, {Component} from 'react';
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
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };
    onSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(user);
    };

    render() {
        const classes = `main-container register-container`;
        return (
            <Container className={classes}>
                <Segment basic>
                    <Header as='h1' textAlign='center' className="header__custom">Login</Header>
                    <Header as='h3' textAlign='center' className="header__custom">Sign in to your React Network
                        account</Header>
                </Segment>
                <Form inverted onSubmit={this.onSubmit} error>
                    <Form.Field error>
                        <label>Email</label>
                        <input type="email" name="email" placeholder='Last Name' value={this.state.email}
                               onChange={this.onChange}/>
                        <Message
                            error
                            header='Action Forbidden'
                            content='You can only sign up for an account once with a given e-mail address.'
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type='password' name="password" placeholder='Password' value={this.state.password}
                               onChange={this.onChange}/>
                    </Form.Field>

                    <Button type='submit' fluid size='large' color='orange'>Submit</Button>
                </Form>
            </Container>
        );
    }
}

export default Login;