import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProfileItem from './ProfileItem';
import {getProfiles} from '../../actions/profileActions';
import {Container, Header, Loader, Segment} from 'semantic-ui-react';

class Profiles extends Component {
    componentDidMount() {
        this.props.getProfiles();
    }

    render() {
        const {profiles, loading} = this.props.profile;
        const classes = `main-container profiles-container`;
        let profileItems;

        if (profiles === null || loading) {
            profileItems = <Loader size='big' active inline='centered'/>;
        } else {
            if (profiles.length > 0) {
                profileItems =
                    profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile}/>
                ))
                ;
            } else {
                profileItems = <h4>No profiles found...</h4>;
            }
        }

        return (
            <Container className={classes}>

                <Header as='h1' textAlign='center' inverted>React Developer Profiles</Header>

                <Header as='h4' textAlign='center' inverted> Browse and connect with other people all over the world</Header>

                {profileItems}

            </Container>
        );
    }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(Profiles);