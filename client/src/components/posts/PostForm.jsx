import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addPost} from '../../actions/postActions';
import {Button, Form, Segment, Message, TextArea} from "semantic-ui-react";
import classnames from "classnames";

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: {}
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({errors: newProps.errors});
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {user} = this.props.auth;

        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        };

        this.props.addPost(newPost);
        this.setState({text: ''});
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        const {errors} = this.state;

        return (
            <Form inverted onSubmit={this.onSubmit} className={classnames({'error': errors.text})}>

                <TextArea placeholder="Text" name="text" value={this.state.text} onChange={this.onChange}
                          className={classnames({'error': errors.text})}/>

                <Segment basic size="tiny" className="form__description">
                    Say Something...
                </Segment>

                <Message error content={errors.text}/>
                <Button type='submit' size='large' color='orange'>Submit</Button>
            </Form>

        );
    }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {addPost})(PostForm);
