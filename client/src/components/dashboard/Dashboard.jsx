import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profileActions';
import {Button, Container, Header, Loader, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Dashboard extends Component {

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    render() {
        const classes = `main-container dashboard-container`;

        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Loader size='big' active inline='centered'/>
        } else {
            // Check if logged in user has profile data
            if (Object.keys(profile).length > 0) {
                dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>;
            } else {
                // User is logged in but has no profile
                dashboardContent = (
                    <Segment basic>
                        <Header as='h1' textAlign='center' inverted>Welcome {user.name}</Header>
                        <Header as='h3' textAlign='center' inverted>You have not yet setup a profile, please add some info</Header>
                        <Button as={Link} to='/create-profile' size='large' color='orange'
                                className="home__button">
                            Create Profile
                        </Button>
                    </Segment>
                );
            }
        }

            return (
                <Container className={classes}>
                    {dashboardContent}
                </Container>
            );
        }
    }

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);