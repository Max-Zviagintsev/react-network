import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {deletePost, addLike, removeLike} from '../../actions/postActions';
import {Card, Feed, Image, Button, Divider, Icon} from 'semantic-ui-react'

class PostItem extends Component {
    onDeleteClick(id) {
        this.props.deletePost(id);
    }

    onLikeClick(id) {
        this.props.addLike(id);
    }

    onUnlikeClick(id) {
        this.props.removeLike(id);
    }

    findUserLike(likes) {
        const {auth} = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const {post, auth, showActions} = this.props;

        return (
            <Card className="single-profile-card" fluid>
                <Card.Content>
                    <Feed>
                        <Feed.Event>
                            <div className="postitem__wrapper">
                                <div className="postitem__level">
                                    <Image src={post.avatar} size='small' circular/>
                                </div>
                                <div className="postitem__level">
                                    <Feed.Extra text>{post.name}</Feed.Extra>
                                </div>
                            </div>


                            <Feed.Content>
                                <Feed.Extra className="color-white" text>{post.text}</Feed.Extra>
                                <Divider hidden/>
                                <Feed.Like>
                                    <Icon color="red" name='like' />
                                    {post.likes.length}
                                </Feed.Like>
                                <Divider hidden/>
                                {showActions ? (
                                    <Feed.Content>
                                        <Button

                                            onClick={this.onLikeClick.bind(this, post._id)}
                                            type="button"
                                            icon='thumbs up'
                                            size='tiny'
                                        />


                                        <Button

                                            onClick={this.onUnlikeClick.bind(this, post._id)}
                                            type="button"
                                            icon='thumbs down'

                                            size='tiny'
                                        />



                                        <Button as={Link} to={`/post/${post._id}`} size='tiny' color='blue'
                                                floated='left'>Comments</Button>



                                        {post.user === auth.user.id ? (
                                            <Button
                                                content='Delete'
                                                onClick={this.onDeleteClick.bind(this, post._id)}
                                                type="button"
                                                color="red"
                                                size='tiny'
                                            />

                                        ) : null}
                                    </Feed.Content>
                                ) : null}
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </Card.Content>
            </Card>
        );
    }
}

PostItem.defaultProps = {
    showActions: true
};

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem);
