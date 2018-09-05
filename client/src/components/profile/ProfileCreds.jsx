import React, {Component} from 'react';
import Moment from 'react-moment';
import {Card, List} from 'semantic-ui-react';

class ProfileCreds extends Component {
    render() {
        const {experience, education} = this.props;

        const expItems = experience.map(exp => (
            <List.Item key={exp._id}>
                <h4>{exp.company}</h4>
                <p>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                    {exp.to === null ? (
                        ' Now'
                    ) : (
                        <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                    )}
                </p>
                <p>
                    <strong>Position:</strong> {exp.title}
                </p>
                <p>
                    {exp.location === '' ? null : (
                        <span>
              <strong>Location: </strong> {exp.location}
            </span>
                    )}
                </p>
                <p>
                    {exp.description === '' ? null : (
                        <span>
              <strong>Description: </strong> {exp.description}
            </span>
                    )}
                </p>
            </List.Item>
        ));

        const eduItems = education.map(edu => (
            <List.Item key={edu._id} className="list-group-item">
                <h4>{edu.school}</h4>
                <p>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                    {edu.to === null ? (
                        ' Now'
                    ) : (
                        <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                    )}
                </p>
                <p>
                    <strong>Degree:</strong> {edu.degree}
                </p>
                <p>
                    <strong>Field Of Study:</strong> {edu.fieldofstudy}
                </p>
                <p>
                    {edu.description === '' ? null : (
                        <span>
              <strong>Description: </strong> {edu.description}
            </span>
                    )}
                </p>
            </List.Item>
        ));
        return (
            <Card.Group itemsPerRow={2}>

                <Card className="single-profile-card--left-aligned">
                    <Card.Content className="single-profile-card-content">
                        <Card.Header className="color-orange--centered">Experience</Card.Header>
                        <Card.Description className="color-white">
                            {expItems.length > 0 ? (
                                <List inverted>{expItems}</List>
                            ) : (
                                <p className="text-center">No Experience Listed</p>
                            )}
                        </Card.Description>
                    </Card.Content>
                </Card>
                <Card className="single-profile-card--left-aligned">
                    <Card.Content className="single-profile-card-content">
                        <Card.Header className="color-orange--centered">Education</Card.Header>
                        <Card.Description className="color-white">
                            {eduItems.length > 0 ? (
                                <List inverted>{eduItems}</List>
                            ) : (
                                <p className="text-center">No Education Listed</p>
                            )}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
        );
    }
}

export default ProfileCreds;
