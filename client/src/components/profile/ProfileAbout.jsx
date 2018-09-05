import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import {Card, List, Icon} from 'semantic-ui-react';

class ProfileAbout extends Component {
    render() {
        const {profile} = this.props;

        // Get first name
        const firstName = profile.user.name.trim().split(' ')[0];

        // Skill List
        const skills = profile.skills.map((skill, index) => (
            <List.Item key={index} className="single-profile-skill">
                <Icon inverted color='orange' name='check' />{skill}
            </List.Item>
        ));

        return (
            <Card className="single-profile-card" fluid>
                <Card.Content className="single-profile-card-content">
                    <Card.Header className="color-white">{firstName}</Card.Header>
                    <Card.Description className="color-white">
                        {isEmpty(profile.bio) ? (
                            <span>{firstName} does not have a bio</span>
                        ) : (
                            <span>{profile.bio}</span>
                        )}
                    </Card.Description>
                </Card.Content>
                <Card.Content className="single-profile-card-content">
                    <Card.Header className="color-orange--centered">Skill Set</Card.Header>
                    <List horizontal inverted>{skills}</List>
                </Card.Content>
            </Card>
        );
    }
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileAbout;
