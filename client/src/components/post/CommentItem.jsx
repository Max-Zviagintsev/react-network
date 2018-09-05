import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteComment} from '../../actions/postActions';
import {Feed, Button, Divider} from 'semantic-ui-react'

class CommentItem extends Component {
    onDeleteClick = (postId, commentId) => {
        this.props.deleteComment(postId, commentId);
    };

    render() {
        const {comment, postId, auth} = this.props;

        return (
            <Feed.Event>

                <Feed.Label>
                    <img src={comment.avatar}/>
                </Feed.Label>

                <Feed.Content>
                    <Feed.Summary>
                        <Feed.User>{comment.name}</Feed.User>
                    </Feed.Summary>

                    <Feed.Extra text className="color-white">
                        {comment.text}
                    </Feed.Extra>

                    <Divider hidden/>
                    
                    {comment.user === auth.user.id ? (
                        < Button
                            onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                            color="red"
                            size="mini"
                        >
                            Delete
                        </Button>

                    ) : null}
                </Feed.Content>
            </Feed.Event>

        );
    }
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deleteComment})(CommentItem);
