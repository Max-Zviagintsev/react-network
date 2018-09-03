import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Label, Card, Header, Divider} from 'semantic-ui-react';

class ProfileGithub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientId: 'db93cc8e495f312cb3da',
            clientSecret: 'a52b4845a3bac7e9c951551744c01dc507193318',
            count: 5,
            sort: 'created: asc',
            repos: []
        };
    }

    componentDidMount() {
        const {username} = this.props;
        const {count, sort, clientId, clientSecret} = this.state;

        fetch(
            `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
        )
            .then(res => res.json())
            .then(data => {
                if (this.refs.myRef) {
                    this.setState({repos: data});
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        const {repos} = this.state;

        const repoItems = repos.map(repo => (
            <Card.Group key={repo.id} itemsPerRow={2}>
                <Card className="single-profile-card" fluid>
                    <Card.Content>
                    <h4>
                        <Link to={repo.html_url} target="_blank">
                            {repo.name}
                        </Link>
                    </h4>
                    <Card.Description>{repo.description}</Card.Description>
                    </Card.Content>
                </Card>
                <Card className="single-profile-card" fluid>
                    <Card.Content>
                        <Label.Group>

                            <Label color="olive">
                                Stars: {repo.stargazers_count}
                            </Label>
                            <Label color="teal">
                                Watchers: {repo.watchers_count}
                            </Label>
                            <Label color="violet">
                                Forks: {repo.forks_count}
                            </Label>
                        </Label.Group>
                    </Card.Content>
                </Card>
            </Card.Group>
        ));
        return (
            <div ref="myRef">
                <Divider hidden/>
                <Header as='h3' className="color-orange--centered">Latest Github Repos</Header>
                {repoItems}
            </div>
        );
    }
}

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired
};

export default ProfileGithub;
