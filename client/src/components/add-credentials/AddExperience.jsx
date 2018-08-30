import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Container, Form, Header, Segment, Message, TextArea} from "semantic-ui-react";
import {addExperience} from '../../actions/profileActions';
import classnames from "classnames";

class AddExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            title: '',
            location: '',
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

        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        this.props.addExperience(expData, this.props.history);
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
                <Header as='h1' textAlign='center' className="header__custom">Add Your Experience</Header>
                <Header as='h3' textAlign='center' className="header__custom">Add any developer/programming positions
                    that you have had in the past</Header>

                <Form inverted onSubmit={this.onSubmit}
                      className={classnames({
                          'error': errors.company || errors.title || errors.location || errors.from
                              || errors.to || errors.description
                      })}>

                    <Form.Field required className={classnames({'error': errors.company})}>
                        <label>Company</label>
                        <input type="text" name="company" placeholder='Company' value={this.state.company}
                               onChange={this.onChange}/>

                        <Message error content={errors.company}/>
                    </Form.Field>

                    <Form.Field required className={classnames({'error': errors.title})}>
                        <label>Job Title</label>
                        <input type="text" name="title" placeholder='Job Title' value={this.state.title}
                               onChange={this.onChange}/>

                        <Message error content={errors.title}/>
                    </Form.Field>

                    <Form.Field className={classnames({'error': errors.location})}>
                        <label>Location</label>
                        <input type="text" name="location" placeholder='Location' value={this.state.location}
                               onChange={this.onChange}/>

                        <Message error content={errors.location}/>
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
                        <label>Current Job:</label>
                        <input type="checkbox" name="current" className="form-check-input"
                               value={this.state.current}
                               checked={this.state.current}
                               onChange={this.onCheck}
                               id="current"/>
                    </Form.Field>

                    <TextArea placeholder="Job Description" name="description" value={this.state.description}
                              onChange={this.onChange}
                              className={classnames({'error': errors.description})}/>

                    <Segment basic size="tiny" className="form__description">
                        Tell us about the the position
                    </Segment>

                    <Message error content={errors.description}/>

                    <Button type='submit' fluid size='large' color='orange'>Add</Button>
                </Form>
            </Container>
        );
    }
}


AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {addExperience})(
    withRouter(AddExperience)
);