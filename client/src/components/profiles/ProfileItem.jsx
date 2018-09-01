import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import {Button, Card, Divider, Image} from 'semantic-ui-react';

class ProfileItem extends Component {
    render() {
        const {profile} = this.props;

        return (
            <Card className="profile-card">
                <Image src={profile.user.avatar} alt="avatar" size="small"/>
                <Card.Content className="profile-content">

                    <Card.Header>{profile.user.name}</Card.Header>
                    <Card.Meta>
                        {profile.status}{' '}
                        {isEmpty(profile.company) ? null : (
                            <span>at {profile.company}</span>
                        )}
                    </Card.Meta>
                    <Card.Meta>
                        {isEmpty(profile.location) ? null : (
                            <span>{profile.location}</span>
                        )}
                    </Card.Meta>
                    <Divider hidden/>
                    <Button as={Link} to={`/profile/${profile.handle}`} basic size='medium' color='blue'>View
                        Profile</Button>
                </Card.Content>
                <Card.Content className="profile-content">
                    <Card.Header>Skill Set</Card.Header>
                    <ul className="list-group">
                        {profile.skills.slice(0, 4).map((skill, index) => (
                            <li key={index} className="list-group-item">
                                <i className="fa fa-check pr-1"/>
                                {skill}
                            </li>
                        ))}
                    </ul>
                </Card.Content>
            </Card>
        );
    }
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItem;