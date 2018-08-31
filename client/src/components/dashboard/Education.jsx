import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {Button, Container, Header, Segment} from 'semantic-ui-react';

import {deleteEducation} from '../../actions/profileActions';

class Education extends Component {
    onDeleteClick = (id) => {
        this.props.deleteEducation(id);
    }

    render() {
        const education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                    {edu.to === null ? (
                        ' Now'
                    ) : (
                        <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                    )}
                </td>
                <td>
                    <Button
                        onClick={this.onDeleteClick}
                        className="btn btn-danger"
                        color="blue"
                        size="tiny"
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        ));
        return (
            <Container textAlign='center'>
                <Header as='h2' textAlign='center' inverted>Education Credentials</Header>
                <Segment basic padded='very'>
                    <table className="exp-table">
                        <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                            <th/>
                        </tr>
                        {education}
                        </thead>
                    </table>
                </Segment>
            </Container>
        );
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
};

export default connect(null, {deleteEducation})((Education));