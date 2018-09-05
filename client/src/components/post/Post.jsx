import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import {Button, Container, Loader, Divider, Segment} from 'semantic-ui-react';
import {getPost} from '../../actions/postActions';

class Post extends Component {
    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
    }

    render() {
        const classes = `main-container posts-container`;
        const {post, loading} = this.props.post;
        let postContent;

        if (post === null || loading || Object.keys(post).length === 0) {
            postContent = <Loader size='big' active inline='centered'/>;

        } else {
            postContent = (
                <Segment basic>
                    <PostItem post={post} showActions={false}/>
                    <CommentForm postId={post._id}/>
                    <CommentFeed postId={post._id} comments={post.comments}/>
                </Segment>
            );
        }

        return (
            <Container className={classes}>
                <Segment basic>
                    <Button as={Link} to='/feed' basic size='medium' color='blue' floated='left'>Back</Button>
                </Segment>
                <Divider hidden/>
                {postContent}
            </Container>
        );
    }
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getPost})(Post);
