import React, {Component} from 'react';
import isEmpty from '../../validation/is-empty';
import {Button, Card, Image, Icon, Divider} from 'semantic-ui-react';

class ProfileHeader extends Component {
    render() {
        const {profile} = this.props;

        return (
            <Card className="single-profile-card" fluid>
                <Card.Content className="single-profile-card-content">
                    <Image src={profile.user.avatar} size='medium' circular/>
                    <Divider hidden/>
                    <Card.Header className="color-orange--centered">{profile.user.name}</Card.Header>
                    <Card.Meta className="color-white">{profile.status}{' '}{isEmpty(profile.company) ? null : (
                        <span>at {profile.company}</span>)}</Card.Meta>
                    {isEmpty(profile.location) ? null : <Card.Description className="color-white">{profile.location}</Card.Description>}
                </Card.Content>
                <Card.Content>
                    {isEmpty(profile.website) ? null :
                        (<Button className="text-align-center" href={profile.website} target="_blank" color='blue'><Icon name='globe'/> </Button>)}

                    {isEmpty(profile.social && profile.social.facebook) ? null :
                        (<Button className="text-align-center" href={profile.social.facebook} target="_blank" color='facebook'><Icon name='facebook'/>
                        </Button>)}

                    {isEmpty(profile.social && profile.social.twitter) ? null :
                        (<Button className="text-align-center" href={profile.social.twitter} target="_blank" color='twitter'><Icon name='twitter'/>
                        </Button>)}

                    {isEmpty(profile.social && profile.social.linkedin) ? null :
                        (<Button className="text-align-center" href={profile.social.linkedin} target="_blank" color='linkedin'><Icon name='linkedin'/>
                        </Button>)}

                    {isEmpty(profile.social && profile.social.youtube) ? null :
                        (<Button className="text-align-center" href={profile.social.youtube} target="_blank" color='youtube'><Icon name='youtube'/>
                        </Button>)}

                    {isEmpty(profile.social && profile.social.instagram) ? null :
                        (<Button className="text-align-center" href={profile.social.instagram} target="_blank" color='instagram'><Icon name='instagram'/>
                        </Button>)}
                </Card.Content>
            </Card>
        );
    }
}

export default ProfileHeader;
