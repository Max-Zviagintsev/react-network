import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import {Feed} from 'semantic-ui-react'

class CommentFeed extends Component {
    render() {
        const {comments, postId} = this.props;

        return (
            <Feed>
                {comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={postId}/>
                ))}
            </Feed>
        );
    }
}

CommentFeed.propTypes = {
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired
};

export default CommentFeed;
