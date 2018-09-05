import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Card, Form, Message, TextArea, Divider} from "semantic-ui-react";
import {addComment} from '../../actions/postActions';
import classnames from "classnames";

class CommentForm extends Component {
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
        const {postId} = this.props;

        const newComment = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        };

        this.props.addComment(postId, newComment);
        this.setState({text: ''});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {errors} = this.state;

        return (
            <Card className="comment-card" fluid>
                <Card.Content className="comment-card">

                    <Card.Header className="color-white">Make a comment...</Card.Header>
                    <Divider hidden/>
                    <Form inverted onSubmit={this.onSubmit} className={classnames({'error': errors.text})}>


                        <TextArea placeholder="Text" name="text" value={this.state.text} onChange={this.onChange}
                          className={classnames({'error': errors.text})}/>

                        <Message error content={errors.text}/>
                        <Divider hidden/>
                        <Button type='submit' size='large' color='orange'>Submit</Button>
                    </Form>
                </Card.Content>
            </Card>
        );
    }
}

CommentForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {addComment})(CommentForm);
