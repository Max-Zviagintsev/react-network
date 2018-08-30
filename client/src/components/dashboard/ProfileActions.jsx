import React from 'react';
import { Link } from 'react-router-dom';
import {Button, Segment, Icon} from "semantic-ui-react";

const ProfileActions = () => {
    return (
        <Segment basic>
            <Button.Group>
                <Button as={Link} to='/edit-profile' size='large' color='blue'
                        className="home__button">
                    <Icon name='user circle' />
                    Edit Profile
                </Button>

                <Button as={Link} to='/add-experience' size='large' color='blue'
                        className="home__button">
                    <Icon name='briefcase' />
                    Add Experience
                </Button>

                <Button as={Link} to='/add-education' size='large' color='blue'
                        className="home__button">
                    <Icon name='university' />
                    Add Education
                </Button>

            </Button.Group>
        </Segment>
    );
};

export default ProfileActions;
