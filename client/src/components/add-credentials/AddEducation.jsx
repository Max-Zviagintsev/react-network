import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Container, Form, Header, Segment, Message, TextArea} from "semantic-ui-react";
import {addEducation} from '../../actions/profileActions';
import classnames from "classnames";

class AddEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        this.props.addEducation(eduData, this.props.history);
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onCheck = (e) => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
    };

    render() {
        const {errors} = this.state;
        const classes = `main-container register-container`;
        return (

            <Container className={classes}>
                <Segment basic>
                    <Button as={Link} to='/dashboard' basic size='medium' color='blue' floated='left'>Back</Button>
                </Segment>
                <Header as='h1' textAlign='center' className="header__custom">Add Your Education</Header>
                <Header as='h3' textAlign='center' className="header__custom">Add any school, university, etc that you have attended</Header>

                <Form inverted onSubmit={this.onSubmit}
                      className={classnames({
                          'error': errors.school || errors.degree || errors.location || errors.from
                              || errors.to || errors.description
                      })}>

                    <Form.Field required className={classnames({'error': errors.school})}>
                        <label>School</label>
                        <input type="text" name="school" placeholder='School' value={this.state.school}
                               onChange={this.onChange}/>

                        <Message error content={errors.school}/>
                    </Form.Field>

                    <Form.Field required className={classnames({'error': errors.degree})}>
                        <label>Degree or Certification</label>
                        <input type="text" name="degree" placeholder='Degree or Certification' value={this.state.degree}
                               onChange={this.onChange}/>

                        <Message error content={errors.degree}/>
                    </Form.Field>

                    <Form.Field className={classnames({'error': errors.fieldofstudy})}>
                        <label>Field of Study</label>
                        <input type="text" name="fieldofstudy" placeholder='Field of Study' value={this.state.fieldofstudy}
                               onChange={this.onChange}/>

                        <Message error content={errors.fieldofstudy}/>
                    </Form.Field>

                    <Form.Field className={classnames({'error': errors.from})}>
                        <label>From date:</label>
                        <input type="date" name="from" placeholder='From' value={this.state.from}
                               onChange={this.onChange}/>

                        <Message error content={errors.from}/>
                    </Form.Field>

                    <Form.Field className={classnames({'error': errors.to})}>
                        <label>To date:</label>
                        <input type="date" name="to" placeholder='To' value={this.state.to}
                               onChange={this.onChange} disabled={this.state.disabled ? 'disabled' : ''}/>

                        <Message error content={errors.to}/>
                    </Form.Field>

                    <Form.Field>
                        <label>Currently attending:</label>
                        <input type="checkbox" name="current" className="form-check-input"
                               value={this.state.current}
                               checked={this.state.current}
                               onChange={this.onCheck}
                               id="current"/>
                    </Form.Field>

                    <TextArea placeholder="Program Description" name="description" value={this.state.description}
                              onChange={this.onChange}
                              className={classnames({'error': errors.description})}/>

                    <Segment basic size="tiny" className="form__description">
                        Tell us about the the program you were in
                    </Segment>

                    <Message error content={errors.description}/>

                    <Button type='submit' fluid size='large' color='orange'>Add</Button>
                </Form>
            </Container>
        );
    }
}


AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {addEducation})(
    withRouter(AddEducation)
);