import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PostForm from './PostForm';
// import PostFeed from './PostFeed';
import {Container, Loader} from 'semantic-ui-react';
import {getPosts} from '../../actions/postActions';

class Posts extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const {posts, loading} = this.props.post;
        const classes = `main-container posts-container`;
        let postContent;

        if (posts === null || loading) {
            postContent = <Loader size='big' active inline='centered'/>;
        }
        // else {
        //     postContent = <PostFeed posts={posts}/>;
        // }

        return (
            <Container text className={classes}>
                <PostForm/>
                {postContent}
            </Container>
        );
    }
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getPosts})(Posts);