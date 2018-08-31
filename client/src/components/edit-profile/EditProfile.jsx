import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {Link, withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import {createProfile, getCurrentProfile} from '../../actions/profileActions';
import {Button, Container, Form, Header, Segment, Message, TextArea, Input, Divider} from "semantic-ui-react";
import classnames from "classnames";
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            // Bring skills array back to CSV
            const skillsCSV = profile.skills.join(',');

            // If profile field doesnt exist, make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername)
                ? profile.githubusername
                : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter)
                ? profile.social.twitter
                : '';
            profile.facebook = !isEmpty(profile.social.facebook)
                ? profile.social.facebook
                : '';
            profile.linkedin = !isEmpty(profile.social.linkedin)
                ? profile.social.linkedin
                : '';
            profile.youtube = !isEmpty(profile.social.youtube)
                ? profile.social.youtube
                : '';
            profile.instagram = !isEmpty(profile.social.instagram)
                ? profile.social.instagram
                : '';

            // Set component fields state
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram
            });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        };

        this.props.createProfile(profileData, this.props.history);
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleChange = (e) => this.setState({status: e.target.value});

    render() {
        const classes = `main-container register-container`;
        const {errors, displaySocialInputs} = this.state;
        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <Segment basic className="social__wrapper">
                    <Button as={Link} to='/dashboard' basic size='medium' color='blue' floated='left'>Back</Button>
                    <Input icon='twitter'
                           iconPosition='left'
                           placeholder='Twitter Profile URL'
                           name="twitter"
                           value={this.state.twitter}
                           onChange={this.onChange}
                           error={errors.twitter}
                           fluid
                    />
                    <Divider/>
                    <Input
                        placeholder="Facebook Page URL"
                        name="facebook"
                        icon="facebook"
                        iconPosition='left'
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                        fluid
                    />
                    <Divider/>
                    <Input
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="linkedin"
                        iconPosition='left'
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                        fluid
                    />
                    <Divider/>
                    <Input
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        icon="youtube"
                        iconPosition='left'
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                        fluid
                    />
                    <Divider/>
                    <Input
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="instagram"
                        iconPosition='left'
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                        fluid
                    />
                </Segment>
            )
        }
        // Select options for status

        return (
            <Container className={classes}>

                <Header as='h1' textAlign='center' className="header__custom">Edit profile</Header>

                <Form inverted onSubmit={this.onSubmit}
                      className={classnames({
                          'error': errors.handle || errors.website || errors.location || errors.skills
                              || errors.githubusername || errors.bio || errors.facebook || errors.twitter || errors.linkedin
                              || errors.youtube || errors.instagram
                      })}>

                    <Form.Field required className={classnames({'error': errors.handle})}>
                        <label>Profile name</label>
                        <input type="text" name="handle" placeholder='Profile name' value={this.state.handle}
                               onChange={this.onChange}/>

                        <Segment basic size="tiny" className="form__description">
                            A unique handle for your profile URL. Your full name, company name, nickname.
                        </Segment>

                        <Message error content={errors.handle}/>
                    </Form.Field>

                    <select id="lang" onChange={this.handleChange} value={this.state.status}>
                        <option value="select">Choose your current career status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor or Teacher">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>

                    <Segment basic size="tiny" className="form__description">
                        Give us an idea of where you are at in your career.
                    </Segment>

                    <Message error content={errors.status}/>


                    <Form.Field className={classnames({'error': errors.company})}>
                        <label>Company</label>
                        <input type="text" name="company" placeholder='Company' value={this.state.company}
                               onChange={this.onChange}/>

                        <Segment basic size="tiny" className="form__description">
                            Could be your own company or one you work for.
                        </Segment>

                        <Message error content={errors.company}/>
                    </Form.Field>

                    <Form.Field className={classnames({'error': errors.website})}>
                        <label>Website</label>
                        <input type="text" name="website" placeholder='Website' value={this.state.website}
                               onChange={this.onChange}/>

                        <Segment basic size="tiny" className="form__description">
                            Could be your own website or a company one.
                        </Segment>

                        <Message error content={errors.website}/>
                    </Form.Field>

                    <Form.Field className={classnames({'error': errors.location})}>
                        <label>Location</label>
                        <input type="text" name="location" placeholder='Location' value={this.state.location}
                               onChange={this.onChange}/>

                        <Segment basic size="tiny" className="form__description">
                            City or city & state suggested (eg. Kiev, UA).
                        </Segment>

                        <Message error content={errors.location}/>
                    </Form.Field>

                    <Form.Field required className={classnames({'error': errors.skills})}>
                        <label>Skills</label>
                        <input type="text" name="skills" placeholder='Skills' value={this.state.skills}
                               onChange={this.onChange}/>

                        <Segment basic size="tiny" className="form__description">
                            Please use comma separated values (eg.HTML, CSS, JavaScript, PHP).
                        </Segment>

                        <Message error content={errors.skills}/>
                    </Form.Field>

                    <Form.Field className={classnames({'error': errors.githubusername})}>
                        <label>Github Username</label>
                        <input type="text" name="githubusername" placeholder='Github Username'
                               value={this.state.githubusername}
                               onChange={this.onChange}/>

                        <Segment basic size="tiny" className="form__description">
                            If you want your latest repos and a Github link, include your username.
                        </Segment>

                        <Message error content={errors.githubusername}/>
                    </Form.Field>

                    <TextArea placeholder="Short Bio" name="bio" value={this.state.bio} onChange={this.onChange}
                              className={classnames({'error': errors.bio})}/>

                    <Segment basic size="tiny" className="form__description">
                        Tell us a little about yourself.
                    </Segment>

                    <Message error content={errors.bio}/>

                    <Button type='button' onClick={() => {
                        this.setState(prevState => ({
                            displaySocialInputs: !prevState.displaySocialInputs
                        }));
                    }} size='small' color='white'>Add Social Network Links</Button>

                    {socialInputs}

                    <Divider/>

                    <Button type='submit' fluid size='large' color='orange'>Submit</Button>
                </Form>
            </Container>

        );
    }
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(
    withRouter(CreateProfile)
);