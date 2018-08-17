import React, {Component} from 'react';
import {Container, Grid, Button, Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        const classes = `main-container home-container`;
        return (
            <Container fluid className={classes}>
                <Grid className="home__inner">
                    <Grid.Row centered columns={1}>
                        <Header as='h1' textAlign='center' className="header__custom">React Network</Header>
                        <Header as='h3' textAlign='center' className="header__custom">Create a profile/portfolio, share
                            posts and get help from other developers</Header>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column width={8}>
                            <Button as={Link} to='register' basic size='large' color='orange' floated='right'
                                    className="home__button">
                                Register
                            </Button>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Button as={Link} to='login' basic size='large' color='orange' floated='left'
                                    className="home__button">
                                Login
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default Home;