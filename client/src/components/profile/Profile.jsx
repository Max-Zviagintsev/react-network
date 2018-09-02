import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
// import ProfileGithub from './ProfileGithub';
import {Button, Container, Loader, Segment, Divider} from 'semantic-ui-react';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile === null && this.props.profile.loading) {
            this.props.history.push('/not-found');
        }
    }

    render() {
        const { profile, loading } = this.props.profile;
        const classes = `main-container single-profile-container`;
        let profileContent;

        if (profile === null || loading) {
            profileContent = <Loader size='big' active inline='centered'/>;
        } else {
            profileContent = (
                <Segment basic>
                    <Segment basic>
                <Button as={Link} to='/profiles' basic size='medium' color='blue' floated='left'>Back</Button>
                    </Segment>
                    <Divider hidden />
                    <ProfileHeader profile={profile} />
                    <ProfileAbout profile={profile} />
                    <ProfileCreds
                        education={profile.education}
                        experience={profile.experience}
                    />
                    {/*{profile.githubusername ? (*/}
                        {/*<ProfileGithub username={profile.githubusername} />*/}
                    {/*) : null}*/}
                </Segment>
            );
        }

        return (
            <Container className={classes}>{profileContent}</Container>
        );
    }
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);