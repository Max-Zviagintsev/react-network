import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import {Button, Card, Divider, Image, List, Icon} from 'semantic-ui-react';

class ProfileItem extends Component {
    render() {
        const {profile} = this.props;

        return (
            <Card className="profile-card">
                <Image src={profile.user.avatar} alt="avatar" size="small"/>
                <Card.Content className="profile-content">

                    <Card.Header className="profile-content">{profile.user.name}</Card.Header>
                    <Card.Meta className="profile-content">
                        {profile.status}{' '}
                        {isEmpty(profile.company) ? null : (
                            <span>at {profile.company}</span>
                        )}
                    </Card.Meta>
                    <Card.Meta className="profile-content">
                        {isEmpty(profile.location) ? null : (
                            <span>{profile.location}</span>
                        )}
                    </Card.Meta>
                    <Divider hidden/>
                    <Button as={Link} to={`/profile/${profile.handle}`} size='medium' color='blue'>View
                        Profile</Button>
                </Card.Content>
                <Card.Content className="profile-content">
                    <Card.Header className="profile-content">Skill Set</Card.Header>
                    <List inverted>
                        {profile.skills.slice(0, 4).map((skill, index) => (
                            <List.Item key={index} className="single-profile-skill">
                                <Icon inverted color='orange' name='check circle outline '/>{skill}
                            </List.Item>
                        ))}
                    </List>
                </Card.Content>
            </Card>
        );
    }
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItem;