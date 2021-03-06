import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {Button, Container, Header, Segment} from 'semantic-ui-react';

import {deleteExperience} from '../../actions/profileActions';

class Experience extends Component {
    onDeleteClick = (id) => {
        this.props.deleteExperience(id);
    }

    render() {
        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                    {exp.to === null ? (
                        ' Now'
                    ) : (
                        <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                    )}
                </td>
                <td>
                    <Button
                        onClick={this.onDeleteClick}
                        color="red"
                        size="tiny"
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        ));
        return (
            <Container textAlign='center'>
                <Header as='h2' textAlign='center' inverted>Experience</Header>
                <Segment basic padded='very'>
                <table className="exp-table">
                    <thead>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th/>
                    </tr>
                    {experience}
                    </thead>
                </table>
                </Segment>
            </Container>
        );
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
};

export default connect(null, {deleteExperience})((Experience));